'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Store, 
  Mail, 
  ArrowLeft,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RegistrationForm } from '@/components/registration-form';
import { getEventById, events } from '@/lib/events-data';
import { EventCard } from '@/components/event-card';

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params.id as string;
  const event = getEventById(eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Event Not Found</h1>
          <p className="mt-2 text-muted-foreground">This event doesn&apos;t exist or has been removed.</p>
          <Button asChild className="mt-4">
            <Link href="/">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const remainingSlots = event.maxVendors - event.vendorCount;
  const percentageFull = Math.round((event.vendorCount / event.maxVendors) * 100);
  const relatedEvents = events.filter(e => e.id !== event.id && e.category === event.category).slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.name,
        text: event.tagline,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${event.location.venue}, ${event.location.address}, ${event.location.city}, ${event.location.state}`
  )}`;

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Image */}
      <div className="relative h-[300px] sm:h-[400px]">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Back Button */}
        <div className="absolute left-4 top-4 sm:left-8 sm:top-8">
          <Button asChild variant="secondary" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>

        {/* Share Button */}
        <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
          <Button variant="secondary" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {event.featured && (
                <Badge className="gradient-primary border-0 text-primary-foreground">
                  Featured
                </Badge>
              )}
              <Badge variant="secondary">{event.category}</Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white text-balance">
              {event.name}
            </h1>
            <p className="mt-2 text-white/80 max-w-2xl">
              {event.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <CalendarDays className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{event.date}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{event.time}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="sm:col-span-2">
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50">
                    <MapPin className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{event.location.venue}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.location.address}, {event.location.city}, {event.location.state}
                    </p>
                    <Button asChild variant="link" className="h-auto p-0 mt-1 text-primary">
                      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        View on Google Maps
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Event Stats</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{event.vendorCount}</div>
                      <div className="text-sm text-muted-foreground">Vendors</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary">{event.attendeeCount}+</div>
                      <div className="text-sm text-muted-foreground">Expected Attendees</div>
                    </div>
                    <div>
                      <motion.div
                        className="text-2xl font-bold text-destructive"
                        animate={remainingSlots < 10 ? { opacity: [1, 0.5, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {remainingSlots}
                      </motion.div>
                      <div className="text-sm text-muted-foreground">Spots Left</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vendor capacity</span>
                      <span className="font-medium">{percentageFull}% full</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full gradient-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentageFull}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">About This Event</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Organizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Event Organizer</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary">
                      <Store className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{event.organizer.name}</p>
                      <a 
                        href={`mailto:${event.organizer.email}`}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                      >
                        <Mail className="h-3 w-3" />
                        {event.organizer.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Separator className="my-8" />
                <h3 className="text-lg font-semibold mb-6">Similar Events</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedEvents.map((relEvent, index) => (
                    <EventCard key={relEvent.id} event={relEvent} index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Registration Form Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <RegistrationForm event={event} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
