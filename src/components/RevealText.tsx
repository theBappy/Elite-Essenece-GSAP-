"use client";

import { useGSAP } from "@gsap/react";
import { asText, RichTextField } from "@prismicio/client";
import clsx from "clsx";
import gsap from "gsap";
import React, { useRef } from "react";

gsap.registerPlugin(useGSAP);

type RevealTextProps = {
  field: RichTextField;
  id: string;
  className?: string;
  staggerAmount?: number;
  as?: React.ElementType;
  duration?: number;
  align?: "center" | "start" | "end";
};

export const RevealText = ({
  field,
  id,
  className,
  as: Component = "div",
  staggerAmount = 0.1,
  duration = 0.8,
  align = "start",
}: RevealTextProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const words = asText(field).split(" ");
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".reveal-text-word", {
        y: 0,
        stagger: staggerAmount,
        duration,
        ease: "power3.out",
      });
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.to(".reveal-text-word", {
          duration: 0.5,
          opacity: 1,
          ease: "none",
          y: 0,
          stagger: 0,
        });
      });

    },
    { scope: componentRef },
  );

  return (
    <Component
      className={clsx(
        "reveal-text text-balance",
        align === "center" && "text-center",
        align === "end" && "text-right",
        align === "start" && "text-left",
        className,
      )}
      ref={componentRef}
    >
      {words.map((word, index) => (
        <span
          className="mb-0 inline-block overflow-hidden pb-4"
          key={`${word}-${index}-${id}`}
        >
          <span className="reveal-text-word mt-0 inline-block translate-y-[120%] will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
};
