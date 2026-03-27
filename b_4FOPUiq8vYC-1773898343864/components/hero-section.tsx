'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, MapPin, Users, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Event } from '@/lib/events-data';

interface HeroSectionProps {
  event: Event;
}

export function HeroSection({ event }: HeroSectionProps) {
  const remainingSlots = event.maxVendors - event.vendorCount;
  const percentageFull = Math.round((event.vendorCount / event.maxVendors) * 100);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Floating Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[10%] top-[15%] h-32 w-32 rounded-2xl bg-primary/10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-[15%] top-[20%] h-24 w-24 rounded-full bg-accent/20"
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[5%] h-20 w-20 rounded-xl bg-secondary/10"
          animate={{
            y: [0, -10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-[30%] right-[8%] h-16 w-16 rounded-full bg-primary/15"
          animate={{
            y: [0, 20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="gradient-primary border-0 text-primary-foreground px-3 py-1">
                <Sparkles className="mr-1 h-3 w-3" />
                Featured Event
              </Badge>
              <Badge variant="outline" className="text-secondary border-secondary">
                {event.category}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              {event.name}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {event.tagline}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{event.location.city}, {event.location.state}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{event.vendorCount}+</div>
                <div className="text-sm text-muted-foreground">Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">{event.attendeeCount}+</div>
                <div className="text-sm text-muted-foreground">Attendees Expected</div>
              </div>
              <div className="text-center">
                <motion.div
                  className="text-2xl font-bold text-destructive"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {remainingSlots}
                </motion.div>
                <div className="text-sm text-muted-foreground">Slots Left</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vendor spots filling up</span>
                <span className="font-medium text-primary">{percentageFull}% full</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full gradient-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentageFull}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground animate-pulse-glow">
                <Link href={`/events/${event.id}`}>
                  Get Your Spot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#events">
                  <Users className="mr-2 h-4 w-4" />
                  View All Events
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={event.image}
                alt={event.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Floating Card */}
              <motion.div
                className="absolute bottom-4 left-4 right-4 rounded-xl bg-card/95 backdrop-blur p-4 shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{event.location.venue}</p>
                    <p className="text-xs text-muted-foreground">{event.location.address}</p>
                  </div>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    Selling Fast
                  </Badge>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl gradient-accent -z-10" />
            <div className="absolute -top-4 -left-4 h-16 w-16 rounded-xl bg-secondary/20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
