import { Banner } from '../types';

export const banners: Banner[] = [
  {
    id: '1',
    title: 'Summer Collection',
    subtitle: 'Up to 50% off on selected items',
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db',
    buttonText: 'Shop Now',
    link: '/category/clothing'
  },
  {
    id: '2',
    title: 'New Electronics',
    subtitle: 'Latest gadgets and accessories',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6',
    buttonText: 'Explore',
    link: '/category/electronics'
  },
  {
    id: '3',
    title: 'Home Essentials',
    subtitle: 'Transform your living space',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace',
    buttonText: 'Discover',
    link: '/category/home'
  }
];

export default banners;