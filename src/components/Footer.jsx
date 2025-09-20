import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/50 backdrop-blur-sm py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-4">
        {/* Copyright */}
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="font-medium">Owes Uddin</span>. All rights reserved.
        </p>

        {/* Back to top button */}
        <a
          href="#hero"
          className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  );
};
