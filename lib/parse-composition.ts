export type CompositionRow =
  | { type: 'header'; text: string }
  | { type: 'ingredient'; name: string; spc: string; qty: string; unit: string }
  | { type: 'excipients'; qty: string }
  | { type: 'colour'; text: string }
  | { type: 'note'; text: string }

const HEADER_RE = /^each\b/i
const COLOUR_RE = /^colour\s*:/i
const EXCIPIENTS_RE = /^excipients?\s*(q\.s\.?)?$/i
const SKIP_RE = /^(ip|usp|bp|&)$/i

const INGREDIENT_WITH_SPC_RE =
  /^(.+?)\s+(IP|USP|BP|1P|EP)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|gm|g|ml|%|w\/w|w\/v)?$/i

const INGREDIENT_QTY_RE =
  /^(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|gm|g|ml|%|w\/w|w\/v)$/i

const EQ_TO_RE =
  /^Eq\.\s*to\s+(.+?)\s+(\d+(?:\.\d+)?)\s*(mg|mcg|gm|g|ml|%|w\/w|w\/v)?$/i

export function cleanCompositionDisplay(text: string): string {
  return text
    .replace(/\s*:-\s*/g, ' ')
    .replace(/\s*:\s*-\s*/g, '')
    .replace(/\s*:\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function parseLine(line: string): CompositionRow | null {
  const text = cleanCompositionDisplay(line.trim())
  if (!text || SKIP_RE.test(text)) return null

  if (HEADER_RE.test(text)) {
    return { type: 'header', text }
  }

  if (COLOUR_RE.test(text)) {
    return { type: 'colour', text }
  }

  const excipientsMatch = text.match(/^excipients?\s+(q\.s\.?)$/i)
  if (excipientsMatch) {
    return { type: 'excipients', qty: 'q.s' }
  }
  if (EXCIPIENTS_RE.test(text)) {
    return { type: 'excipients', qty: 'q.s' }
  }

  const eqMatch = text.match(EQ_TO_RE)
  if (eqMatch) {
    return {
      type: 'ingredient',
      name: `Eq. to ${eqMatch[1].trim()}`,
      spc: '',
      qty: eqMatch[2],
      unit: eqMatch[3] ?? '',
    }
  }

  const withSpc = text.match(INGREDIENT_WITH_SPC_RE)
  if (withSpc) {
    return {
      type: 'ingredient',
      name: withSpc[1].trim(),
      spc: withSpc[2].toUpperCase().replace('1P', 'IP'),
      qty: withSpc[3],
      unit: withSpc[4] ?? '',
    }
  }

  const qtyOnly = text.match(INGREDIENT_QTY_RE)
  if (qtyOnly) {
    return {
      type: 'ingredient',
      name: qtyOnly[1].trim(),
      spc: '',
      qty: qtyOnly[2],
      unit: qtyOnly[3],
    }
  }

  if (/approved colour|flavoured|base|preservatives/i.test(text)) {
    return { type: 'note', text }
  }

  return { type: 'note', text }
}

export function parseComposition(composition: string): CompositionRow[] {
  if (!composition.trim()) {
    return [{ type: 'note', text: 'Details available on request.' }]
  }

  const rows: CompositionRow[] = []
  for (const rawLine of composition.split('\n')) {
    const parsed = parseLine(rawLine)
    if (parsed) rows.push(parsed)
  }

  return rows.length > 0 ? rows : [{ type: 'note', text: composition.trim() }]
}
