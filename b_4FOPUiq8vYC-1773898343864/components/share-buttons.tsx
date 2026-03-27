'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Camera, 
  Link2, 
  Check,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Ticket } from '@/lib/ticket-utils';

interface ShareButtonsProps {
  ticket: Ticket;
}

export function ShareButtons({ ticket }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const ticketUrl = `${baseUrl}/ticket/${ticket.code}`;
  const message = `Check out my ticket for ${ticket.eventName}! View it here: ${ticketUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const encodedUrl = encodeURIComponent(ticketUrl);

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedMessage}`,
    email: `mailto:?subject=${encodeURIComponent(`My Ticket for ${ticket.eventName}`)}&body=${encodedMessage}`,
    snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(ticketUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = ticketUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket for ${ticket.eventName}`,
          text: message,
          url: ticketUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-foreground flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share Your Ticket
      </h4>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* WhatsApp */}
        <Button
          asChild
          variant="outline"
          className="h-auto py-3 flex-col gap-2 hover:bg-green-50 hover:border-green-500 hover:text-green-600"
        >
          <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">WhatsApp</span>
          </a>
        </Button>

        {/* Email */}
        <Button
          asChild
          variant="outline"
          className="h-auto py-3 flex-col gap-2 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600"
        >
          <a href={shareLinks.email}>
            <Mail className="h-5 w-5" />
            <span className="text-xs">Email</span>
          </a>
        </Button>

        {/* Snapchat */}
        <Button
          asChild
          variant="outline"
          className="h-auto py-3 flex-col gap-2 hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-600"
        >
          <a href={shareLinks.snapchat} target="_blank" rel="noopener noreferrer">
            <Camera className="h-5 w-5" />
            <span className="text-xs">Snapchat</span>
          </a>
        </Button>

        {/* Copy Link */}
        <Button
          variant="outline"
          className={`h-auto py-3 flex-col gap-2 ${
            copied 
              ? 'bg-green-50 border-green-500 text-green-600' 
              : 'hover:bg-muted'
          }`}
          onClick={handleCopyLink}
        >
          {copied ? (
            <>
              <Check className="h-5 w-5" />
              <span className="text-xs">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="h-5 w-5" />
              <span className="text-xs">Copy Link</span>
            </>
          )}
        </Button>
      </div>

      {/* Native Share (Mobile) */}
      {typeof navigator !== 'undefined' && navigator.share && (
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleNativeShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share via...
        </Button>
      )}
    </div>
  );
}
