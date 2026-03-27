'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin, Users, Store, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Event } from '@/lib/events-data';
import { formatPrice } from '@/lib/ticket-utils';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  const remainingSlots = event.maxVendors - event.vendorCount;
  const lowestPrice = Math.min(...event.tickets.map(t => t.price));
  const isLow = remainingSlots < 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {event.featured && (
              <Badge className="gradient-primary border-0 text-primary-foreground text-xs">
                Featured
              </Badge>
            )}
            <Badge variant="secondary" className="bg-card/90 text-card-foreground text-xs">
              {event.category}
            </Badge>
          </div>

          {/* Low slots warning */}
          {isLow && (
            <div className="absolute right-3 top-3">
              <Badge variant="destructive" className="animate-blink text-xs">
                Only {remainingSlots} left!
              </Badge>
            </div>
          )}

          {/* Price tag */}
          <div className="absolute bottom-3 right-3">
            <Badge className="bg-card/95 text-card-foreground backdrop-blur text-sm font-semibold">
              From {formatPrice(lowestPrice)}
            </Badge>
          </div>
        </div>

        <CardContent className="space-y-3 p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {event.name}
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{event.location.city}, {event.location.state}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Store className="h-3.5 w-3.5" />
              <span>{event.vendorCount} vendors</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              <span>{event.attendeeCount}+ expected</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button asChild className="w-full gradient-primary border-0 text-primary-foreground">
            <Link href={`/events/${event.id}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
