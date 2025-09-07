// lib/admin-card-config.ts
export interface AdminPricingCard {
  id: string;
  name: string;
  page: string;
  currentPrice: number;
  originalPrice: number;
  variant: "dark" | "medium" | "golden" | "blue" | "light" | "lightgreen" | "lightblue" | "purple";
  hasSpeedSelector: boolean;
  speeds: { id: string; label: string; price: number; originalPrice?: number }[];
  features: string[];
  extras: { id: string; label: string; price: number; description?: string; isDropdown?: boolean; dropdownOptions?: { id: string; label: string; price: number }[] }[];
  extraOptionsCount: number;
  showExtraDropdowns: boolean;
  isPopular: boolean;
  ctaText: string;
  rateTier: 1 | 2 | 3 | 4;
  isActive: boolean;
  isHeroOffer: boolean;
  createdAt: string; // Cambiado de Date a string
  updatedAt: string; // Cambiado de Date a string
}