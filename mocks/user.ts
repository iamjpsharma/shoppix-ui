import { User, Order } from '../types';
import { products } from './products';

export const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
  phone: '+1 (555) 123-4567',
  addresses: [
    {
      id: '1',
      name: 'Home',
      line1: '123 Main Street',
      line2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States',
      isDefault: true,
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Work',
      line1: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10002',
      country: 'United States',
      phone: '+1 (555) 987-6543'
    }
  ]
};

export const orders: Order[] = [
  {
    id: 'ORD-12345',
    date: '2023-06-15T10:30:00Z',
    status: 'delivered',
    items: [
      {
        product: products[0],
        quantity: 1
      },
      {
        product: products[2],
        quantity: 1,
        color: '#000000'
      }
    ],
    total: 329.98,
    shippingAddress: user.addresses[0],
    paymentMethod: 'Credit Card (**** 1234)',
    trackingNumber: 'TRK-987654321'
  },
  {
    id: 'ORD-12346',
    date: '2023-07-22T14:45:00Z',
    status: 'shipped',
    items: [
      {
        product: products[3],
        quantity: 2,
        size: 'M'
      }
    ],
    total: 59.98,
    shippingAddress: user.addresses[0],
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK-123456789'
  },
  {
    id: 'ORD-12347',
    date: '2023-08-05T09:15:00Z',
    status: 'processing',
    items: [
      {
        product: products[4],
        quantity: 1
      },
      {
        product: products[7],
        quantity: 1
      }
    ],
    total: 92.98,
    shippingAddress: user.addresses[1],
    paymentMethod: 'Credit Card (**** 5678)'
  }
];

export default { user, orders };