'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Ticket, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TicketDisplay } from '@/components/ticket-display';
import { getTicketByCode, Ticket as TicketType } from '@/lib/ticket-utils';

export default function TicketPage() {
  const params = useParams();
  const code = params.code as string;
  const [ticket, setTicket] = useState<TicketType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundTicket = getTicketByCode(code);
    setTicket(foundTicket || null);
    setLoading(false);
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading ticket...</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Ticket Not Found</h1>
          <p className="mt-3 text-muted-foreground">
            We couldn&apos;t find a ticket with the code <span className="font-mono font-bold">{code}</span>. 
            Please check the code and try again.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="outline">
              <Link href="/find-ticket">
                <Search className="mr-2 h-4 w-4" />
                Find Ticket
              </Link>
            </Button>
            <Button asChild className="gradient-primary border-0 text-primary-foreground">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Ticket className="h-4 w-4" />
            <span>Ticket #{ticket.code}</span>
          </div>
        </div>

        {/* Ticket Display */}
        <TicketDisplay ticket={ticket} />
      </div>
    </div>
  );
}
