'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Ticket, ArrowRight, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { getTicketByCode, getStoredTickets, Ticket as TicketType } from '@/lib/ticket-utils';

export default function FindTicketPage() {
  const router = useRouter();
  const [ticketCode, setTicketCode] = useState('');
  const [error, setError] = useState('');
  const [recentTickets, setRecentTickets] = useState<TicketType[]>([]);
  const [showRecent, setShowRecent] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!ticketCode.trim()) {
      setError('Please enter a ticket code');
      return;
    }

    const ticket = getTicketByCode(ticketCode.trim());
    if (ticket) {
      router.push(`/ticket/${ticket.code}`);
    } else {
      setError('Ticket not found. Please check the code and try again.');
    }
  };

  const handleShowRecent = () => {
    const tickets = getStoredTickets();
    setRecentTickets(tickets.slice(-5).reverse());
    setShowRecent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 sm:py-20">
      <div className="mx-auto max-w-lg px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full gradient-primary">
            <Ticket className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Find Your Ticket</h1>
          <p className="mt-3 text-muted-foreground">
            Enter your ticket code to view, download, or share your ticket.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Ticket Lookup</CardTitle>
              <CardDescription>
                Your ticket code was provided when you completed your purchase.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={ticketCode}
                    onChange={(e) => {
                      setTicketCode(e.target.value.toUpperCase());
                      setError('');
                    }}
                    placeholder="Enter ticket code (e.g., ABC12345)"
                    className="pl-10 font-mono text-lg tracking-wider"
                    maxLength={8}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full gradient-primary border-0 text-primary-foreground"
                  size="lg"
                >
                  Find Ticket
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              {/* Recent Tickets */}
              <div className="mt-6 pt-6 border-t">
                {!showRecent ? (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={handleShowRecent}
                  >
                    <History className="mr-2 h-4 w-4" />
                    View Recent Tickets
                  </Button>
                ) : recentTickets.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">Recent Tickets</p>
                    {recentTickets.map((ticket) => (
                      <button
                        key={ticket.code}
                        onClick={() => router.push(`/ticket/${ticket.code}`)}
                        className="w-full rounded-lg border p-3 text-left transition-colors hover:bg-muted/50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-mono font-medium text-primary">{ticket.code}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                              {ticket.eventName}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground">
                    No recent tickets found on this device.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          <p>
            Lost your ticket code? Contact the event organizer or check your email 
            for the purchase confirmation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
