export const categories = [
  {
    id: 1,
    name: 'Capsule',
    icon: '🔴',
    count: 40,
    countLabel: '40 Formulations',
    badge: 'Gelatin & HPMC',
    slug: 'capsules',
    description: 'Hard gelatin, softgel & HPMC encapsulated formulations for precise dosing.',
  },
  {
    id: 2,
    name: 'Tablet',
    icon: '💊',
    count: 304,
    countLabel: '304 Formulations',
    badge: 'Coated & Uncoated',
    slug: 'tablets',
    description: 'Film-coated, enteric-coated, chewable & sustained release tablets.',
  },
  {
    id: 3,
    name: 'Oral Liquid',
    icon: '🧪',
    count: 67,
    countLabel: '67 Formulations',
    badge: 'Syrups & Suspensions',
    slug: 'oral-liquids',
    description: 'Pediatric syrups, oral liquid suspensions, medicinal drops & solutions.',
  },
  {
    id: 4,
    name: 'External Preparations',
    icon: '🧴',
    count: 46,
    countLabel: '46 Formulations',
    badge: 'Creams & Gels',
    slug: 'ointments',
    description: 'Dermatological creams, medicated gels & topical pharmaceutical ointments.',
  },
]

export const featuredProducts = [
  {
    id: 1,
    name: 'Samrab-DSR Capsules',
    brand: 'Samay Pharma',
    category: 'Capsule',
    description: 'Rabeprazole Sodium (enteric coated) & Domperidone (Sustained Release) Capsules',
    image: '/images/products/Samrab-DSR.jpeg',
    slug: 'samrab-dsr-capsules',
    approvalSlug: '9-rabeprazole-sodium-enteric-coated-domperidone-sustained-release-capsules',
  },
  {
    id: 2,
    name: 'Azisam-500 Tablets',
    brand: 'Samay Pharma',
    category: 'Tablet',
    description: 'Azithromycin Tablets IP',
    image: '/images/products/Azisam.jpeg',
    slug: 'azisam-500-tablets',
    approvalSlug: '82-azithromycin-tablets-ip',
  },
  {
    id: 3,
    name: 'Levosam-M Syrup',
    brand: 'Samay Pharma',
    category: 'Oral Liquid',
    description: 'Levocetirizine Dihydrochloride & Montelukast Syrup',
    image: '/images/products/LEVOSAM-M.jpeg',
    slug: 'levosam-m-syrup',
    approvalSlug: '58-levocetirizine-dihydrochloride-montelukast-syrup',
  },
  {
    id: 4,
    name: 'Samlose Oral Solution',
    brand: 'Samay Pharma',
    category: 'Oral Liquid',
    description: 'Lactulose Oral Solution USP',
    image: '/images/products/samlose.jpeg',
    slug: 'samlose-oral-solution',
    approvalSlug: '66-lactulose-oral-solution-usp',
  },
  {
    id: 5,
    name: 'Dolosam Gel',
    brand: 'Samay Pharma',
    category: 'External Preparations',
    description: 'Diclofenac Sodium, Linseed Oil, Methyl Salicylate & Menthol Gel',
    image: '/images/products/dolosam.jpeg',
    slug: 'dolosam-gel',
    approvalSlug: '7-diclofenac-sodium-linseed-oil-methyl-salicylate-menthol-gel',
  },
]

export const stats = [
  { value: 500, suffix: '+', label: 'Products Available' },
  { value: 1200, suffix: '+', label: 'Parties / Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

export const features = [
  {
    icon: 'Shield',
    title: 'International Certified',
    description: 'Manufacturing aligned to International, pharmacopoeia standards, and statutory requirements — so composition, purity, and safety stay consistent.',
  },
  {
    icon: 'Truck',
    title: 'Third-Party & PCD',
    description: 'Contract manufacturing and PCD franchise support for small and large pharma companies that need a reliable partner for quality products at scale.',
  },
  {
    icon: 'Award',
    title: 'Certified Quality',
    description: 'International and ISO 9001:2015 credentials behind how we manufacture, test, and release every batch.',
  },
  {
    icon: 'Users',
    title: 'Dedicated Team',
    description: 'A focused team working to keep quality high and medicines effective — from the plant floor to the partners we serve.',
  },
  {
    icon: 'MapPin',
    title: 'Himachal Manufacturing Unit',
    description: 'Our manufacturing unit in Kala Amb, Himachal Pradesh — with shear, fluid-bed, and film-coating capability.',
  },
  {
    icon: 'Tag',
    title: 'Affordable Medicines',
    description: 'Quality formulations at reasonable prices, from everyday remedies to complex prescription medicines.',
  },
]

export const certifications = [
  { year: 'International', title: 'International Certification', body: 'Good Manufacturing Practice', description: 'Manufacturing aligned to International so every batch meets required quality and safety standards' },
  { year: 'International', title: 'International Compliance', body: 'Good Laboratory Practice', description: 'International compliant operations across formulation, testing, and quality control' },
  { year: '2015', title: 'ISO 9001:2015', body: 'Quality Management', description: 'International quality management system covering how we manufacture and control our products' },
  { year: 'IP', title: 'Pharmacopoeia Standards', body: 'Statutory Compliance', description: 'Products formulated to meet relevant pharmacopoeia standards and statutory requirements' },
]

export const processSteps = [
  { step: 1, title: 'Send Inquiry', description: 'Submit your product or PCD requirements via our online form, email, or phone. Our team responds within 2 hours.', icon: 'MessageSquare' },
  { step: 2, title: 'Consultation', description: 'Our manufacturing team reviews your needs and shares tailored formulation options with pricing.', icon: 'HeadphonesIcon' },
  { step: 3, title: 'Order Processing', description: 'Once confirmed, your order is verified, documents prepared, and production is scheduled at our Kala Amb plant.', icon: 'ClipboardList' },
  { step: 4, title: 'Dispatch', description: 'Finished goods are packed to required standards and dispatched from our manufacturing unit via trusted logistics partners.', icon: 'Package' },
  { step: 5, title: 'Delivery', description: 'Track your shipment in real-time through our logistics partners across major cities.', icon: 'CheckCircle' },
]

export const testimonials = [
  {
    id: 1,
    name: 'Amit Verma',
    role: 'PCD Franchise Partner',
    company: 'North India Region',
    quote: 'Samay Pharma gave us a full PCD range with consistent quality and clear documentation. Our franchise network trusts every batch that leaves their Kala Amb plant.',
    rating: 5,
    avatar: 'AV',
  },
  {
    id: 2,
    name: 'Neha Kapoor',
    role: 'Director',
    company: 'Third-Party Brand Owner',
    quote: 'We outsource our oral solids and liquids to Samay Pharma. Formulation support, International discipline, and on-time dispatch make them a reliable manufacturing partner.',
    rating: 5,
    avatar: 'NK',
  },
  {
    id: 3,
    name: 'Rakesh Malhotra',
    role: 'Founder',
    company: 'Regional Pharma Marketer',
    quote: 'From tablets to external preparations, they manufacture what we need under our brand. Pricing is fair and communication from the plant team is always clear.',
    rating: 5,
    avatar: 'RM',
  },
  {
    id: 4,
    name: 'Sunita Patel',
    role: 'Procurement Lead',
    company: 'Contract Manufacturing Client',
    quote: 'Documentation, batch consistency, and responsive coordination — Samay Pharma understands third-party manufacturing, not just order-taking.',
    rating: 5,
    avatar: 'SP',
  },
]

export const faqs = [
  {
    question: 'What is the minimum order quantity (MOQ)?',
    answer: 'Our MOQ varies by product category. For most medicines, the minimum order is 1 carton (typically 100-500 units). Please contact our sales team for specific product MOQs.',
  },
  {
    question: 'What are your payment terms?',
    answer: 'We offer flexible payment terms including advance payment, credit terms (30/45/60 days) for established clients, and Letter of Credit for international orders. Terms are determined after credit assessment.',
  },
  {
    question: 'Do you handle temperature-sensitive products?',
    answer: 'Yes. Temperature-sensitive products are handled with dedicated cold-chain packaging and controlled transport for products requiring 2-8°C storage.',
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
  'Ofloxacin Tablets IP 400mg',
  'Aceclofenac & Paracetamol Tablets',
  'Clindamycin Capsules IP 300mg',
  'Pregabalin & Methylcobalamin Capsules',
  'Ambroxol & Levosalbutamol Syrup',
  'Terbinafine Cream IP 1%',
  'Clobetasol Propionate Cream IP',
  'Mupirocin Ointment IP 2%',
  'Pantoprazole & Domperidone Capsules',
  'Diclofenac & Thiocolchicoside Capsules',
]

export const insights = [
  {
    id: 1,
    title: 'Manufacturing and Analysis of Drug Formulations',
    date: 'March 18, 2026',
    slug: 'manufacturing-and-analysis-of-drug-formulations',
    image: '/images/insights/lab-on-chip.png',
    tags: ['Manufacturing'],
  },
  {
    id: 2,
    title: 'AI-Powered Drug Discovery In Modern Research',
    date: 'March 18, 2026',
    slug: 'ai-powered-drug-discovery-modern-research',
    image: '/images/insights/ai-drug-discovery.png',
    tags: ['Biology'],
  },
]
