import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Users,
  Calendar,
  Home,
  Info,
  Image,
  Settings,
  HandCoins,
} from "lucide-react";

import sambhavLogo from "./../../assets/sambhav_logo.png";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About Us", icon: Info },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/team", label: "Team", icon: Users },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={sambhavLogo}
              alt="Sambhav Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Admin */}
            <Link to="/admin/login">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>

            {/* Contribute Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  className="font-semibold"
                  style={{
                    backgroundColor: "#ebd37e",
                    color: "#1a1a1a",
                  }}
                >
                  <HandCoins className="h-4 w-4 mr-2" />
                  Contribute
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                {/* Donate */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    Donate
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                      <Link to="/donate/individual">Individual</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/donate/corporate">Corporate</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* ✅ UPDATED ROUTES */}
                <DropdownMenuItem asChild>
                  <Link to="/volunteer">Join Community</Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/membership">Join Team</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] bg-card">
              <div className="flex flex-col h-full">
                {/* Mobile Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                          isActive(link.href)
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    );
                  })}

                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Settings className="h-5 w-5" />
                    Admin Panel
                  </Link>
                </div>

                {/* Mobile Contribute */}
                <div className="mt-auto pt-6 space-y-3">
                  <Link to="/donate/individual" onClick={() => setIsOpen(false)}>
                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#ebd37e", color: "#1a1a1a" }}
                    >
                      Donate (Individual)
                    </Button>
                  </Link>

                  <Link to="/donate/corporate" onClick={() => setIsOpen(false)}>
                    <Button
                      className="w-full"
                      style={{ backgroundColor: "#ebd37e", color: "#1a1a1a" }}
                    >
                      Donate (Corporate)
                    </Button>
                  </Link>

                  {/* ✅ UPDATED ROUTES */}
                  <Link to="/volunteer" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Join Community
                    </Button>
                  </Link>

                  <Link to="/membership" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Join Team
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};
