// ============================================================
// Sri Krishi Enterprises — Structured Company Data
// All website content lives here for easy updates.
// ============================================================

export const company = {
  name: 'Sri Krishi Enterprises',
  shortName: 'SKE',
  tagline: 'Pure Carbon. Reliable Performance. Global Supply.',
  role: 'Supplier | Exporter | Sourcing Partner',
  phone: '+91 96003 19788',
  location: 'Tamil Nadu, India',
  // Email and office address to be confirmed
};

export const heroContent = {
  headline: 'Premium Coconut Shell Activated Carbon for Global Industries',
  subtext:
    'High-quality coconut shell-based activated carbon with controlled iodine value, CTC, mesh size and physical properties for water treatment, air purification, industrial processing and other adsorption applications.',
  primaryCta: 'Request a Quote',
  secondaryCta: 'Request a Sample',
  tertiaryCta: 'Contact Us',
  badge: 'COCONUT SHELL BASED',
  features: [
    'High Iodine Value Grades',
    'Multiple Mesh Sizes',
    'Bulk Supply',
    'Customized Packaging',
    'Export-Ready Supply',
  ],
};

export interface ProcessStageData {
  number: string;
  label: string;
  title: string;
  description: string;
  technicalLabel?: string;
  colorTheme: 'brown' | 'amber' | 'dark' | 'charcoal' | 'grey';
}

export const processStages: ProcessStageData[] = [
  {
    number: '01',
    label: 'RAW MATERIAL',
    title: 'Selected Coconut Shell',
    description:
      'Carefully selected coconut shells are sourced from reliable suppliers.',
    colorTheme: 'brown',
  },
  {
    number: '02',
    label: 'CARBONIZATION',
    title: 'Controlled Thermal Transformation',
    description:
      'The coconut shell is carbonized under controlled conditions to produce high-quality carbon.',
    colorTheme: 'amber',
  },
  {
    number: '03',
    label: 'ACTIVATION',
    title: 'Creating the Porous Structure',
    description:
      'The carbon is activated to develop a highly porous structure and increase adsorption capacity.',
    technicalLabel: 'HIGH SURFACE AREA',
    colorTheme: 'dark',
  },
  {
    number: '04',
    label: 'CRUSHING & SCREENING',
    title: 'Controlled Particle Size',
    description:
      'Activated carbon is processed and screened to achieve the required particle size and mesh specification.',
    technicalLabel: '6×12 mesh and other sizes available',
    colorTheme: 'charcoal',
  },
  {
    number: '05',
    label: 'QUALITY CONTROL',
    title: 'Measured. Tested. Specified.',
    description:
      'Every batch undergoes rigorous testing to ensure consistent quality and performance.',
    colorTheme: 'grey',
  },
];

export const qualityParameters = [
  'Iodine Value',
  'CTC Activity',
  'Moisture',
  'Ash',
  'Hardness',
  'Apparent Density',
  'Particle / Mesh Size',
  'pH',
  'Surface Area',
];

export interface ProductGrade {
  grade: string;
  iodineValue: string;
  ctcValue: string;
  typicalApplication: string;
}

export const productGrades: ProductGrade[] = [
  {
    grade: 'AC-900',
    iodineValue: '≥900 mg/g',
    ctcValue: '≥50%',
    typicalApplication: 'General water treatment, industrial processing',
  },
  {
    grade: 'AC-1000',
    iodineValue: '≥1000 mg/g',
    ctcValue: '≥55%',
    typicalApplication: 'Water purification, chemical processing',
  },
  {
    grade: 'AC-1100',
    iodineValue: '≥1100 mg/g',
    ctcValue: '≥60%',
    typicalApplication: 'Drinking water, air purification',
  },
  {
    grade: 'AC-1150',
    iodineValue: '≥1150 mg/g',
    ctcValue: '≥65%',
    typicalApplication: 'Advanced water treatment, gold recovery',
  },
  {
    grade: 'AC-1200',
    iodineValue: '≥1200 mg/g',
    ctcValue: '≥70%',
    typicalApplication: 'High-performance adsorption, specialized applications',
  },
];

export const productSpecs = {
  name: 'Coconut Shell Activated Carbon',
  description:
    'Our coconut shell activated carbon is produced from carefully selected coconut shell carbon and processed to achieve high adsorption performance, hardness and consistent particle size.',
  note: 'Final specifications can be customized according to customer requirements and agreed COA.',
  specifications: [
    { label: 'Base', value: 'Coconut Shell' },
    { label: 'Form', value: 'Granular Activated Carbon' },
    { label: 'Colour', value: 'Black' },
    { label: 'Odour', value: 'Odourless' },
    { label: 'Taste', value: 'Tasteless' },
    { label: 'Mesh', value: '6×12 and other sizes' },
    { label: 'Moisture', value: '≤5%' },
    { label: 'Ash', value: '≤5%' },
    { label: 'Apparent Density', value: '0.50–0.60 g/cc' },
    { label: 'Hardness', value: '≥98%' },
    { label: 'Surface Area', value: '≥1100 m²/g' },
    { label: 'pH', value: '9–11' },
  ],
};

export interface ApplicationData {
  title: string;
  description: string;
}

export const applications: ApplicationData[] = [
  {
    title: 'Water Treatment',
    description:
      'Adsorption and removal of organic contaminants, colour, odour and impurities.',
  },
  {
    title: 'Drinking Water Purification',
    description:
      'Purification of drinking water to meet quality and safety standards.',
  },
  {
    title: 'Industrial Water Treatment',
    description:
      'Treatment of process water and wastewater in industrial facilities.',
  },
  {
    title: 'Air & Gas Purification',
    description:
      'Removal of volatile organic compounds, odours and contaminants from air and gas streams.',
  },
  {
    title: 'Food & Beverage Processing',
    description:
      'Decolourization, purification and quality improvement in food and beverage production.',
  },
  {
    title: 'Chemical & Industrial Processing',
    description:
      'Catalyst support, solvent recovery and purification in chemical processes.',
  },
  {
    title: 'Gold Recovery',
    description:
      'Adsorption of gold from cyanide solutions in mining and precious metal recovery.',
  },
];

export const whyChooseFeatures = [
  {
    title: 'CONSISTENT QUALITY',
    description:
      'Rigorous testing and quality control on every batch to ensure reliable performance.',
  },
  {
    title: 'COCONUT SHELL BASED',
    description:
      'High-quality activated carbon derived from natural coconut shell raw material.',
  },
  {
    title: 'MULTIPLE GRADES',
    description:
      'Range of iodine values and specifications to match different application requirements.',
  },
  {
    title: 'CUSTOMIZED SUPPLY',
    description:
      'Flexible packaging, specifications and supply arrangements tailored to buyer requirements.',
  },
  {
    title: 'RELIABLE B2B SUPPLY',
    description:
      'Dependable supply chain ensuring consistent availability and timely delivery.',
  },
  {
    title: 'EXPORT-ORIENTED',
    description:
      'Structured for international trade with proper documentation and export compliance.',
  },
  {
    title: 'TECHNICAL SUPPORT',
    description:
      'Product specifications, COA, MSDS and technical guidance to support procurement decisions.',
  },
];

export const qualityDocuments = [
  'Certificate of Analysis',
  'Laboratory Test Reports',
  'MSDS / SDS',
  'Product Technical Datasheet',
  'Lot / Batch Information',
  'Packing Details',
];

export const packagingOptions = [
  { size: '25 kg', type: 'PP / HDPE Bags', description: 'Standard bags for smaller orders' },
  { size: '500 kg', type: 'Jumbo Bags', description: 'Bulk packaging for larger orders' },
  { size: '1000 kg', type: 'Jumbo Bags', description: 'Maximum bulk packaging for container loads' },
  { size: 'Custom', type: 'Private Label', description: 'Customized packaging as per buyer requirement' },
];

export const packagingTypes = ['PP Bags', 'HDPE / Liner Bags', 'Jumbo Bags', 'Customized / Private Label'];

export const globalSupply = {
  headline: 'From India to Global Markets',
  subtext:
    'Sri Krishi Enterprises aims to serve international buyers looking for reliable coconut shell activated carbon supply from India.',
  origin: 'India',
  targetRegions: [
    'Middle East',
    'Southeast Asia',
    'Africa',
    'Europe',
    'South Asia',
    'Other international markets',
  ],
};

export const aboutContent = {
  headline: 'Pure Carbon. Reliable Performance. Global Supply.',
  description: [
    'Consistent product quality',
    'Reliable sourcing',
    'Technical specifications',
    'Customized packaging',
    'Dependable B2B supply',
  ],
  mission:
    'To supply consistent, high-performance coconut shell activated carbon with reliable quality, competitive pricing and dependable delivery.',
  vision:
    'To establish Sri Krishi Enterprises as a trusted global supplier and export partner for coconut shell activated carbon and sustainable carbon products.',
};

export const faqItems = [
  {
    question: 'What is your activated carbon made from?',
    answer:
      'Our activated carbon is made from carefully selected coconut shell. Coconut shell-based activated carbon offers high hardness, excellent adsorption capacity and consistent quality.',
  },
  {
    question: 'What iodine values are available?',
    answer:
      'We offer activated carbon grades with iodine values ranging from 900 mg/g to 1200+ mg/g, including AC-900, AC-1000, AC-1100, AC-1150 and AC-1200.',
  },
  {
    question: 'What mesh sizes are available?',
    answer:
      'Our standard mesh size is 6×12. Other mesh sizes can be made available based on customer requirements.',
  },
  {
    question: 'What is your MOQ?',
    answer:
      'Please contact us with your requirement and we will discuss the minimum order quantity and supply arrangement.',
  },
  {
    question: 'Can you provide samples?',
    answer:
      'Yes, we can provide product samples for testing and evaluation. Please contact us with your requirement.',
  },
  {
    question: 'Can you provide COA?',
    answer:
      'Yes, we provide a Certificate of Analysis (COA) with every shipment, documenting the tested specifications of the supplied product.',
  },
  {
    question: 'Do you provide MSDS/SDS?',
    answer:
      'Yes, we provide Material Safety Data Sheets (MSDS/SDS) for our activated carbon products.',
  },
  {
    question: 'Can you customize packaging?',
    answer:
      'Yes, we offer customized packaging options including private label packaging. Standard options include 25 kg bags, 500 kg jumbo bags and 1000 kg jumbo bags.',
  },
  {
    question: 'Do you supply internationally?',
    answer:
      'Yes, Sri Krishi Enterprises is an export-oriented company aiming to serve international buyers across the Middle East, Southeast Asia, Africa, Europe and other global markets.',
  },
  {
    question: 'How can I request a quotation?',
    answer:
      'You can request a quotation by filling out the contact form on this website, or by contacting us directly via phone/WhatsApp at +91 96003 19788. Please share your required grade, iodine value, CTC, mesh size, quantity, packaging and delivery location.',
  },
];

export const contactFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'company', label: 'Company', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', required: true },
  { name: 'country', label: 'Country', type: 'text', required: true },
  { name: 'product', label: 'Product / Grade', type: 'text', required: false },
  { name: 'iodineValue', label: 'Iodine Value', type: 'text', required: false },
  { name: 'ctc', label: 'CTC', type: 'text', required: false },
  { name: 'meshSize', label: 'Mesh Size', type: 'text', required: false },
  { name: 'quantity', label: 'Quantity', type: 'text', required: false },
  { name: 'packaging', label: 'Packaging Requirement', type: 'text', required: false },
  { name: 'delivery', label: 'Delivery Location', type: 'text', required: false },
  { name: 'message', label: 'Message', type: 'textarea', required: false },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Applications', href: '#applications' },
  { label: 'Quality', href: '#quality' },
  { label: 'Packaging', href: '#packaging' },
  { label: 'Global Supply', href: '#global-supply' },
  { label: 'Contact', href: '#contact' },
];

export const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Applications', href: '#applications' },
  { label: 'Quality', href: '#quality' },
  { label: 'Packaging', href: '#packaging' },
  { label: 'Global Supply', href: '#global-supply' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const galleryCategories = [
  'Factory',
  'Raw Materials',
  'Production Machinery',
  'Carbonization / Activation',
  'Crushing & Screening',
  'Quality Control / Laboratory',
  'Finished Products',
  'Packaging',
  'Warehouse',
  'Container Loading',
];
