export interface Product {
  id: string;
  name: string;
  tag: string;
  description: string;
  price: string;
  badge?: string;
  badgeDark?: boolean;
  colors: {
    band: string;
    gA: string;
    gB: string;
    gC: string;
    dA: string;
    dB: string;
  };
}

export const products: Product[] = [
  {
    id: 'sovereign',
    name: 'The Sovereign',
    tag: 'Heritage Gold',
    description: '38mm · 18K gold · Brown alligator',
    price: '$12,400',
    badge: 'Bestseller',
    colors: { band: '#241a12', gA: '#e9cb80', gB: '#a98236', gC: '#f3dfa8', dA: '#20201f', dB: '#050505' },
  },
  {
    id: 'meridian',
    name: 'Meridian',
    tag: 'Stainless Steel · Silver',
    description: '40mm · Satin steel · Ivory dial',
    price: '$8,900',
    badge: 'New',
    badgeDark: true,
    colors: { band: '#131313', gA: '#eef1f6', gB: '#9aa2ad', gC: '#ffffff', dA: '#efece1', dB: '#d8d3c4' },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    tag: 'Rose Gold',
    description: '36mm · Rose gold · Cognac strap',
    price: '$11,200',
    colors: { band: '#332316', gA: '#f3cfb0', gB: '#c28557', gC: '#f8e3d0', dA: '#1d1518', dB: '#060505' },
  },
  {
    id: 'nocturne',
    name: 'Nocturne',
    tag: 'Noir Steel',
    description: '41mm · Steel · Midnight blue dial',
    price: '$9,600',
    colors: { band: '#0f1622', gA: '#eef1f6', gB: '#9aa2ad', gC: '#ffffff', dA: '#101c33', dB: '#04070d' },
  },
  {
    id: 'regent',
    name: 'Regent',
    tag: 'Emerald Abyss',
    description: '39mm · 18K gold · Green lacquer dial',
    price: '$13,800',
    badge: 'Limited · 500',
    badgeDark: true,
    colors: { band: '#13231b', gA: '#e9cb80', gB: '#a98236', gC: '#f3dfa8', dA: '#0d2b1e', dB: '#041009' },
  },
  {
    id: 'vanta',
    name: 'Vanta',
    tag: 'Gunmetal · Black',
    description: '42mm · DLC steel · Black-on-black',
    price: '$15,200',
    badge: 'Onyx',
    colors: { band: '#060606', gA: '#4a4a4f', gB: '#18181b', gC: '#6a6a70', dA: '#0b0b0d', dB: '#000000' },
  },
];
