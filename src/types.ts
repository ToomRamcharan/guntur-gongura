export interface MenuItem {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isVeg: boolean;
  isAvailable: boolean;
}

export interface TodaySpecial {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isAvailable: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption: string;
  category: 'food' | 'interior' | 'events' | 'kitchen' | 'exterior';
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  birthday?: string;
  createdAt: string;
}

export interface LoyaltyMember {
  id: string;
  userId: string;
  name: string;
  phone: string;
  visitsCount: number;
  birthDate?: string;
  points: number;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  pickupTime: string;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Feedback {
  id: string;
  name: string;
  phone: string;
  rating: number;
  comments: string;
  createdAt: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface OpeningHours {
  [day: string]: string;
}
