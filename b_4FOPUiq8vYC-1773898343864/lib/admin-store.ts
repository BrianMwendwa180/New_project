'use client';

export interface AdminSettings {
  paypalMode: 'sdk' | 'ncp';
  paypalClientId: string;
  paypalEmail: string;
  ncpLink: string;
  returnUrl: string;
  testMode: boolean;
}

export interface EventPriceOverride {
  eventId: string;
  ticketId: string;
  price: number;
}

const DEFAULT_SETTINGS: AdminSettings = {
  paypalMode: 'sdk', // Default to SDK for direct PayPal integration
  paypalClientId: '', // Will fall back to env var
  paypalEmail: 'your-business@paypal.com', // Your PayPal business account email
  ncpLink: 'https://www.paypal.com/ncp/payment/YOUR_NCP_LINK_HERE', // Or use paypal.me/yourusername
  returnUrl: '',
  testMode: true
};

// Get admin settings
export function getAdminSettings(): AdminSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  const stored = localStorage.getItem('vendorsquare_admin');
  return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
}

// Check if test mode is enabled
export function isTestMode(): boolean {
  return getAdminSettings().testMode;
}

// Save admin settings
export function saveAdminSettings(settings: Partial<AdminSettings>): void {
  if (typeof window === 'undefined') return;
  const current = getAdminSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem('vendorsquare_admin', JSON.stringify(updated));
}

// Get price overrides
export function getPriceOverrides(): EventPriceOverride[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('vendorsquare_prices');
  return stored ? JSON.parse(stored) : [];
}

// Save price override
export function savePriceOverride(override: EventPriceOverride): void {
  if (typeof window === 'undefined') return;
  const overrides = getPriceOverrides();
  const existingIndex = overrides.findIndex(
    o => o.eventId === override.eventId && o.ticketId === override.ticketId
  );
  if (existingIndex >= 0) {
    overrides[existingIndex] = override;
  } else {
    overrides.push(override);
  }
  localStorage.setItem('vendorsquare_prices', JSON.stringify(overrides));
}

// Get effective price for a ticket
export function getEffectivePrice(eventId: string, ticketId: string, basePrice: number): number {
  const overrides = getPriceOverrides();
  const override = overrides.find(
    o => o.eventId === eventId && o.ticketId === ticketId
  );
  return override ? override.price : basePrice;
}

// Get registration stats
export function getRegistrationStats(): { eventId: string; count: number; revenue: number }[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('vendorsquare_tickets');
  const tickets = stored ? JSON.parse(stored) : [];
  
  const stats: Record<string, { count: number; revenue: number }> = {};
  
  tickets.forEach((ticket: { eventId: string; ticketPrice: number }) => {
    if (!stats[ticket.eventId]) {
      stats[ticket.eventId] = { count: 0, revenue: 0 };
    }
    stats[ticket.eventId].count++;
    stats[ticket.eventId].revenue += ticket.ticketPrice;
  });
  
  return Object.entries(stats).map(([eventId, data]) => ({
    eventId,
    ...data
  }));
}
