'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HeroSection } from '@/components/hero-section';
import { EventCard } from '@/components/event-card';
import { events, getFeaturedEvents } from '@/lib/events-data';

const categories = [
  'All Categories',
  'Vendor Expo',
  'Outdoor Market',
  'Craft Fair',
  'Farmers Market',
  'Flea Market',
  'Food Festival',
  'Jewelry Show',
  'Art Show',
  'Pet Expo',
  'Craft Bazaar',
];

const states = [
  'All States',
  'Indiana',
  'Oregon',
  'Ohio',
  'Kentucky',
  'Illinois',
  'Massachusetts',
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedState, setSelectedState] = useState('All States');

  const featuredEvent = getFeaturedEvents()[0];

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.state.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All Categories' || 
        event.category === selectedCategory;
      
      const matchesState = selectedState === 'All States' || 
        event.location.state === selectedState;

      return matchesSearch && matchesCategory && matchesState;
    });
  }, [searchQuery, selectedCategory, selectedState]);

  const nonFeaturedEvents = filteredEvents.filter(e => !e.featured || e.id !== featuredEvent.id);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection event={featuredEvent} />

      {/* Events Section */}
      <section id="events" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <Badge className="mb-4 gradient-accent border-0 text-accent-foreground">
              <TrendingUp className="mr-1 h-3 w-3" />
              Upcoming Events
            </Badge>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Find Your Next Vendor Opportunity
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Browse our curated selection of vendor events, craft fairs, and markets. 
              Book your booth today and connect with customers.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events, cities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* State Filter */}
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full md:w-[160px]">
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'All Categories' || selectedState !== 'All States') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                    setSelectedState('All States');
                  }}
                >
                  Clear
                </Button>
              )}
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredEvents.length}</span> events
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Sorted by date</span>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground">No events found</h3>
              <p className="mt-2 text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                  setSelectedState('All States');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl gradient-primary p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl text-balance">
              Ready to Showcase Your Products?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/90">
              Join hundreds of vendors who have found success at our events. 
              Book your booth today and start growing your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Browse Events
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
