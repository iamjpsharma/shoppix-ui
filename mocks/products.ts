import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Leather Backpack',
    price: 129.99,
    originalPrice: 159.99,
    description: 'A sleek, minimalist backpack crafted from premium full-grain leather. Features a padded laptop compartment, multiple interior pockets, and adjustable shoulder straps for all-day comfort.',
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa',
      'https://images.unsplash.com/photo-1544816155-12df9643f363',
    ],
    rating: 4.8,
    reviewCount: 124,
    category: 'bags',
    tags: ['leather', 'backpack', 'accessories'],
    colors: ['#6B3E2E', '#000000', '#D3D3D3'],
    inStock: true,
    featured: true,
    discount: 19,
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Includes a carrying case and charging cable.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29',
    ],
    rating: 4.7,
    reviewCount: 89,
    category: 'electronics',
    tags: ['headphones', 'wireless', 'audio'],
    colors: ['#000000', '#FFFFFF', '#C0C0C0'],
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS tracking, sleep analysis, and is water-resistant up to 50 meters.',
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9',
    ],
    rating: 4.5,
    reviewCount: 76,
    category: 'electronics',
    tags: ['watch', 'fitness', 'smart'],
    colors: ['#000000', '#C0C0C0', '#FF69B4'],
    inStock: true,
    discount: 20,
    isNew: true,
  },
  {
    id: '4',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    description: 'Ultra-soft premium cotton t-shirt with a relaxed fit. Breathable, comfortable, and perfect for everyday wear.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9',
    ],
    rating: 4.3,
    reviewCount: 215,
    category: 'clothing',
    tags: ['t-shirt', 'cotton', 'casual'],
    colors: ['#FFFFFF', '#000000', '#808080', '#ADD8E6'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Ceramic Pour-Over Coffee Maker',
    price: 42.99,
    description: 'Handcrafted ceramic pour-over coffee maker for the perfect cup every time. Includes a reusable stainless steel filter and wooden stand.',
    images: [
      'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f',
      'https://images.unsplash.com/photo-1606791405792-1004f1d5e60a',
      'https://images.unsplash.com/photo-1610889556528-9a770e32642f',
    ],
    rating: 4.6,
    reviewCount: 58,
    category: 'home',
    tags: ['coffee', 'kitchen', 'ceramic'],
    colors: ['#FFFFFF', '#000000', '#8B4513'],
    inStock: true,
    isNew: true,
  },
  {
    id: '6',
    name: 'Slim Fit Denim Jeans',
    price: 79.99,
    originalPrice: 99.99,
    description: 'Classic slim-fit denim jeans with a comfortable stretch. Features five pockets and a button closure with zip fly.',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb',
      'https://images.unsplash.com/photo-1604176424472-9d7122c67c3c',
    ],
    rating: 4.4,
    reviewCount: 132,
    category: 'clothing',
    tags: ['jeans', 'denim', 'pants'],
    colors: ['#191970', '#000080', '#000000'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    inStock: true,
    discount: 20,
  },
  {
    id: '7',
    name: 'Portable Bluetooth Speaker',
    price: 89.99,
    description: 'Compact, waterproof Bluetooth speaker with 20-hour battery life and immersive 360° sound. Perfect for outdoor adventures.',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1',
      'https://images.unsplash.com/photo-1589003077984-894e133dabab',
      'https://images.unsplash.com/photo-1558537348-c0f8e733989d',
    ],
    rating: 4.2,
    reviewCount: 97,
    category: 'electronics',
    tags: ['speaker', 'bluetooth', 'audio'],
    colors: ['#000000', '#FF0000', '#0000FF'],
    inStock: true,
  },
  {
    id: '8',
    name: 'Minimalist Wall Clock',
    price: 49.99,
    description: 'Modern minimalist wall clock with a silent sweep mechanism. Made from sustainable bamboo with a clean, Scandinavian design.',
    images: [
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c',
      'https://images.unsplash.com/photo-1507646227500-4d389b0012be',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261',
    ],
    rating: 4.8,
    reviewCount: 43,
    category: 'home',
    tags: ['clock', 'decor', 'wall'],
    colors: ['#FFFFFF', '#000000', '#8B4513'],
    inStock: true,
    featured: true,
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getDiscountedProducts = (): Product[] => {
  return products.filter(product => product.discount && product.discount > 0);
};

export default products;