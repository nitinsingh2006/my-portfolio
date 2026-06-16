"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { stagger, viewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="work" className="section">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Selected work"
            title="Real products, shipped in public."
            description="Sourced straight from GitHub — each one solves a concrete problem, end to end."
          />
          <a
            href={`${site.socials.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline shrink-0 text-sm"
          >
            <Github className="h-4 w-4" /> All repositories
          </a>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          {projects.map((p) => (
            <div key={p.slug} className={p.featured ? "md:col-span-2" : ""}>
              <ProjectCard project={p} featured={p.featured} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
