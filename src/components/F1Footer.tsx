import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

export default function F1Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/astroknot-sheep", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dhrimandeka", label: "LinkedIn" },
    { icon: Mail, href: "mailto:contact@dhrimandeka.com", label: "Email" },
  ];

  return (
    <footer className="py-20 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Name */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-bold text-foreground leading-none">Dhriman</h2>
          <h2 className="text-5xl md:text-7xl font-bold text-primary leading-none">Deka</h2>
        </div>

        {/* Social & back to top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Back to Top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Dhriman Deka
          </p>
        </div>
      </div>
    </footer>
  );
}
