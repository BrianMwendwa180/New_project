import QRCode from 'qrcode';

export interface Ticket {
  code: string;
  eventId: string;
  eventName: string;
  ticketType: string;
  ticketPrice: number;
  holderName: string;
  holderEmail: string;
  purchaseDate: string;
  transactionId: string;
  status: 'valid' | 'used' | 'cancelled';
  qrCodeUrl?: string;
}

export interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  ticketTierId: string;
  quantity: number;
  specialRequests?: string;
}

// Generate unique ticket code
export function generateTicketCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generate QR code as data URL
export async function generateQRCode(ticketCode: string, baseUrl: string): Promise<string> {
  const ticketUrl = `${baseUrl}/ticket/${ticketCode}`;
  try {
    const qrDataUrl = await QRCode.toDataURL(ticketUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#1a1a1a',
        light: '#ffffff'
      }
    });
    return qrDataUrl;
  } catch (error) {
    console.error('QR generation error:', error);
    return '';
  }
}

// Store ticket in localStorage
export function saveTicket(ticket: Ticket): void {
  if (typeof window === 'undefined') return;
  const tickets = getStoredTickets();
  tickets.push(ticket);
  localStorage.setItem('vendorsquare_tickets', JSON.stringify(tickets));
}

// Get all stored tickets
export function getStoredTickets(): Ticket[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('vendorsquare_tickets');
  return stored ? JSON.parse(stored) : [];
}

// Get ticket by code
export function getTicketByCode(code: string): Ticket | undefined {
  const tickets = getStoredTickets();
  return tickets.find(t => t.code.toUpperCase() === code.toUpperCase());
}

// Validate PayPal return parameters
export function validatePayPalReturn(searchParams: URLSearchParams): {
  valid: boolean;
  transactionId?: string;
  amount?: string;
  status?: string;
} {
  const status = searchParams.get('st');
  const transactionId = searchParams.get('tx');
  const amount = searchParams.get('amt');
  
  // Check for PayPal completed status
  if (status === 'Completed' && transactionId) {
    return {
      valid: true,
      transactionId,
      amount: amount || undefined,
      status
    };
  }
  
  return { valid: false };
}

// Format price
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

// Get share URLs
export function getShareUrls(ticket: Ticket, baseUrl: string) {
  const ticketUrl = `${baseUrl}/ticket/${ticket.code}`;
  const message = `Check out my ticket for ${ticket.eventName}! ${ticketUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(ticketUrl);
  
  return {
    whatsapp: `https://wa.me/?text=${encodedMessage}`,
    email: `mailto:?subject=${encodeURIComponent(`My Ticket for ${ticket.eventName}`)}&body=${encodedMessage}`,
    snapchat: `https://www.snapchat.com/share?url=${encodedUrl}`,
    copy: ticketUrl
  };
}
