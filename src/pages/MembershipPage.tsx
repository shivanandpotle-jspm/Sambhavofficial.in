import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, CheckCircle, Heart, Calendar, Award, Sparkles } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useRazorpay } from '@/hooks/useRazorpay';
import { toast } from '@/hooks/use-toast';

const benefits = [
  'Access to all workshops and events at discounted rates',
  'Exclusive member-only networking sessions',
  'Certificate of membership',
  'Monthly newsletter with insights and updates',
  'Priority registration for limited-seat events',
  'One-on-one mentorship opportunities',
  'Access to our resource library',
  'Voting rights in annual general meetings',
];

export const MembershipPage: React.FC = () => {
  const { addMember, settings } = useAdmin();
  const { payMembershipFee } = useRazorpay(settings.razorpayKeyId);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    motivation: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);

    if (settings.membershipFee > 0) {
      payMembershipFee(
        settings.membershipFee,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        () => {
          completeMembership();
        }
      );
    } else {
      completeMembership();
    }

    setIsProcessing(false);
  };

  const completeMembership = () => {
    addMember({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      joinedAt: new Date().toISOString(),
      membershipStatus: 'active',
      feePaid: settings.membershipFee > 0,
    });

    toast({
      title: 'Welcome to Empower! 🎉',
      description: 'Your membership application has been submitted. Check your email for confirmation.',
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      occupation: '',
      motivation: '',
    });
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
              <Users className="h-10 w-10 text-secondary-foreground" />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Become a member and unlock exclusive benefits while contributing to meaningful change in society.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Benefits */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Member Benefits
              </h2>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Membership Fee Card */}
              <Card className="border-0 shadow-card bg-gradient-section">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-foreground">
                        Annual Membership
                      </h3>
                      <p className="text-sm text-muted-foreground">Valid for 12 months</p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-primary">
                        ₹{settings.membershipFee}
                      </span>
                      <span className="text-muted-foreground">/year</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <Calendar className="h-6 w-6 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">12 Months</p>
                    </div>
                    <div className="text-center">
                      <Award className="h-6 w-6 text-secondary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Certificate</p>
                    </div>
                    <div className="text-center">
                      <Sparkles className="h-6 w-6 text-accent mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">Exclusive</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">Apply for Membership</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Your address"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                      placeholder="Your profession or occupation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="motivation">Why do you want to join?</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                      placeholder="Tell us about your interest in joining Empower Foundation..."
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isProcessing}
                  >
                    <Heart className="h-5 w-5" />
                    {isProcessing ? 'Processing...' : `Join Now${settings.membershipFee > 0 ? ` - ₹${settings.membershipFee}` : ''}`}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    By applying, you agree to our terms of membership and code of conduct.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Have questions about membership? Reach out to us at{' '}
              <a href="mailto:membership@empower.org" className="text-primary hover:underline">
                membership@empower.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
