import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import { Save, IndianRupee, Ticket, Key } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { toast } = useToast();
  
  const [membershipFee, setMembershipFee] = useState(settings.membershipFee);
  const [defaultTicketPrice, setDefaultTicketPrice] = useState(settings.defaultEventTicketPrice);
  const [razorpayKeyId, setRazorpayKeyId] = useState(settings.razorpayKeyId);

  const handleSave = () => {
    updateSettings({
      membershipFee,
      defaultEventTicketPrice: defaultTicketPrice,
      razorpayKeyId,
    });
    toast({
      title: 'Settings Saved',
      description: 'Your settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization's global settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <IndianRupee className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="font-heading">Membership Fee</CardTitle>
                <CardDescription>Annual membership fee for new members</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="membershipFee">Amount (₹)</Label>
              <Input
                id="membershipFee"
                type="number"
                value={membershipFee}
                onChange={(e) => setMembershipFee(Number(e.target.value))}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Ticket className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <CardTitle className="font-heading">Default Ticket Price</CardTitle>
                <CardDescription>Default price for new event tickets</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="ticketPrice">Amount (₹)</Label>
              <Input
                id="ticketPrice"
                type="number"
                value={defaultTicketPrice}
                onChange={(e) => setDefaultTicketPrice(Number(e.target.value))}
                min={0}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Key className="h-5 w-5 text-accent" />
              </div>
              <div>
                <CardTitle className="font-heading">Payment Integration</CardTitle>
                <CardDescription>Configure Razorpay for accepting payments</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="razorpayKey">Razorpay Key ID</Label>
              <Input
                id="razorpayKey"
                type="text"
                value={razorpayKeyId}
                onChange={(e) => setRazorpayKeyId(e.target.value)}
                placeholder="rzp_live_xxxxxxxxxxxxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Get your API keys from the Razorpay Dashboard
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
