import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image: string;
}

export function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  image,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-card">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[400px] flex-col justify-center p-8 sm:max-w-xl sm:p-12 lg:min-h-[500px] lg:p-16">
        <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
          <span className="gradient-text">{title.split(" ")[0]}</span>{" "}
          {title.split(" ").slice(1).join(" ")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          {subtitle}
        </p>
        <div className="mt-8">
          <Button variant="gradient" size="lg" asChild>
            <Link to={ctaLink} className="group">
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
