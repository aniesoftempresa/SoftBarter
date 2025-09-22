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

export interface CreateTradeDto {
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

export interface CreateOfferDto {
  message: string;
  itemOffered?: string;
  monetaryOffer?: number;
}

export interface Transaction {
  id: number;
  title: string;
  description?: string;
  status: TransactionStatus;
  createdAt: string;
  completedAt?: string;
  completionNotes?: string;
  traderRating?: number;
  offerorRating?: number;
  traderReview?: string;
  offerorReview?: string;
  trade: Trade;
  acceptedOffer: Offer;
  trader: User;
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

export enum TransactionStatus {
  InProgress = 0,
  Completed = 1,
  Cancelled = 2,
  Disputed = 3
}

export interface TradeSearchParams {
  category?: string;
  location?: string;
  itemSought?: string;
  itemOffered?: string;
  minValue?: number;
  maxValue?: number;
  isNegotiable?: boolean;
  condition?: string;
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  trades: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}