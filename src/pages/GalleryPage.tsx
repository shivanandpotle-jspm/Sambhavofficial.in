import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Image as ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

/* =====================
   DATA
===================== */

const categories = [
  { value: "all", label: "All Photos" },
  { value: "events", label: "Events" },
  { value: "workshops", label: "Workshops" },
  { value: "community", label: "Community" },
  { value: "team", label: "Team" },
];

const sampleImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=600", caption: "Financial Literacy Workshop 2024", category: "workshops" },
  { id: "2", url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600", caption: "Entrepreneur Networking Event", category: "events" },
  { id: "3", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600", caption: "Community Outreach Program", category: "community" },
  { id: "4", url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600", caption: "Annual General Meeting", category: "events" },
  { id: "5", url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600", caption: "Mental Health Awareness Camp", category: "workshops" },
  { id: "6", url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600", caption: "Team Building Activity", category: "team" },
  { id: "7", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600", caption: "Startup Pitch Competition", category: "events" },
  { id: "8", url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600", caption: "Community Celebration", category: "community" },
];

/* =====================
   ANIMATION VARIANTS
===================== */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
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

const imageCard: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/* =====================
   COMPONENT
===================== */

export const GalleryPage: React.FC = () => {
  const { galleryImages } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] =
    useState<typeof sampleImages[0] | null>(null);

  const allImages = [
    ...sampleImages,
    ...galleryImages.map((img) => ({
      id: img.id,
      url: img.url,
      caption: img.caption,
      category: img.category,
    })),
  ];

  const filteredImages =
    selectedCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const navigateImage = (dir: "prev" | "next") => {
    if (!selectedImage) return;
    const nextIndex =
      dir === "prev"
        ? (currentIndex - 1 + filteredImages.length) %
          filteredImages.length
        : (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  return (
    <div className="pt-24">
      {/* ================= HERO ================= */}
      <section className="py-16 bg-gradient-section relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={fadeUp}
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Capturing moments of impact, learning, and community building.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= FILTER ================= */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <motion.p
            className="text-muted-foreground"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Showing {filteredImages.length} photos
          </motion.p>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {filteredImages.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={imageCard}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    className="group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-glow transition-all"
                    onClick={() => setSelectedImage(image)}
                  >
                    <CardContent className="p-0">
                      <div className="aspect-square relative overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                          <p className="text-primary-foreground text-sm font-medium line-clamp-2">
                            {image.caption}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <ImageIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">
                No photos in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {selectedImage && (
          <Dialog open onOpenChange={() => setSelectedImage(null)}>
            <DialogContent className="max-w-5xl p-0 bg-foreground border-0 overflow-hidden">
              <DialogTitle className="sr-only">
                {selectedImage.caption}
              </DialogTitle>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full max-h-[80vh] object-contain"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-primary-foreground"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground"
                  onClick={() => navigateImage("prev")}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground"
                  onClick={() => navigateImage("next")}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground to-transparent">
                  <p className="text-primary-foreground text-lg text-center">
                    {selectedImage.caption}
                  </p>
                  <p className="text-primary-foreground/60 text-sm text-center mt-1">
                    {currentIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};
