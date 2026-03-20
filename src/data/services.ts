export interface DentalService {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  icon: string; // @expo/vector-icons Ionicons name
  category: 'general' | 'cosmetic' | 'orthodontic' | 'surgical';
  color: string;
}

export const services: DentalService[] = [
  {
    id: 'cleaning',
    name: 'Teeth Cleaning',
    description: 'Professional dental cleaning to remove plaque and tartar buildup.',
    duration: 60,
    price: 120,
    icon: 'sparkles',
    category: 'general',
    color: '#3182CE',
  },
  {
    id: 'checkup',
    name: 'Dental Check-Up',
    description: 'Comprehensive oral examination with X-rays and health assessment.',
    duration: 45,
    price: 90,
    icon: 'search',
    category: 'general',
    color: '#38B2AC',
  },
  {
    id: 'whitening',
    name: 'Teeth Whitening',
    description: 'Professional in-office whitening for a brighter, whiter smile.',
    duration: 90,
    price: 350,
    icon: 'sunny',
    category: 'cosmetic',
    color: '#F6AD55',
  },
  {
    id: 'filling',
    name: 'Dental Filling',
    description: 'Composite resin or amalgam fillings to restore decayed teeth.',
    duration: 60,
    price: 180,
    icon: 'build',
    category: 'general',
    color: '#48BB78',
  },
  {
    id: 'xray',
    name: 'Dental X-Ray',
    description: 'Digital X-rays for accurate diagnosis of dental issues.',
    duration: 30,
    price: 75,
    icon: 'pulse',
    category: 'general',
    color: '#9F7AEA',
  },
  {
    id: 'extraction',
    name: 'Tooth Extraction',
    description: 'Safe removal of damaged or problematic teeth.',
    duration: 45,
    price: 200,
    icon: 'medical',
    category: 'surgical',
    color: '#FC8181',
  },
  {
    id: 'crown',
    name: 'Dental Crown',
    description: 'Custom-made crowns to restore and protect damaged teeth.',
    duration: 90,
    price: 950,
    icon: 'shield-checkmark',
    category: 'general',
    color: '#2B6CB0',
  },
  {
    id: 'veneer',
    name: 'Porcelain Veneers',
    description: 'Thin porcelain shells for a perfect cosmetic smile makeover.',
    duration: 120,
    price: 1200,
    icon: 'diamond',
    category: 'cosmetic',
    color: '#ED64A6',
  },
];

export const serviceCategories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'cosmetic', label: 'Cosmetic' },
  { id: 'surgical', label: 'Surgical' },
  { id: 'orthodontic', label: 'Orthodontic' },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number]['id'];
