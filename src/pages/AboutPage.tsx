import React from "react";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Globe,
  TrendingUp,
  Lightbulb,
  CheckCircle,
} from "lucide-react";

/* =======================
   Animation Variants
======================= */

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const cardHover: Variants = {
  hover: {
    y: -10,
    scale: 1.04,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 18,
    },
  },
};

/* =======================
   Data
======================= */

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We lead with empathy and understanding in everything we do.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building strong bonds that lift everyone together.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Striving for the highest standards in all our programs.",
  },
  {
    icon: Globe,
    title: "Inclusivity",
    description: "Welcoming all backgrounds and perspectives.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    description: "Fostering continuous learning and development.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing new ideas to solve old challenges.",
  },
];

const timeline = [
  {
    year: "2020",
    title: "Foundation Established",
    description:
      "Started with a vision to empower communities through education.",
  },
  {
    year: "2021",
    title: "Financial Literacy Program",
    description: "Launched our first large-scale financial education workshops.",
  },
  {
    year: "2022",
    title: "Mental Health Initiative",
    description: "Expanded into mental wellness and emotional health programs.",
  },
  {
    year: "2023",
    title: "Entrepreneurship Hub",
    description: "Built a platform for aspiring entrepreneurs.",
  },
  {
    year: "2024",
    title: "10,000 Lives Impacted",
    description: "Achieved a major milestone of social impact.",
  },
];

/* =======================
   Component
======================= */

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-section relative">
        <div className="absolute inset-0 bg-hero-pattern" />

        <motion.div
          className="container mx-auto px-4 relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={fadeUp}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-10">
              About <span className="text-gradient">Sambhav</span> Foundation
            </h1>

            {/* 🔽 ONLY CHANGE: INFO WRAPPED IN CONTAINER */}
            <Card className="border-0 shadow-card bg-card/80 backdrop-blur">
              <CardContent className="p-8 text-left">
                <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                 
                  {"\n"}With a strong team of 95+ volunteers, primarily engineering students from different colleges, Sambhav works in diverse domains such as innovation, social service, youth empowerment, entrepreneurship, financial literacy, and mental & physical fitness.
                  {"\n\n"}Our Key Work Areas  
                  🌱 Social Service: Donation drives, awareness campaigns, and rural outreach activities for the underprivileged.  
                  💡 Innovation & Entrepreneurship: Hackathons, idea challenges, and summits promoting creative problem-solving.  
                  💬 Youth Empowerment: Skill development sessions, motivational talks, and leadership programs.  
                  🧠 Mental & Physical Fitness: Activities promoting mindfulness, fitness, and emotional well-being.  
                  💰 Financial Literacy: Sessions and content aimed at improving financial awareness among students.
                </p>
              </CardContent>
            </Card>
            {/* 🔼 ONLY CHANGE ENDS */}
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <motion.div
          className="container mx-auto px-4 grid md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[{ icon: Target, title: "Our Mission" }, { icon: Eye, title: "Our Vision" }].map(
            (item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover="hover"
                >
                  <motion.div variants={cardHover}>
                    <Card className="border-0 shadow-card bg-card">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center mb-6">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <h2 className="font-heading text-2xl font-bold mb-4">
                          {item.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                          Empowering individuals and communities to reach their
                          full potential through sustainable programs.
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-section">
        <motion.div
          className="container mx-auto px-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16"
            variants={fadeUp}
          >
            Our Core Values
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover="hover"
                >
                  <motion.div variants={cardHover}>
                    <Card className="border-0 shadow-card bg-card">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-heading text-lg font-semibold mb-2">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-background">
        <motion.div
          className="container mx-auto px-4 max-w-3xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16"
            variants={fadeUp}
          >
            Our Journey
          </motion.h2>

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="mb-10 p-6 rounded-xl bg-card shadow-card"
            >
              <span className="inline-block mb-2 px-3 py-1 text-sm font-semibold bg-primary/10 text-primary rounded-full">
                {item.year}
              </span>
              <h3 className="font-heading text-xl font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 bg-gradient-hero text-primary-foreground">
        <motion.div
          className="container mx-auto px-4 max-w-4xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.h2
            className="font-heading text-3xl sm:text-4xl font-bold text-center mb-12"
            variants={fadeUp}
          >
            What Sets Us Apart
          </motion.h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              "Holistic approach to community development",
              "Expert-led workshops and seminars",
              "Personalized mentorship programs",
              "Strong industry network",
              "Transparent and accountable governance",
              "Data-driven impact measurement",
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm"
              >
                <CheckCircle className="h-6 w-6 text-secondary" />
                <span className="font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
