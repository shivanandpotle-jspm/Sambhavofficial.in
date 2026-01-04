import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// Try importing the logo directly (use the correct path to your file)
import logoImg from "../../public/logo.png"; 

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        
        <Link to="/" className="flex items-center transition-transform hover:scale-[1.02]">
          <img 
            src={logoImg}  /* Use the imported variable here */
            alt="Sambhav NGO Logo" 
            className="h-14 md:h-16 w-auto object-contain" 
          />
          <div className="ml-3 flex flex-col justify-center">
            <span className="text-xl md:text-2xl font-bold leading-none text-sambhav-blue uppercase tracking-tight">
              SAMBHAV
            </span>
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] text-sambhav-orange uppercase mt-1">
              Initiate • Connect • Evolve
            </span>
          </div>
        </Link>
        {/* ... rest of your links ... */}
      </div>
    </nav>
  );
};