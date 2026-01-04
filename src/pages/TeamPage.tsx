import React from "react";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Instagram, Users } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

/* =====================
   Animation Variants
===================== */

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardHover = {
  hover: {
    y: -10,
    scale: 1.04,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

/* =====================
   Component
===================== */

export const TeamPage: React.FC = () => {
  const { teamMembers } = useAdmin();

  const getRoleCategory = (
    role: string
  ): "leadership" | "core" | "volunteer" => {
    const lowerRole = role.toLowerCase();
    if (
      lowerRole.includes("founder") ||
      lowerRole.includes("ceo") ||
      lowerRole.includes("director") ||
      lowerRole.includes("head")
    ) {
      return "leadership";
    }
    if (
      lowerRole.includes("manager") ||
      lowerRole.includes("lead") ||
      lowerRole.includes("coordinator")
    ) {
      return "core";
    }
    return "volunteer";
  };

  const leadership = teamMembers.filter(
    (m) => getRoleCategory(m.role) === "leadership"
  );
  const coreTeam = teamMembers.filter(
    (m) => getRoleCategory(m.role) === "core"
  );
  const volunteers = teamMembers.filter(
    (m) => getRoleCategory(m.role) === "volunteer"
  );

  const TeamMemberCard = ({
    member,
    featured = false,
  }: {
    member: typeof teamMembers[0];
    featured?: boolean;
  }) => (
    <motion.div variants={fadeUp} whileHover="hover">
      <motion.div variants={cardHover}>
        <Card className="group overflow-hidden border-0 shadow-card hover:shadow-glow transition-all duration-500 bg-card">
          <CardContent className="p-0">
            <div
              className={`${
                featured ? "aspect-[4/5]" : "aspect-square"
              } relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20`}
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary/50" />
                  </div>
                </div>
              )}

              {/* Social Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <div className="flex items-center gap-2">
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} target="_blank">
                      <Button variant="glass" size="icon" className="h-9 w-9">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {member.socialLinks.twitter && (
                    <a href={member.socialLinks.twitter} target="_blank">
                      <Button variant="glass" size="icon" className="h-9 w-9">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {member.socialLinks.instagram && (
                    <a href={member.socialLinks.instagram} target="_blank">
                      <Button variant="glass" size="icon" className="h-9 w-9">
                        <Instagram className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="p-5 text-center">
              <h3 className="font-heading text-lg font-semibold mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-2">
                {member.role}
              </p>
              {featured && member.bio && (
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {member.bio}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="pt-24 overflow-hidden">
      {/* HERO */}
      <section className="py-16 bg-gradient-section relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <motion.div
          className="container mx-auto px-4 relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={fadeUp}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Meet Our <span className="text-gradient">Team</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Passionate individuals dedicated to making a difference.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* LEADERSHIP */}
      {leadership.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
                Leadership
              </h2>
              <p className="text-muted-foreground">
                Guiding our mission with vision and dedication
              </p>
            </motion.div>

            <motion.div
              className={`grid ${
                leadership.length === 1
                  ? "max-w-sm mx-auto"
                  : leadership.length === 2
                  ? "max-w-2xl mx-auto grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              } gap-8`}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {leadership.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  featured
                />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CORE TEAM */}
      {coreTeam.length > 0 && (
        <section className="py-16 bg-gradient-section">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
                Core Team
              </h2>
              <p className="text-muted-foreground">
                The driving force behind our programs
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {coreTeam.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* VOLUNTEERS */}
      {volunteers.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
                Volunteers
              </h2>
              <p className="text-muted-foreground">
                Hearts that make our work possible
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {volunteers.map((member) => (
                <motion.div key={member.id} variants={fadeUp}>
                  <Card className="overflow-hidden border-0 shadow-soft">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted flex items-center justify-center">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="h-8 w-8 text-muted-foreground/30" />
                        )}
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="text-sm font-medium truncate">
                          {member.name}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {member.role}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-gradient-hero text-primary-foreground">
        <motion.div
          className="container mx-auto px-4 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h2
            className="font-heading text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "#17a8db" }}
          >
            Want to Join Our Team?
          </h2>

          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            We're always looking for passionate individuals who share our vision.
          </p>

          <Link to="/membership">
            <Button variant="warm" size="lg">
              Become a Member
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};
