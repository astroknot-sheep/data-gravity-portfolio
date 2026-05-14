import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  number: string;
  label: string;
  title: ReactNode;
  meta?: string;
}

export default function SectionHeader({ number, label, title, meta }: Props) {
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-24 items-end">
      <div className="lg:col-span-3">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-[11px] font-mono-ui text-primary tracking-[0.2em]">
            {number}
          </span>
          <span className="text-[11px] font-mono-ui text-muted-foreground/70 tracking-[0.2em] lowercase">
            {label}
          </span>
        </div>
        {meta && (
          <p className="text-[11px] font-mono-ui text-muted-foreground/50 lowercase">
            {meta}
          </p>
        )}
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="lg:col-span-9 text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-foreground"
        style={{ textTransform: "none" }}
      >
        {title}
      </motion.h2>
    </div>
  );
}