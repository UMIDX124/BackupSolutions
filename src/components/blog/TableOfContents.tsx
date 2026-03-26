"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export default function TableOfContents({ toc }: { toc: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    const headings = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => {
      for (const heading of headings) {
        observer.unobserve(heading);
      }
    };
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-24">
      <h4 className="text-xs uppercase tracking-wider text-warm-gray mb-4 font-semibold">
        Table of Contents
      </h4>
      <ul className="flex flex-col gap-2">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setActiveId(item.id);
                }
              }}
              className={`block text-sm transition-colors ${
                item.level === 3 ? "pl-4" : ""
              } ${
                activeId === item.id
                  ? "text-amber"
                  : "text-warm-gray hover:text-amber"
              }`}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
