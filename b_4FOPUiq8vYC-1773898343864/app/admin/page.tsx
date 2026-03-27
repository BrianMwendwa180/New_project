'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  CreditCard,
  DollarSign,
  Users,
  CalendarDays,
  Store,
  TrendingUp,
  Save,
  RefreshCw,
  ExternalLink,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getAdminSettings,
  saveAdminSettings,
  AdminSettings,
  getRegistrationStats,
  getPriceOverrides,
  savePriceOverride,
  getEffectivePrice,
} from '@/lib/admin-store';
import { events } from '@/lib/events-data';
import { formatPrice, getStoredTickets } from '@/lib/ticket-utils';

export default function AdminPage() {
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings());
  const [priceEdits, setPriceEdits] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);
  const [stats, setStats] = useState(getRegistrationStats());
  const [tickets, setTickets] = useState(getStoredTickets());

  useEffect(() => {
    // Initialize price edits with current effective prices
    const initialPrices: Record<string, number> = {};
    events.forEach(event => {
      event.tickets.forEach(tier => {
        const key = `${event.id}-${tier.id}`;
        initialPrices[key] = getEffectivePrice(event.id, tier.id, tier.price);
      });
    });
    setPriceEdits(initialPrices);
  }, []);

  const handleSettingsSave = () => {
    saveAdminSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePriceSave = (eventId: string, ticketId: string, price: number) => {
    savePriceOverride({ eventId, ticketId, price });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const refreshData = () => {
    setStats(getRegistrationStats());
    setTickets(getStoredTickets());
  };

  const totalRevenue = tickets.reduce((sum, t) => sum + t.ticketPrice, 0);
  const totalTickets = tickets.length;

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your events, payments, and view analytics
              </p>
            </div>
            <Button variant="outline" onClick={refreshData}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 md:grid-cols-4 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tickets Sold</p>
                  <p className="text-2xl font-bold">{totalTickets}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50">
                  <CalendarDays className="h-6 w-6 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Events</p>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Ticket</p>
                  <p className="text-2xl font-bold">
                    {totalTickets > 0 ? formatPrice(totalRevenue / totalTickets) : '$0'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="payments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="payments">
                <CreditCard className="mr-2 h-4 w-4" />
                Payment Settings
              </TabsTrigger>
              <TabsTrigger value="pricing">
                <DollarSign className="mr-2 h-4 w-4" />
                Ticket Pricing
              </TabsTrigger>
              <TabsTrigger value="registrations">
                <Store className="mr-2 h-4 w-4" />
                Registrations
              </TabsTrigger>
            </TabsList>

            {/* Payment Settings Tab */}
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    PayPal Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure how payments are processed for your events
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Mode Toggle */}
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <Label className="text-base">Payment Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        {settings.paypalMode === 'sdk' 
                          ? 'PayPal SDK (Direct Integration)' 
                          : 'NCP Link (Payment Button Link)'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">NCP</span>
                      <Switch
                        checked={settings.paypalMode === 'sdk'}
                        onCheckedChange={(checked) =>
                          setSettings({ ...settings, paypalMode: checked ? 'sdk' : 'ncp' })
                        }
                      />
                      <span className="text-sm text-muted-foreground">SDK</span>
                    </div>
                  </div>

                  <Separator />

                  {/* SDK Settings */}
                  {settings.paypalMode === 'sdk' && (
                    <div className="space-y-4">
                      <h4 className="font-medium">PayPal SDK Settings</h4>
                      <div className="space-y-2">
                        <Label htmlFor="clientId">PayPal Client ID</Label>
                        <Input
                          id="clientId"
                          value={settings.paypalClientId}
                          onChange={(e) =>
                            setSettings({ ...settings, paypalClientId: e.target.value })
                          }
                          placeholder="Enter your PayPal Client ID"
                        />
                        <p className="text-xs text-muted-foreground">
                          Get your Client ID from the{' '}
                          <a
                            href="https://developer.paypal.com/dashboard/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            PayPal Developer Dashboard
                            <ExternalLink className="inline ml-1 h-3 w-3" />
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* NCP Settings */}
                  {settings.paypalMode === 'ncp' && (
                    <div className="space-y-4">
                      <h4 className="font-medium">NCP Link Settings</h4>
                      <div className="space-y-2">
                        <Label htmlFor="ncpLink">PayPal.me or NCP Link</Label>
                        <Input
                          id="ncpLink"
                          value={settings.ncpLink}
                          onChange={(e) =>
                            setSettings({ ...settings, ncpLink: e.target.value })
                          }
                          placeholder="https://paypal.me/yourusername or NCP button link"
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter your PayPal.me link or NCP button link for receiving payments
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Common Settings */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">PayPal Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.paypalEmail}
                        onChange={(e) =>
                          setSettings({ ...settings, paypalEmail: e.target.value })
                        }
                        placeholder="your@email.com"
                      />
                      <p className="text-xs text-muted-foreground">
                        Your PayPal account email for receiving payments
                      </p>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button onClick={handleSettingsSave} className="gradient-primary border-0 text-primary-foreground">
                      {saved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Settings
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Status */}
                  <Alert>
                    <AlertDescription>
                      {settings.paypalMode === 'sdk' && settings.paypalClientId ? (
                        <span className="text-green-600">PayPal SDK is configured and ready</span>
                      ) : settings.paypalMode === 'ncp' && settings.ncpLink ? (
                        <span className="text-green-600">NCP Link is configured and ready</span>
                      ) : (
                        <span className="text-yellow-600">Please configure payment settings above</span>
                      )}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing">
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Pricing</CardTitle>
                  <CardDescription>
                    Adjust ticket prices for your events. Changes take effect immediately.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {events.slice(0, 4).map((event) => (
                      <div key={event.id} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Store className="h-5 w-5 text-primary" />
                          <h4 className="font-medium">{event.name}</h4>
                          <Badge variant="secondary">{event.category}</Badge>
                        </div>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ticket Type</TableHead>
                              <TableHead>Base Price</TableHead>
                              <TableHead>Current Price</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {event.tickets.map((tier) => {
                              const key = `${event.id}-${tier.id}`;
                              return (
                                <TableRow key={tier.id}>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium">{tier.name}</p>
                                      <p className="text-xs text-muted-foreground">{tier.description}</p>
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">
                                    {formatPrice(tier.price)}
                                  </TableCell>
                                  <TableCell>
                                    <div className="flex items-center gap-2">
                                      <span className="text-muted-foreground">$</span>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-24"
                                        value={priceEdits[key] || tier.price}
                                        onChange={(e) =>
                                          setPriceEdits({
                                            ...priceEdits,
                                            [key]: parseFloat(e.target.value) || 0,
                                          })
                                        }
                                      />
                                    </div>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handlePriceSave(event.id, tier.id, priceEdits[key])
                                      }
                                    >
                                      <Save className="mr-1 h-3 w-3" />
                                      Save
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        <Separator />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Registrations Tab */}
            <TabsContent value="registrations">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Registrations</CardTitle>
                  <CardDescription>
                    View all ticket purchases and registration details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {tickets.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ticket Code</TableHead>
                          <TableHead>Event</TableHead>
                          <TableHead>Holder</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tickets.slice().reverse().map((ticket) => (
                          <TableRow key={ticket.code}>
                            <TableCell className="font-mono font-medium text-primary">
                              {ticket.code}
                            </TableCell>
                            <TableCell className="max-w-[150px] truncate">
                              {ticket.eventName}
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{ticket.holderName}</p>
                                <p className="text-xs text-muted-foreground">{ticket.holderEmail}</p>
                              </div>
                            </TableCell>
                            <TableCell>{ticket.ticketType}</TableCell>
                            <TableCell>{formatPrice(ticket.ticketPrice)}</TableCell>
                            <TableCell>
                              <Badge
                                variant={ticket.status === 'valid' ? 'default' : 'secondary'}
                                className={
                                  ticket.status === 'valid'
                                    ? 'bg-green-100 text-green-700'
                                    : ''
                                }
                              >
                                {ticket.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {new Date(ticket.purchaseDate).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="py-12 text-center">
                      <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 font-medium text-foreground">No registrations yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Registrations will appear here once customers purchase tickets.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
