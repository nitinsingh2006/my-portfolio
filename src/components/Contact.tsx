"use client";

import { Mail, Github, Linkedin, FileText, ArrowUpRight, MapPin, Copy, Check, Globe } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: "GitHub", value: `@${site.githubUser}`, href: site.socials.github, icon: Github },
  { label: "LinkedIn", value: "Nitin Singh", href: site.socials.linkedin, icon: Linkedin },
  { label: "Résumé", value: "Download PDF", href: site.resumeUrl, icon: FileText },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [showEmailMenu, setShowEmailMenu] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = site.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 glow" aria-hidden />

          <span className="eyebrow">
            <span className="h-px w-6 bg-accent" aria-hidden />
            Contact
          </span>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something worth shipping.
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            {site.availability}. The fastest way to reach me is email — I reply quickly.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available now
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmailMenu(!showEmailMenu)}
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                Email me
                <ArrowUpRight className={`h-4 w-4 transition-transform ${showEmailMenu ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
              </button>

              {showEmailMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setShowEmailMenu(false)}
                  />
                  <div className="absolute left-0 mt-2 z-50 w-56 rounded-xl border border-border bg-surface p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <a
                      href={`mailto:${site.email}?subject=Hey%20Nitin!`}
                      onClick={() => setShowEmailMenu(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-fg hover:bg-white/10 transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-accent" />
                      Open default Mail app
                    </a>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&to=${site.email}&su=Hey%20Nitin!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowEmailMenu(false)}
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-fg hover:bg-white/10 transition-colors"
                    >
                      <Globe className="h-3.5 w-3.5 text-accent" />
                      Open Gmail in Web
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        copyEmail();
                        setShowEmailMenu(false);
                      }}
                      className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-fg hover:bg-white/10 transition-colors text-left"
                    >
                      <Copy className="h-3.5 w-3.5 text-accent" />
                      Copy email address
                    </button>
                  </div>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg/40 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/50"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy email"}
            </button>
            <a
              href={site.resumeUrl}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg/40 px-5 py-3 text-sm font-medium text-fg transition-colors hover:border-accent/50"
            >
              <FileText className="h-4 w-4" />
              Download résumé
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {channels.map((c) => {
              const isExternal = c.href.startsWith("http");
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-bg/40 p-4 transition-colors hover:border-accent/50"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface text-accent">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-widest text-muted">{c.label}</span>
                    <span className="block truncate font-medium text-fg">{c.value}</span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                </a>
              );
            })}
          </div>

          <p className="mt-8 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 text-accent" /> {site.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
