export type CompositionRow =
  | { type: 'header'; text: string }
  | { type: 'ingredient'; name: string; spc: string; qty: string; unit: string }
  | { type: 'base'; name: string; qty: string }
  | { type: 'excipients'; qty: string }
  | { type: 'colour'; text: string }
  | { type: 'note'; text: string }

const SPC = '(IP|USP|BP|EP|1P|JP)'
const UNIT = '(mg|mcg|gm|g|ml|iu|mEq|%|w\\/w|w\\/v)'

const HEADER_RE = /^each\b/i
const COLOUR_RE = /^colour\s*:/i
const COMPOSITION_HEADER_RE = /^composition\s*:\s*-?\s*$/i
const PRESERVATIVES_HEADER_RE = /^preservatives\s*:\s*-?\s*$/i
const EXCIPIENTS_RE = /^excipients?\s*(q\.s\.?)?$/i
const EXCIPIENTS_WITH_QS_RE = /^excipients?\s+q\.s\.?$/i
const SPC_ONLY_RE = new RegExp(`^${SPC}$`, 'i')
const SPC_QTY_UNIT_RE = new RegExp(`^${SPC}\\s+(\\d+(?:\\.\\d+)?)\\s*(${UNIT})?$`, 'i')
const SPC_PCT_RE = new RegExp(`^${SPC}\\s+(\\d+(?:\\.\\d+)?%)(?:\\s*(${UNIT}))?$`, 'i')
const QTY_UNIT_RE = new RegExp(`^(\\d+(?:\\.\\d+)?)\\s*(${UNIT})$`, 'i')
const PCT_ONLY_RE = /^(\d+(?:\.\d+)?%)$/
const NUMBER_ONLY_RE = /^(\d+(?:\.\d+)?)$/
const UNIT_ONLY_RE = new RegExp(`^(${UNIT})$`, 'i')
const EQ_TO_QTY_RE = new RegExp(`^Eq\\.\\s*to\\s+(.+?)\\s+(\\d+(?:\\.\\d+)?)\\s*(${UNIT})?$`, 'i')
const INGREDIENT_SPC_PCT_RE = new RegExp(
  `^(.+?)\\s+${SPC}\\s+(\\d+(?:\\.\\d+)?%)\\s*(${UNIT})?$`,
  'i',
)
const INGREDIENT_PCT_RE = new RegExp(`^(.+?)\\s+(\\d+(?:\\.\\d+)?%)\\s*(${UNIT})?$`, 'i')
const INGREDIENT_WITH_SPC_RE = new RegExp(
  `^(.+?)\\s+${SPC}\\s+(\\d+(?:\\.\\d+)?)\\s*(${UNIT})?$`,
  'i',
)
const INGREDIENT_QTY_RE = new RegExp(`^(.+?)\\s+(\\d+(?:\\.\\d+)?)\\s*(${UNIT})$`, 'i')
const BASE_QS_RE = /^(.+?)\s+q\.s\.?$/i
const PAREN_RE = /^\(.*\)$/

export function cleanCompositionDisplay(text: string): string {
  return text
    .replace(/contains\s*:\s*-\s*/gi, 'contains ')
    .replace(/\s*:\s*-\s*$/g, '')
    .replace(/\s*:\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

function normalizeIngredientText(text: string): string {
  return text
    .replace(/\s+%/g, '%')
    .replace(/(\d+(?:\.\d+)?)\s+(mg|mcg|gm|g|ml|iu)\s+\2\b/gi, '$1 $2')
    .replace(/^eq\.\s*to/i, 'Eq. to')
}

function normalizeSpc(value: string): string {
  return value.toUpperCase().replace('1P', 'IP')
}

function joinName(parts: string[]): string {
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

function parseHeaderLine(line: string): CompositionRow | null {
  if (COMPOSITION_HEADER_RE.test(line)) {
    return { type: 'header', text: 'Composition :-' }
  }

  if (PRESERVATIVES_HEADER_RE.test(line)) {
    return {
      type: 'header',
      text: /:-\s*$/.test(line) ? 'Preservatives:-' : 'Preservatives:',
    }
  }

  if (HEADER_RE.test(line)) {
    return { type: 'header', text: cleanCompositionDisplay(line) }
  }

  return null
}

function parseSpecialLine(text: string): CompositionRow | null {
  if (COLOUR_RE.test(text)) {
    return { type: 'colour', text }
  }

  if (/^approved colour/i.test(text)) {
    return { type: 'colour', text: text.startsWith('Colour') ? text : `Colour: ${text}` }
  }

  if (EXCIPIENTS_WITH_QS_RE.test(text) || EXCIPIENTS_RE.test(text)) {
    return { type: 'excipients', qty: 'q.s' }
  }

  const baseQs = text.match(BASE_QS_RE)
  if (baseQs) {
    return { type: 'base', name: baseQs[1].trim(), qty: 'q.s' }
  }

  if (/^in a flavoured/i.test(text) || /^palatable base/i.test(text)) {
    return { type: 'note', text }
  }

  if (/^aqueous base$/i.test(text) || /^a\s+(?:gel|cream|ointment)\s+base$/i.test(text)) {
    return { type: 'note', text }
  }

  if (/^(?:cream|ointment|lotion)\s+base$/i.test(text)) {
    return { type: 'base', name: text, qty: '' }
  }

  if (/^sorbitol solution/i.test(text) || /^\(non[- ]?crystalli[sz]ing\)$/i.test(text)) {
    return { type: 'note', text }
  }

  return null
}

function makeIngredient(
  name: string,
  spc: string,
  qty: string,
  unit: string,
): CompositionRow {
  return {
    type: 'ingredient',
    name: name.replace(/\s+/g, ' ').trim(),
    spc: spc ? normalizeSpc(spc) : '',
    qty,
    unit,
  }
}

function tryParseSingleLineIngredient(text: string): CompositionRow | null {
  const withSpcPct = text.match(INGREDIENT_SPC_PCT_RE)
  if (withSpcPct) {
    return makeIngredient(withSpcPct[1], withSpcPct[2], withSpcPct[3], withSpcPct[4] ?? '')
  }

  const withSpc = text.match(INGREDIENT_WITH_SPC_RE)
  if (withSpc) {
    return makeIngredient(withSpc[1], withSpc[2], withSpc[3], withSpc[4] ?? '')
  }

  const pctOnly = text.match(INGREDIENT_PCT_RE)
  if (pctOnly) {
    return makeIngredient(pctOnly[1], '', pctOnly[2], pctOnly[3] ?? '')
  }

  const qtyOnly = text.match(INGREDIENT_QTY_RE)
  if (qtyOnly) {
    return makeIngredient(qtyOnly[1], '', qtyOnly[2], qtyOnly[3])
  }

  return null
}

function preprocessComposition(text: string): string {
  return text
    .replace(/w\/\s*\n\s*w/gi, 'w/w')
    .replace(/w\/\s+w\b/gi, 'w/w')
}

function needsCompositionHeader(composition: string): boolean {
  const trimmed = composition.trim()
  if (!trimmed) return false
  if (/^composition\s*:/im.test(trimmed)) return false
  if (/^each\b/im.test(trimmed)) return false
  return /\d+(?:\.\d+)?%\s*(?:w\/w|w\/v)/i.test(trimmed)
}

function flushOrphanName(nameParts: string[], rows: CompositionRow[]) {
  const joined = joinName(nameParts)
  if (!joined) return
  const parsed = tryParseSingleLineIngredient(joined)
  rows.push(parsed ?? { type: 'note', text: joined })
  nameParts.length = 0
}

function parseIngredientLines(lines: string[]): CompositionRow[] {
  const rows: CompositionRow[] = []
  const nameParts: string[] = []
  let pendingSpc = ''
  let pendingNumbers: string[] = []
  let pendingQty = ''

  const resetPending = () => {
    pendingSpc = ''
    pendingNumbers = []
    pendingQty = ''
  }

  const flushIngredient = (spc: string, qty: string, unit: string) => {
    const name = joinName(nameParts)
    if (!name) return
    rows.push(makeIngredient(name, spc, qty, unit))
    nameParts.length = 0
    resetPending()
  }

  for (const rawLine of lines) {
    const trimmed = rawLine.trim()
    if (!trimmed) continue

    const header = parseHeaderLine(trimmed)
    if (header) {
      if (nameParts.length || pendingSpc || pendingQty) {
        if (pendingSpc && pendingNumbers.length) {
          flushIngredient(pendingSpc, pendingNumbers[pendingNumbers.length - 1], '')
        } else flushOrphanName(nameParts, rows)
      }
      rows.push(header)
      continue
    }

    const text = normalizeIngredientText(cleanCompositionDisplay(trimmed))
    if (!text) continue

    const special = parseSpecialLine(text)
    if (special) {
      if (nameParts.length || pendingSpc || pendingQty) {
        if (pendingSpc && (pendingNumbers.length || pendingQty)) {
          flushIngredient(pendingSpc, pendingQty || pendingNumbers[pendingNumbers.length - 1] || '', '')
        } else flushOrphanName(nameParts, rows)
      }
      rows.push(special)
      continue
    }

    if (SPC_ONLY_RE.test(text)) {
      if (pendingSpc && nameParts.length) flushIngredient(pendingSpc, pendingQty || pendingNumbers.at(-1) || '', '')
      pendingSpc = text
      pendingNumbers = []
      pendingQty = ''
      continue
    }

    const spcPct = text.match(SPC_PCT_RE)
    if (spcPct) {
      pendingSpc = spcPct[1]
      pendingQty = spcPct[2]
      if (spcPct[3] && nameParts.length) {
        flushIngredient(spcPct[1], spcPct[2], spcPct[3])
      }
      continue
    }

    if (PCT_ONLY_RE.test(text) && nameParts.length) {
      pendingQty = text
      continue
    }

    const unitOnly = text.match(UNIT_ONLY_RE)
    if (unitOnly && nameParts.length && (pendingQty || pendingNumbers.length)) {
      flushIngredient(pendingSpc, pendingQty || pendingNumbers[pendingNumbers.length - 1], unitOnly[1])
      continue
    }

    if (unitOnly && !nameParts.length && !pendingSpc && !pendingQty && !pendingNumbers.length) {
      continue
    }

    const spcQtyUnit = text.match(SPC_QTY_UNIT_RE)
    if (spcQtyUnit) {
      if (spcQtyUnit[3]) {
        flushIngredient(spcQtyUnit[1], spcQtyUnit[2], spcQtyUnit[3])
      } else {
        pendingSpc = spcQtyUnit[1]
        pendingNumbers = [spcQtyUnit[2]]
        pendingQty = ''
      }
      continue
    }

    const numberOnly = text.match(NUMBER_ONLY_RE)
    if (numberOnly && pendingSpc) {
      pendingNumbers.push(numberOnly[1])
      continue
    }

    if (pendingSpc) {
      const qtyUnit = text.match(QTY_UNIT_RE)
      if (qtyUnit) {
        flushIngredient(pendingSpc, qtyUnit[1], qtyUnit[2])
        continue
      }
    }

    const eqWithQty = text.match(EQ_TO_QTY_RE)
    if (eqWithQty) {
      nameParts.push(`Eq. to ${eqWithQty[1].trim()}`)
      flushIngredient('', eqWithQty[2], eqWithQty[3] ?? '')
      continue
    }

    const single = tryParseSingleLineIngredient(text)
    if (single) {
      if (nameParts.length || pendingSpc || pendingQty) {
        if (pendingSpc && (pendingNumbers.length || pendingQty)) {
          flushIngredient(pendingSpc, pendingQty || pendingNumbers.at(-1) || '', '')
        } else flushOrphanName(nameParts, rows)
      }
      rows.push(single)
      continue
    }

    const eqOnly = text.match(/^Eq\.\s*to\s+(.+)$/i)
    if (eqOnly) {
      nameParts.push(`Eq. to ${eqOnly[1].trim()}`)
      continue
    }

    if (PAREN_RE.test(text) || /^\(as\b/i.test(text) || /^\(Simethicone\)$/i.test(text)) {
      nameParts.push(text)
      continue
    }

    if (/^\(derived from/i.test(text) || /^shells\)$/i.test(text)) {
      nameParts.push(text)
      continue
    }

    nameParts.push(text)
  }

  if (pendingSpc && nameParts.length && (pendingQty || pendingNumbers.length)) {
    flushIngredient(pendingSpc, pendingQty || pendingNumbers[pendingNumbers.length - 1], '')
  } else if (nameParts.length) {
    flushOrphanName(nameParts, rows)
  }

  return rows
}

export function parseComposition(composition: string): CompositionRow[] {
  if (!composition.trim()) {
    return [{ type: 'note', text: 'Details available on request.' }]
  }

  const rows: CompositionRow[] = []

  if (needsCompositionHeader(composition)) {
    rows.push({ type: 'header', text: 'Composition :-' })
  }

  rows.push(...parseIngredientLines(preprocessComposition(composition).split('\n')))

  return rows.length > 0 ? rows : [{ type: 'note', text: composition.trim() }]
}
