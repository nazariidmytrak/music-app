import { Stripe } from 'stripe';

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  image?: string;
  description?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  active?: boolean;
  product_id?: string;
  description?: string;
  currency?: string;
  unit_amount?: number;
  interval_count?: number;
  trial_period_days?: number | null;
  type?: Stripe.Price.Type;
  metadata?: Stripe.Metadata;
  interval?: Stripe.Price.Recurring.Interval;
  products: Product;
}

export interface Subscription {
  id: string;
  created: string;
  user_id: string;
  current_period_start: string;
  current_period_end: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: string;
  ended_at?: string;
  cancel_at_period_end?: boolean;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices: Price;
}
