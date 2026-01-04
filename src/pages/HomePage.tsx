import React, { useEffect, useState, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Users,
  Calendar,
  TrendingUp,
  Building2,
  DollarSign,
  Lightbulb,
  HeartHandshake,
  Brain,
  Rocket,
  Quote,
} from "lucide-react";

/* =====================
   SLIDES
===================== */

import slide1 from "@/assets/slide1.webp";
import slide2 from "@/assets/slide2.webp";
import slide3 from "@/assets/slide3.jpeg";

const slides = [slide1, slide2, slide3];

/* =====================
   TESTIMONIALS (DYNAMIC)
===================== */

const testimonials = [
  {
    name: "Priya Mehta",
    role: "Workshop Guest",
    quote:
      "Sambhav Foundation creates real impact. Their financial literacy session changed how I manage my money.",
  },
  {
    name: "Rohit Sharma",
    role: "Entrepreneur & Speaker",
    quote:
      "The energy, vision, and execution of Sambhav is inspiring. A truly purpose-driven organization.",
  },
  {
    name: "Dr. Ananya Kulkarni",
    role: "Mental Health Expert",
    quote:
      "Their focus on physical and mental well-being is rare and much needed. Sambhav is doing remarkable work.",
  },
];

/* =====================
   ANIMATION VARIANTS
===================== */

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const slideVariant: Variants = {
  enter: { opacity: 0, scale: 1.05 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

/* =====================
   STATS
===================== */

const stats = [
  { value: "10,000+", label: "Lives Impacted", icon: Users },
  { value: "150+", label: "Events Hosted", icon: Calendar },
  { value: "500+", label: "Active Members", icon: TrendingUp },
  { value: "50+", label: "Partner Organizations", icon: Building2 },
];

/* =====================
   PILLARS
===================== */

const pillars = [
  {
    title: "Financial Literacy",
    description:
      "Helping individuals make informed decisions about savings, income, and financial growth.",
    icon: DollarSign,
    color: "#17a8db",
  },
  {
    title: "Entrepreneurship",
    description:
      "Supporting founders and innovators to build sustainable businesses.",
    icon: Rocket,
    color: "#e87037",
  },
  {
    title: "Social Service",
    description:
      "Driving meaningful change through community-focused initiatives.",
    icon: HeartHandshake,
    color: "#ebd37e",
  },
  {
    title: "Physical & Mental Well-Being",
    description:
      "Promoting holistic health by nurturing physical fitness and emotional resilience.",
    icon: Brain,
    color: "#17a8db",
  },
  {
    title: "Innovation",
    description: "Encouraging creative solutions for real-world challenges.",
    icon: Lightbulb,
    color: "#e87037",
  },
];

/* =====================
   COMPONENT
===================== */

export const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
      setCurrentTestimonial((p) => (p + 1) % testimonials.length);
    }, 5000);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="min-h-screen bg-hero-pattern flex items-center">
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 mx-auto"
              variants={fadeUp}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Empowering Communities Since 2020
              </span>
            </motion.div>

            <motion.h1
              className="font-heading font-bold mb-10 flex justify-center whitespace-nowrap"
              style={{ fontSize: "min(8vw, 3.5rem)" }}
              variants={fadeUp}
            >
              <span style={{ color: "#ebd37e" }}>•INITIATE</span>
              <span className="mx-3" style={{ color: "#17a8db" }}>
                •CONNECT
              </span>
              <span style={{ color: "#e87037" }}>•EVOLVE</span>
            </motion.h1>

            {/* Slider */}
            <div className="relative w-full max-w-5xl mx-auto h-[26rem] rounded-3xl overflow-hidden shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slides[currentSlide]}
                  variants={slideVariant}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="rounded-2xl bg-card shadow-card p-6 text-center"
                  >
                    <Icon className="h-6 w-6 mx-auto mb-3 text-primary" />
                    <div className="text-3xl font-bold">{s.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {s.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= PILLARS ================= */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-heading text-4xl font-bold mb-16">
            Five Pillars of <span className="text-gradient">Sambhav</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: p.color }}
                  >
                    <Icon className="h-8 w-8 text-black" />
                  </div>
                  <h3 className="font-heading font-semibold mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-12">
            What Our <span className="text-gradient">Guests Say</span>
          </h2>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="bg-card rounded-3xl shadow-card p-10"
              >
                <Quote className="h-10 w-10 mx-auto mb-6 text-primary" />
                <p className="text-lg text-muted-foreground italic mb-6">
                  “{testimonials[currentTestimonial].quote}”
                </p>
                <div className="font-semibold">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonials[currentTestimonial].role}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};
