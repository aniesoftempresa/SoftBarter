// Same types as web app for consistency
export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  name: string;
  userId: number;
  expiresAt: string;
}

export interface Trade {
  id: number;
  title: string;
  description: string;
  itemOffered: string;
  itemSought: string;
  category?: string;
  location?: string;
  estimatedValue?: number;
  isNegotiable: boolean;
  expiryDate?: string;
  imageUrls?: string;
  condition?: string;
  viewCount: number;
  status: TradeStatus;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: User;
  offers: Offer[];
}

export interface Offer {
  id: number;
  message: string;
  itemOffered?: string;
  monetaryOffer?: number;
  status: OfferStatus;
  createdAt: string;
  responseDate?: string;
  responseMessage?: string;
  offerorId: number;
  offeror: User;
}

export enum TradeStatus {
  Active = 0,
  Completed = 1,
  Cancelled = 2,
  Expired = 3,
  UnderOffer = 4
}

export enum OfferStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Withdrawn = 3,
  Expired = 4
}