import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  CheckCircle,
  HeartHandshake,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "@/hooks/use-toast";

const benefits = [
  "Be part of a purpose-driven community",
  "Participate in social impact initiatives",
  "Volunteer certificates for contributions",
  "Hands-on experience in real projects",
  "Networking with like-minded individuals",
  "Skill development through events & workshops",
  "Recognition for outstanding contributions",
];

export const VolunteerPage: React.FC = () => {
  const { addVolunteer } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    motivation: "",
    availability: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    addVolunteer({
      id: Date.now().toString(),
      ...formData,
      joinedAt: new Date().toISOString(),
      status: "active",
    });

    toast({
      title: "Welcome to the Community 🎉",
      description:
        "You’ve successfully joined our volunteer community. We’ll contact you soon!",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      skills: "",
      motivation: "",
      availability: "",
    });

    setIsSubmitting(false);
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
              Join Our Community
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Volunteer with us and contribute your time, skills, and passion to
              create meaningful social impact — completely free.
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
                Why Volunteer With Us?
              </h2>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              {/* Info Card */}
              <Card className="border-0 shadow-card bg-gradient-section">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-lg font-semibold">
                        Community Volunteer
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        No fees • Flexible participation
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-3xl font-bold text-primary">
                        FREE
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <Calendar className="h-6 w-6 text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">
                        Flexible
                      </p>
                    </div>
                    <div className="text-center">
                      <HeartHandshake className="h-6 w-6 text-secondary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">
                        Impact
                      </p>
                    </div>
                    <div className="text-center">
                      <Sparkles className="h-6 w-6 text-accent mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">
                        Growth
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl">
                  Join as a Volunteer
                </CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Phone *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Skills / Interests</Label>
                    <Input
                      placeholder="Design, Tech, Marketing, Teaching…"
                      value={formData.skills}
                      onChange={(e) =>
                        setFormData({ ...formData, skills: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Availability</Label>
                    <Input
                      placeholder="Weekends, evenings, flexible…"
                      value={formData.availability}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          availability: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Why do you want to volunteer?</Label>
                    <Textarea
                      rows={3}
                      value={formData.motivation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          motivation: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <Users className="h-5 w-5" />
                    {isSubmitting
                      ? "Submitting..."
                      : "Join Community for Free"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    By joining, you agree to follow our community guidelines.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-16 bg-gradient-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">
            Make a Difference
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Even a few hours of your time can change lives. Join our growing
            volunteer community today.
          </p>
        </div>
      </section>
    </div>
  );
};
