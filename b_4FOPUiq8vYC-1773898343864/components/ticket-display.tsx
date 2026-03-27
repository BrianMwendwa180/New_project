'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Ticket as TicketIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Download
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShareButtons } from '@/components/share-buttons';
import { Ticket, formatPrice, generateQRCode } from '@/lib/ticket-utils';
import { getEventById } from '@/lib/events-data';

interface TicketDisplayProps {
  ticket: Ticket;
}

export function TicketDisplay({ ticket }: TicketDisplayProps) {
  const [qrCode, setQrCode] = useState(ticket.qrCodeUrl || '');
  const event = getEventById(ticket.eventId);

  useEffect(() => {
    // Regenerate QR code if not present
    if (!qrCode && typeof window !== 'undefined') {
      generateQRCode(ticket.code, window.location.origin).then(setQrCode);
    }
  }, [ticket.code, qrCode]);

  const statusConfig = {
    valid: {
      icon: CheckCircle2,
      label: 'Valid',
      color: 'bg-green-100 text-green-700 border-green-200',
    },
    used: {
      icon: Clock,
      label: 'Used',
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    cancelled: {
      icon: XCircle,
      label: 'Cancelled',
      color: 'bg-red-100 text-red-700 border-red-200',
    },
  };

  const status = statusConfig[ticket.status];
  const StatusIcon = status.icon;

  const handleDownload = () => {
    // Create a printable version
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Ticket - ${ticket.eventName}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; }
            .ticket { border: 2px solid #e5e5e5; border-radius: 12px; padding: 24px; }
            .header { text-align: center; margin-bottom: 24px; }
            .logo { font-size: 24px; font-weight: bold; color: #f97316; }
            .event-name { font-size: 20px; font-weight: 600; margin-top: 12px; }
            .qr-container { text-align: center; margin: 24px 0; }
            .qr-code { width: 150px; height: 150px; }
            .ticket-code { font-family: monospace; font-size: 24px; font-weight: bold; text-align: center; margin: 16px 0; }
            .details { display: grid; gap: 12px; margin-top: 24px; }
            .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
            .label { color: #666; }
            .value { font-weight: 500; }
            .footer { text-align: center; margin-top: 24px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <div class="logo">VendorSquare</div>
              <div class="event-name">${ticket.eventName}</div>
            </div>
            <div class="qr-container">
              <img src="${qrCode}" alt="QR Code" class="qr-code" />
            </div>
            <div class="ticket-code">${ticket.code}</div>
            <div class="details">
              <div class="detail-row">
                <span class="label">Ticket Type</span>
                <span class="value">${ticket.ticketType}</span>
              </div>
              <div class="detail-row">
                <span class="label">Holder Name</span>
                <span class="value">${ticket.holderName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Email</span>
                <span class="value">${ticket.holderEmail}</span>
              </div>
              <div class="detail-row">
                <span class="label">Price Paid</span>
                <span class="value">${formatPrice(ticket.ticketPrice)}</span>
              </div>
              <div class="detail-row">
                <span class="label">Transaction ID</span>
                <span class="value">${ticket.transactionId}</span>
              </div>
              <div class="detail-row">
                <span class="label">Purchase Date</span>
                <span class="value">${new Date(ticket.purchaseDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div class="footer">
              <p>Present this ticket at the event entrance</p>
              <p>vendorsquare.com</p>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Main Ticket Card */}
      <Card className="overflow-hidden">
        {/* Header with gradient */}
        <div className="gradient-primary p-6 text-primary-foreground">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm opacity-80">Your Ticket</p>
              <h2 className="text-xl font-bold mt-1">{ticket.eventName}</h2>
            </div>
            <Badge className={status.color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-muted/50 p-6">
              {qrCode ? (
                <div className="relative h-40 w-40 rounded-lg bg-white p-2 shadow-sm">
                  <Image
                    src={qrCode}
                    alt="Ticket QR Code"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-40 w-40 items-center justify-center rounded-lg bg-muted">
                  <TicketIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Ticket Code</p>
                <p className="font-mono text-2xl font-bold text-primary">{ticket.code}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <TicketIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Type</p>
                    <p className="font-medium">{ticket.ticketType}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <User className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ticket Holder</p>
                    <p className="font-medium">{ticket.holderName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/50">
                    <Mail className="h-5 w-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm truncate max-w-[200px]">{ticket.holderEmail}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Price Paid</p>
                  <p className="font-semibold text-primary">{formatPrice(ticket.ticketPrice)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Purchase Date</p>
                  <p className="font-medium">{new Date(ticket.purchaseDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Info */}
      {event && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Event Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="h-5 w-5 text-accent-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{event.location.venue}</p>
                  <p className="text-sm text-muted-foreground">
                    {event.location.address}, {event.location.city}, {event.location.state}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Download Button */}
          <Button
            onClick={handleDownload}
            className="w-full gradient-primary border-0 text-primary-foreground"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4" />
            Download / Print Ticket
          </Button>

          <Separator />

          {/* Share Buttons */}
          <ShareButtons ticket={ticket} />
        </CardContent>
      </Card>

      {/* Important Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <h4 className="font-medium mb-3">Important Information</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>- Present this ticket (digital or printed) at the event entrance</li>
            <li>- Your QR code will be scanned for entry</li>
            <li>- This ticket is non-transferable</li>
            <li>- Contact the organizer for any questions</li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
