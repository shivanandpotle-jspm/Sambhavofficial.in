import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Users,
  Heart,
  DollarSign,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

export const AdminDashboard: React.FC = () => {
  const { events, members, donors, settings } = useAdmin();

  const stats = [
    {
      label: "Total Events",
      value: events.length,
      icon: Calendar,
      color: "bg-primary",
    },
    {
      label: "Active Members",
      value: members.filter(
        (m) => m.membershipStatus === "active"
      ).length,
      icon: Users,
      color: "bg-secondary",
    },
    {
      label: "Total Donors",
      value: donors.length,
      icon: Heart,
      color: "bg-accent",
    },
    {
      label: "Revenue",
      value: `₹${donors
        .reduce((sum, d) => sum + d.amount, 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: "bg-primary-light",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Dashboard
      </h1>

      {/* Stats Cards (DISPLAY ONLY) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              aria-disabled="true"
              className="
                border-0
                shadow-card
                cursor-default
                select-none
                pointer-events-none
              "
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}
                  >
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Lower Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <Card
          aria-disabled="true"
          className="
            border-0
            shadow-card
            cursor-default
            select-none
            pointer-events-none
          "
        >
          <CardHeader>
            <CardTitle className="font-heading">
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {events.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {event.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    event.status === "upcoming"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card
          aria-disabled="true"
          className="
            border-0
            shadow-card
            cursor-default
            select-none
            pointer-events-none
          "
        >
          <CardHeader>
            <CardTitle className="font-heading">
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">
                Membership Fee
              </span>
              <span className="font-bold text-foreground">
                ₹{settings.membershipFee}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <span className="text-muted-foreground">
                Default Ticket Price
              </span>
              <span className="font-bold text-foreground">
                ₹{settings.defaultEventTicketPrice}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
