export const categories = [
  { id: 1, name: 'Tablets', icon: '💊', count: 320, slug: 'tablets', description: 'Oral solid dosage forms for various therapeutic applications' },
  { id: 2, name: 'Capsules', icon: '🔴', count: 180, slug: 'capsules', description: 'Gelatin-encapsulated medicines for precise dosing' },
  { id: 3, name: 'Syrups', icon: '🧪', count: 95, slug: 'syrups', description: 'Liquid oral formulations including suspensions and elixirs' },
  { id: 4, name: 'Injectables', icon: '💉', count: 210, slug: 'injectables', description: 'Sterile parenteral preparations for IV, IM, and SC administration' },
  { id: 5, name: 'Medical Devices', icon: '🩺', count: 145, slug: 'medical-devices', description: 'Diagnostic and therapeutic medical equipment' },
  { id: 6, name: 'Surgical Products', icon: '⚕️', count: 88, slug: 'surgical', description: 'Sterile surgical instruments, drapes, and consumables' },
  { id: 7, name: 'OTC Medicines', icon: '🏥', count: 260, slug: 'otc', description: 'Over-the-counter consumer health products' },
]

export const featuredProducts = [
  {
    id: 1,
    name: 'Amoxicillin 500mg Capsules',
    brand: 'GSK Pharma',
    category: 'Capsules',
    description: 'Broad-spectrum penicillin antibiotic for bacterial infections',
    image: '/images/products/amoxicillin.png',
    slug: 'amoxicillin-500mg',
  },
  {
    id: 2,
    name: 'Metformin 850mg Tablets',
    brand: 'Sun Pharma',
    category: 'Tablets',
    description: 'First-line oral antidiabetic agent for Type 2 Diabetes Mellitus',
    image: '/images/products/metformin.png',
    slug: 'metformin-850mg',
  },
  {
    id: 3,
    name: 'Ceftriaxone 1g Injection',
    brand: 'Cipla Ltd',
    category: 'Injectables',
    description: 'Third-generation cephalosporin for serious bacterial infections',
    image: '/images/products/ceftriaxone.png',
    slug: 'ceftriaxone-1g',
  },
  {
    id: 4,
    name: 'Paracetamol 250mg Syrup',
    brand: 'Abbott India',
    category: 'Syrups',
    description: 'Analgesic and antipyretic syrup formulation for pediatric use',
    image: '/images/products/paracetamol-syrup.png',
    slug: 'paracetamol-syrup',
  },
  {
    id: 5,
    name: 'Digital Blood Pressure Monitor',
    brand: 'Omron Healthcare',
    category: 'Medical Devices',
    description: 'Clinically validated upper arm blood pressure monitoring device',
    image: '/images/products/bp-monitor.png',
    slug: 'digital-bp-monitor',
  },
  {
    id: 6,
    name: 'Surgical Gloves (Box/100)',
    brand: 'Ansell Medical',
    category: 'Surgical Products',
    description: 'Sterile latex examination gloves, powder-free, various sizes',
    image: '/images/products/surgical-gloves.png',
    slug: 'surgical-gloves',
  },
]

export const stats = [
  { value: 5000, suffix: '+', label: 'Products Available' },
  { value: 1200, suffix: '+', label: 'Healthcare Partners' },
  { value: 25, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

export const features = [
  {
    icon: 'Shield',
    title: 'GMP-GLP Certified',
    description: 'Manufacturing aligned to GMP-GLP, pharmacopoeia standards, and statutory requirements — so composition, purity, and safety stay consistent.',
  },
  {
    icon: 'Truck',
    title: 'Third-Party Manufacturing',
    description: 'Contract manufacturing for small and large pharma companies that need a reliable partner for quality products at scale.',
  },
  {
    icon: 'Award',
    title: 'Certified Quality',
    description: 'GMP, ISO 9001:2015, and FSSAI credentials behind how we manufacture, test, and release every batch.',
  },
  {
    icon: 'Users',
    title: 'Dedicated Team',
    description: 'A focused team working to keep quality high and medicines effective — from the plant floor to the partners we serve.',
  },
  {
    icon: 'MapPin',
    title: 'Two-Location Setup',
    description: 'Corporate office in Delhi and a manufacturing unit in Kala Amb, Himachal Pradesh — with shear, fluid-bed, and film-coating capability.',
  },
  {
    icon: 'Tag',
    title: 'Affordable Medicines',
    description: 'Quality formulations at reasonable prices, from everyday remedies to complex prescription medicines.',
  },
]

export const certifications = [
  { year: 'GMP', title: 'GMP Certification', body: 'Good Manufacturing Practice', description: 'Manufacturing aligned to GMP so every batch meets required quality and safety standards' },
  { year: 'GLP', title: 'GLP Compliance', body: 'Good Laboratory Practice', description: 'GMP-GLP compliant operations across formulation, testing, and quality control' },
  { year: '2015', title: 'ISO 9001:2015', body: 'Quality Management', description: 'International quality management system covering how we manufacture and control our products' },
  { year: 'FSSAI', title: 'FSSAI Certification', body: 'Food Safety Standards', description: 'Certified against FSSAI requirements for applicable product categories' },
  { year: 'IP', title: 'Pharmacopoeia Standards', body: 'Statutory Compliance', description: 'Products formulated to meet relevant pharmacopoeia standards and statutory requirements' },
]

export const processSteps = [
  { step: 1, title: 'Send Inquiry', description: 'Submit your product requirements via our online form, email, or phone. Our team responds within 2 hours.', icon: 'MessageSquare' },
  { step: 2, title: 'Consultation', description: 'Our pharmaceutical experts review your needs and provide tailored product recommendations with pricing.', icon: 'HeadphonesIcon' },
  { step: 3, title: 'Order Processing', description: 'Once confirmed, your order is verified, documents prepared, and sourcing initiated from certified manufacturers.', icon: 'ClipboardList' },
  { step: 4, title: 'Dispatch', description: 'Products packed in cold-chain compliant packaging and dispatched via our trusted logistics partners.', icon: 'Package' },
  { step: 5, title: 'Delivery', description: 'Track your shipment in real-time. Guaranteed delivery within 48-72 hours to most major cities.', icon: 'CheckCircle' },
]

export const testimonials = [
  {
    id: 1,
    name: 'Dr. Rajesh Sharma',
    role: 'Procurement Head',
    company: 'Apollo Hospitals',
    quote: 'PharmaCore has been our primary wholesale partner for 8 years. Their product quality, documentation, and delivery reliability is unmatched in the industry.',
    rating: 5,
    avatar: 'RS',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Supply Chain Director',
    company: 'MedLife Healthcare',
    quote: 'The breadth of their catalog combined with WHO-GMP compliance gives us confidence in every order. Exceptional customer service and transparent pricing.',
    rating: 5,
    avatar: 'PM',
  },
  {
    id: 3,
    name: 'Mohammed Iqbal',
    role: 'General Manager',
    company: 'City Hospital Network',
    quote: 'We&apos;ve streamlined our pharmaceutical procurement by 40% since partnering with PharmaCore. Their digital ordering system is a game-changer.',
    rating: 5,
    avatar: 'MI',
  },
  {
    id: 4,
    name: 'Sunita Patel',
    role: 'Pharmacy Director',
    company: 'Fortis Medical Centre',
    quote: 'Consistent quality, competitive prices, and a dedicated account manager. PharmaCore understands the unique demands of hospital procurement.',
    rating: 5,
    avatar: 'SP',
  },
]

export const faqs = [
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer: 'Our MOQ varies by product category. For most pharmaceuticals, the minimum order is 1 carton (typically 100-500 units). For medical devices, MOQ is 1 unit. Please contact our sales team for specific product MOQs.',
  },
  {
    question: 'Are all products WHO-GMP certified?',
    answer: 'Yes, all products in our catalog are sourced exclusively from WHO-GMP certified manufacturers. We maintain strict supplier qualification processes and conduct periodic audits to ensure compliance.',
  },
  {
    question: 'What are your payment terms?',
    answer: 'We offer flexible payment terms including advance payment, credit terms (30/45/60 days) for established clients, and Letter of Credit for international orders. Terms are determined after credit assessment.',
  },
  {
    question: 'Do you handle temperature-sensitive products?',
    answer: 'Yes. We have dedicated cold-chain infrastructure including refrigerated warehouses and temperature-controlled vehicles for products requiring 2-8°C or -20°C storage throughout the supply chain.',
  },
  {
    question: 'How can I track my order?',
    answer: 'All orders come with a tracking ID. You can track shipments in real-time through our client portal or receive automated SMS/email updates at each delivery milestone.',
  },
  {
    question: 'Do you supply to international markets?',
    answer: 'Yes, we have export capabilities to over 30 countries. Our international division handles all regulatory documentation, export licenses, and customs clearance procedures.',
  },
]

export const partners = [
  'Sun Pharma', 'Cipla', 'Dr. Reddys', 'Lupin', 'Abbott India',
  'Pfizer', 'Novartis', 'GSK', 'Zydus', 'Torrent Pharma',
]

export const insights = [
  {
    id: 1,
    title: 'Lab-On-A-Chip Devices For Rapid Diagnostics',
    date: 'March 18, 2026',
    slug: 'lab-on-a-chip-devices-rapid-diagnostics',
    image: '/images/insights/lab-on-chip.png',
    tags: ['Biomedical'],
  },
  {
    id: 2,
    title: 'Standardizing Sample Handling In Clinical Labs',
    date: 'March 18, 2026',
    slug: 'standardizing-sample-handling-clinical-labs',
    image: '/images/insights/sample-handling.png',
    tags: ['Laboratory'],
  },
  {
    id: 3,
    title: 'AI-Powered Drug Discovery In Modern Research',
    date: 'March 18, 2026',
    slug: 'ai-powered-drug-discovery-modern-research',
    image: '/images/insights/ai-drug-discovery.png',
    tags: ['Biology'],
  },
]
