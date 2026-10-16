"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global providerlar. `reducedMotion="user"` — foydalanuvchi
 * "prefers-reduced-motion" tanlasa, barcha motion animatsiyalari avtomatik
 * yumshatiladi (butun daraxt bo'ylab, AI yordamchi ham).
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
