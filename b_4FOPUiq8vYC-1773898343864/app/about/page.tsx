'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  Store, 
  Heart, 
  Target, 
  Sparkles, 
  MapPin,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Users,
    title: 'Community First',
    description: 'We believe in the power of local communities coming together to support small businesses and artisans.',
  },
  {
    icon: Store,
    title: 'Empowering Vendors',
    description: 'Our mission is to give vendors the tools they need to succeed and reach new customers.',
  },
  {
    icon: Heart,
    title: 'Authentic Experiences',
    description: 'Every event we feature is carefully curated to ensure quality experiences for both vendors and attendees.',
  },
  {
    icon: Target,
    title: 'Easy & Accessible',
    description: 'We make it simple for vendors to book their spots and for attendees to discover amazing local events.',
  },
];

const stats = [
  { value: '500+', label: 'Vendors Served' },
  { value: '50+', label: 'Events Listed' },
  { value: '10K+', label: 'Happy Attendees' },
  { value: '12', label: 'States Covered' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl text-balance">
              Connecting Vendors with Communities
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              VendorSquare was born from a simple idea: make it easier for local vendors, 
              artisans, and small business owners to find and participate in events where 
              they can showcase their products and connect with customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It all started at a local craft fair in Richmond, Indiana. We watched as talented 
                  vendors struggled to find events, manage bookings, and connect with customers. 
                  Meanwhile, event organizers were drowning in spreadsheets and manual processes.
                </p>
                <p>
                  We knew there had to be a better way. VendorSquare was created to bridge this gap - 
                  a platform where vendors can easily discover and book event spaces, and organizers 
                  can streamline their registration and payment processes.
                </p>
                <p>
                  Today, we serve hundreds of vendors across the Midwest and beyond, helping them 
                  grow their businesses one event at a time. Our mission remains the same: empower 
                  local entrepreneurs and strengthen communities through the magic of in-person events.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/spring-fling-expo.jpg"
                  alt="Vendor event showcase"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl gradient-accent -z-10" />
              <div className="absolute -top-6 -right-6 h-16 w-16 rounded-lg bg-secondary/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground">What We Stand For</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do, from the events we feature to the 
              vendors we support.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-primary mb-4">
                      <value.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl gradient-primary p-8 sm:p-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-4xl font-bold text-primary-foreground">{stat.value}</p>
                  <p className="mt-1 text-primary-foreground/80">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-foreground">Based in Richmond, Indiana</h2>
            <p className="mt-4 text-muted-foreground">
              While we serve vendors and events across the country, our roots are firmly 
              planted in the heartland. We understand the unique needs of Midwest communities 
              and are proud to call Richmond home.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-primary mb-4" />
          <h2 className="text-3xl font-bold text-foreground">Ready to Get Started?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Whether you are a vendor looking for your next event or an organizer seeking 
            to fill your booths, we are here to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gradient-primary border-0 text-primary-foreground">
              <Link href="/">
                Browse Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
