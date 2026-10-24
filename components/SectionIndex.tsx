import Image from "next/image";
import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "./PageHeader";
import { Reveal } from "./Reveal";

export interface SectionCard {
  name: string;
  href: string;
  description?: string;
  /** Icon item (About / Academics / Infrastructure) */
  icon?: ComponentType<{ className?: string }>;
  /** Image item (Activities) */
  image?: string;
  unoptimized?: boolean;
}

interface SectionIndexProps {
  title: string;
  subtitle?: string;
  /** Short paragraph shown beside the list */
  intro?: string;
  breadcrumbs: { label: string; href: string }[];
  cards: SectionCard[];
  emptyMessage?: string;
}

/** Shared layout for the section landing pages: /about-us, /academics, /infrastructure-facilities, /activities */
export default function SectionIndex({
  title,
  subtitle,
  intro,
  breadcrumbs,
  cards,
  emptyMessage = "Nothing to show yet. Please check back soon.",
}: SectionIndexProps) {
  return (
    <main className="bg-white">
      <PageHeader title={title} subtitle={subtitle} breadcrumbs={breadcrumbs} />

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: sticky intro */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <span className="inline-block h-1 w-12 rounded-full bg-primary" />
                <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-secondary">
                  {title}
                </h2>
                {intro && (
                  <p className="mt-5 text-base md:text-lg leading-relaxed text-slate-600">
                    {intro}
                  </p>
                )}
                <p className="mt-8 text-sm font-medium uppercase tracking-widest text-slate-400">
                  {String(cards.length).padStart(2, "0")} sections
                </p>
              </Reveal>
            </div>
          </aside>

          {/* Right: numbered list */}
          <div className="lg:col-span-8">
            {cards.length === 0 ? (
              <p className="text-slate-500">{emptyMessage}</p>
            ) : (
              <ul className="border-b border-slate-200">
                {cards.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <li key={card.href}>
                      <Reveal delay={Math.min(i, 5) * 70}>
                        <Link
                          href={card.href}
                          className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-t border-slate-200 px-3 py-7 transition-colors duration-300 hover:bg-slate-50 md:gap-8 md:py-9"
                        >
                          {/* Hover accent bar */}
                          <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-primary transition-transform duration-300 group-hover:scale-y-100" />

                          {/* Number */}
                          <span className="w-8 font-mono text-sm text-slate-400 transition-colors group-hover:text-primary md:w-12 md:text-base">
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {/* Title + description */}
                          <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-1.5">
                            <div className="flex items-center gap-3">
                              {Icon && (
                                <Icon className="h-5 w-5 shrink-0 text-primary/70 transition-colors group-hover:text-primary" />
                              )}
                              <h3 className="text-xl font-semibold text-secondary md:text-2xl">
                                {card.name}
                              </h3>
                            </div>
                            {card.description && (
                              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                                {card.description}
                              </p>
                            )}
                          </div>

                          {/* Right side: thumbnail + arrow */}
                          <div className="flex items-center gap-4">
                            {card.image && (
                              <div className="relative hidden h-16 w-28 overflow-hidden rounded-lg bg-slate-100 sm:block md:h-20 md:w-36">
                                <Image
                                  src={card.image}
                                  alt={card.name}
                                  fill
                                  unoptimized={card.unoptimized}
                                  sizes="144px"
                                  className="object-cover grayscale transition duration-500 group-hover:scale-110 group-hover:grayscale-0"
                                />
                              </div>
                            )}
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white md:h-12 md:w-12">
                              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                            </span>
                          </div>
                        </Link>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}