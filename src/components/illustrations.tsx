import type { JSX, ReactNode } from "react";
import { useId } from "react";
import type { OrderCategory } from "@/types/order";

/**
 * YoshlarMakon — inline SVG illustration set.
 *
 * All illustrations are pure inline SVG (no external images / network URLs).
 * They are theme-aware: colors come from the CSS variables defined in
 * globals.css (`--primary`, `--card`, `--muted`, `--border`, `--cat-*`, …) so
 * they read correctly in both light and dark themes. Width/height always flow
 * from the `className` passed by the caller (e.g. `h-40 w-full`).
 *
 * Decorative pieces are marked `aria-hidden`; informative pieces carry a
 * `<title>` for assistive tech.
 */

/* ---------------------------------------------------------------------- */
/* Shared helpers                                                          */
/* ---------------------------------------------------------------------- */

const CATEGORY_COLOR: Record<OrderCategory, string> = {
  Dizayn: "var(--cat-dizayn)",
  Video: "var(--cat-video)",
  Veb: "var(--cat-veb)",
};

const CATEGORY_LABEL: Record<OrderCategory, string> = {
  Dizayn: "Dizayn",
  Video: "Video",
  Veb: "Veb",
};

type SvgProps = { className?: string };

/* ---------------------------------------------------------------------- */
/* BrandLogo                                                               */
/* ---------------------------------------------------------------------- */

export function BrandLogo({ className }: SvgProps): JSX.Element {
  const logoId = useId();
  const leftWing = `${logoId}-left`;
  const rightWing = `${logoId}-right`;
  const stem = `${logoId}-stem`;
  const head = `${logoId}-head`;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>YoshlarMakon</title>
      <defs>
        <linearGradient id={leftWing} x1="3" y1="9" x2="33" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25C8FF" />
          <stop offset=".48" stopColor="#2376F5" />
          <stop offset="1" stopColor="#4934EA" />
        </linearGradient>
        <linearGradient id={rightWing} x1="59" y1="8" x2="35" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22DDFA" />
          <stop offset=".45" stopColor="#149DF4" />
          <stop offset="1" stopColor="#2455F2" />
        </linearGradient>
        <linearGradient id={stem} x1="17" y1="25" x2="34" y2="61" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4E35E8" />
          <stop offset=".55" stopColor="#263CF1" />
          <stop offset="1" stopColor="#008DFF" />
        </linearGradient>
        <linearGradient id={head} x1="31" y1="3" x2="33" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#30CBFF" />
          <stop offset="1" stopColor="#344EF3" />
        </linearGradient>
      </defs>
      {/* The supplied blue emblem: a person, two rising leaves and a folded Y. */}
      <path d="M18 26C26 29 32 36 33 44V59C33 61 32 62 30 61C21 58 16 51 16 42V25Z" fill={`url(#${stem})`} />
      <path d="M5 10C19 11 31 22 33 42C27 33 18 31 11 25C7 21 5 16 3 12C2 10 3 9 5 10Z" fill={`url(#${leftWing})`} />
      <path d="M59 8C47 10 35 20 35 40C40 30 51 28 55 20C57 16 58 12 59 8Z" fill={`url(#${rightWing})`} />
      <path d="M5 11C18 17 28 27 33 42C26 32 18 31 11 25Z" fill="#343BE4" opacity=".3" />
      <path d="M59 8C48 19 41 26 35 40C35 24 44 13 59 8Z" fill="#53DBFF" opacity=".2" />
      <path d="M18 32C24 36 30 44 33 56V59C33 61 32 62 30 61C25 59 21 56 19 52Z" fill="#164EFA" opacity=".4" />
      <circle cx="32" cy="9" r="5" fill={`url(#${head})`} />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* HeroIllustration                                                        */
/* ---------------------------------------------------------------------- */

export function HeroIllustration({ className }: SvgProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--muted)" />
        </linearGradient>
        <linearGradient id="hero-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cat-veb)" />
        </linearGradient>
        <linearGradient id="hero-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--cat-dizayn)" />
          <stop offset="100%" stopColor="var(--cat-video)" />
        </linearGradient>
      </defs>

      {/* Soft backdrop */}
      <rect x="0" y="0" width="400" height="300" rx="20" fill="url(#hero-sky)" />

      {/* Floating decorative blobs */}
      <circle cx="60" cy="56" r="26" fill="var(--cat-video)" opacity="0.18" />
      <circle cx="350" cy="80" r="34" fill="var(--cat-dizayn)" opacity="0.16" />
      <rect x="300" y="200" width="46" height="46" rx="12" fill="var(--cat-veb)" opacity="0.18" transform="rotate(12 323 223)" />

      {/* Desk surface */}
      <rect x="40" y="236" width="320" height="14" rx="7" fill="var(--border)" />

      {/* Laptop */}
      <g>
        <rect x="150" y="150" width="150" height="92" rx="10" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
        <rect x="160" y="160" width="130" height="72" rx="5" fill="url(#hero-screen)" />
        {/* UI blocks on screen */}
        <rect x="170" y="170" width="46" height="8" rx="4" fill="var(--primary-foreground)" opacity="0.9" />
        <rect x="170" y="184" width="70" height="6" rx="3" fill="var(--primary-foreground)" opacity="0.55" />
        <rect x="170" y="196" width="60" height="6" rx="3" fill="var(--primary-foreground)" opacity="0.45" />
        <rect x="170" y="212" width="40" height="12" rx="6" fill="var(--cat-video)" />
        <circle cx="272" cy="200" r="14" fill="var(--primary-foreground)" opacity="0.25" />
        {/* Laptop base */}
        <rect x="138" y="242" width="174" height="8" rx="4" fill="var(--muted-foreground)" opacity="0.5" />
      </g>

      {/* Young freelancer (geometric figure) */}
      <g>
        {/* Chair hint */}
        <rect x="70" y="200" width="60" height="48" rx="10" fill="var(--muted-foreground)" opacity="0.18" />
        {/* Body */}
        <path d="M78 242 Q78 196 110 196 Q142 196 142 242 Z" fill="var(--primary)" />
        {/* Arm reaching to laptop */}
        <path d="M128 214 Q150 206 158 200" fill="none" stroke="var(--primary)" strokeWidth="12" strokeLinecap="round" />
        {/* Head */}
        <circle cx="110" cy="174" r="20" fill="url(#hero-accent)" />
        {/* Hair accent */}
        <path d="M92 168 Q100 152 128 160 Q122 168 110 166 Q100 166 94 174 Z" fill="var(--foreground)" opacity="0.35" />
      </g>

      {/* Idea spark above */}
      <g transform="translate(108 118)">
        <circle cx="0" cy="0" r="12" fill="var(--cat-video)" />
        <path d="M-4 -2 h8 M-4 2 h8" stroke="var(--card)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M0 -24 v8 M-17 -17 l6 6 M17 -17 l-6 6" stroke="var(--cat-video)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Floating tiny tags */}
      <rect x="296" y="120" width="52" height="22" rx="11" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="310" cy="131" r="5" fill="var(--cat-dizayn)" />
      <rect x="320" y="128" width="22" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.7" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* Internal: per-job thumbnail scenes (B01..B06)                           */
/* ---------------------------------------------------------------------- */

/** Shared framed canvas for every thumbnail so they feel like one system. */
function ThumbFrame({
  gradId,
  tint,
  children,
}: {
  gradId: string;
  tint: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.18" />
          <stop offset="100%" stopColor={tint} stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="160" height="110" rx="14" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      <rect x="0" y="0" width="160" height="110" rx="14" fill={`url(#${gradId})`} />
      {/* Category corner accent */}
      <circle cx="140" cy="20" r="6" fill={tint} />
      {children}
    </>
  );
}

/** B01 — Kafe uchun menyu dizayni (menu card with food + price rows). */
function JobMenuDesign(): JSX.Element {
  const tint = CATEGORY_COLOR.Dizayn;
  return (
    <ThumbFrame gradId="jobthumb-b01-grad" tint={tint}>
      <rect x="40" y="18" width="80" height="78" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      {/* Header band */}
      <rect x="40" y="18" width="80" height="20" rx="8" fill={tint} />
      <rect x="40" y="30" width="80" height="8" fill={tint} />
      <rect x="58" y="24" width="44" height="7" rx="3.5" fill="var(--primary-foreground)" opacity="0.9" />
      {/* Menu rows: dish + price dots */}
      <circle cx="52" cy="52" r="5" fill="var(--cat-video)" />
      <rect x="62" y="49" width="30" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.7" />
      <rect x="100" y="49" width="12" height="5" rx="2.5" fill={tint} />
      <circle cx="52" cy="66" r="5" fill="var(--cat-veb)" />
      <rect x="62" y="63" width="36" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.7" />
      <rect x="102" y="63" width="10" height="5" rx="2.5" fill={tint} />
      <circle cx="52" cy="80" r="5" fill={tint} />
      <rect x="62" y="77" width="26" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.7" />
      <rect x="100" y="77" width="12" height="5" rx="2.5" fill={tint} />
      {/* Designer pen accent */}
      <path d="M118 84 l14 -14 6 6 -14 14 -8 2 z" fill="var(--primary)" stroke="var(--card)" strokeWidth="1.5" strokeLinejoin="round" />
    </ThumbFrame>
  );
}

/** B02 — Do'kon uchun afisha (big bold poster with starburst). */
function JobPoster(): JSX.Element {
  const tint = CATEGORY_COLOR.Dizayn;
  return (
    <ThumbFrame gradId="jobthumb-b02-grad" tint={tint}>
      <rect x="48" y="16" width="64" height="82" rx="6" fill={tint} />
      <rect x="48" y="16" width="64" height="82" rx="6" fill="none" stroke="var(--card)" strokeWidth="2" />
      {/* Headline blocks */}
      <rect x="56" y="26" width="48" height="12" rx="4" fill="var(--primary-foreground)" opacity="0.95" />
      <rect x="56" y="42" width="34" height="7" rx="3.5" fill="var(--primary-foreground)" opacity="0.7" />
      {/* Sale starburst badge */}
      <g transform="translate(92 70)">
        <path
          d="M0 -18 L4 -6 16 -8 7 1 12 13 0 6 -12 13 -7 1 -16 -8 -4 -6 Z"
          fill="var(--cat-video)"
          stroke="var(--card)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <text x="0" y="3" textAnchor="middle" fontSize="8" fontWeight="700" fill="var(--foreground)">
          %
        </text>
      </g>
      {/* Small product square */}
      <rect x="56" y="60" width="22" height="22" rx="5" fill="var(--card)" opacity="0.9" />
      <circle cx="67" cy="71" r="6" fill="var(--cat-veb)" />
    </ThumbFrame>
  );
}

/** B03 — 30 soniyali rolik montaji (film reel + timeline + play). */
function JobVideoEdit(): JSX.Element {
  const tint = CATEGORY_COLOR.Video;
  return (
    <ThumbFrame gradId="jobthumb-b03-grad" tint={tint}>
      {/* Preview screen */}
      <rect x="26" y="18" width="108" height="56" rx="8" fill="var(--muted)" stroke="var(--border)" strokeWidth="2" />
      <circle cx="80" cy="46" r="15" fill={tint} />
      <path d="M75 39 L75 53 L88 46 Z" fill="var(--primary-foreground)" />
      {/* Reel perforations top */}
      <rect x="26" y="22" width="108" height="6" fill="var(--foreground)" opacity="0.08" />
      {/* Timeline track */}
      <rect x="26" y="82" width="108" height="16" rx="5" fill="var(--muted)" stroke="var(--border)" strokeWidth="1.5" />
      <rect x="30" y="86" width="24" height="8" rx="3" fill={tint} />
      <rect x="58" y="86" width="16" height="8" rx="3" fill="var(--cat-veb)" opacity="0.8" />
      <rect x="78" y="86" width="30" height="8" rx="3" fill="var(--cat-dizayn)" opacity="0.7" />
      {/* Playhead */}
      <rect x="70" y="80" width="2.5" height="20" rx="1.25" fill="var(--foreground)" />
    </ThumbFrame>
  );
}

/** B04 — Videoga subtitr qo'shish (frame with caption bars + "CC"). */
function JobSubtitles(): JSX.Element {
  const tint = CATEGORY_COLOR.Video;
  return (
    <ThumbFrame gradId="jobthumb-b04-grad" tint={tint}>
      <rect x="26" y="18" width="108" height="74" rx="8" fill="var(--muted)" stroke="var(--border)" strokeWidth="2" />
      {/* Scene hint: sun + hill */}
      <circle cx="52" cy="40" r="9" fill={tint} opacity="0.8" />
      <path d="M26 72 Q60 48 90 66 Q112 78 134 60 L134 90 L26 90 Z" fill="var(--cat-veb)" opacity="0.25" />
      {/* Subtitle plate */}
      <rect x="40" y="70" width="80" height="16" rx="4" fill="var(--foreground)" opacity="0.72" />
      <rect x="48" y="75" width="40" height="3.5" rx="1.75" fill="var(--background)" />
      <rect x="48" y="80" width="56" height="3.5" rx="1.75" fill="var(--background)" opacity="0.85" />
      {/* CC badge */}
      <rect x="104" y="24" width="24" height="16" rx="4" fill={tint} />
      <text x="116" y="36" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--foreground)">
        CC
      </text>
    </ThumbFrame>
  );
}

/** B05 — Bir sahifali sayt yaratish (single-page website wireframe). */
function JobLandingPage(): JSX.Element {
  const tint = CATEGORY_COLOR.Veb;
  return (
    <ThumbFrame gradId="jobthumb-b05-grad" tint={tint}>
      {/* Browser window */}
      <rect x="28" y="16" width="104" height="80" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      {/* Browser chrome */}
      <path d="M28 24 a8 8 0 0 1 8 -8 h88 a8 8 0 0 1 8 8 v4 H28 Z" fill="var(--muted)" />
      <circle cx="36" cy="22" r="2" fill="var(--cat-dizayn)" />
      <circle cx="43" cy="22" r="2" fill="var(--cat-video)" />
      <circle cx="50" cy="22" r="2" fill={tint} />
      {/* Hero section */}
      <rect x="36" y="34" width="88" height="22" rx="4" fill={tint} opacity="0.85" />
      <rect x="42" y="40" width="34" height="5" rx="2.5" fill="var(--primary-foreground)" opacity="0.95" />
      <rect x="42" y="48" width="22" height="4" rx="2" fill="var(--primary-foreground)" opacity="0.7" />
      {/* Content cards (single page scroll) */}
      <rect x="36" y="62" width="26" height="26" rx="4" fill="var(--muted)" />
      <rect x="67" y="62" width="26" height="26" rx="4" fill="var(--muted)" />
      <rect x="98" y="62" width="26" height="26" rx="4" fill="var(--muted)" />
      <rect x="40" y="80" width="18" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.6" />
      <rect x="71" y="80" width="18" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.6" />
      <rect x="102" y="80" width="18" height="4" rx="2" fill="var(--muted-foreground)" opacity="0.6" />
    </ThumbFrame>
  );
}

/** B06 — Saytdagi matnni yangilash (text document with edit caret + diff). */
function JobTextUpdate(): JSX.Element {
  const tint = CATEGORY_COLOR.Veb;
  return (
    <ThumbFrame gradId="jobthumb-b06-grad" tint={tint}>
      {/* Document */}
      <rect x="40" y="16" width="80" height="82" rx="8" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      {/* Text lines */}
      <rect x="50" y="28" width="52" height="6" rx="3" fill="var(--foreground)" opacity="0.65" />
      <rect x="50" y="40" width="60" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.55" />
      {/* Updated (highlighted) line */}
      <rect x="48" y="50" width="64" height="9" rx="3" fill={tint} opacity="0.22" />
      <rect x="50" y="52" width="40" height="5" rx="2.5" fill={tint} />
      {/* Edit caret */}
      <rect x="92" y="50" width="2" height="9" fill="var(--foreground)" />
      <rect x="50" y="64" width="56" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.55" />
      <rect x="50" y="74" width="46" height="5" rx="2.5" fill="var(--muted-foreground)" opacity="0.55" />
      {/* Pencil badge */}
      <g transform="translate(104 78)">
        <circle cx="0" cy="0" r="13" fill={tint} />
        <path d="M-5 5 l8 -8 2.5 2.5 -8 8 -3.5 1 z" fill="var(--primary-foreground)" stroke="var(--card)" strokeWidth="1" strokeLinejoin="round" />
      </g>
    </ThumbFrame>
  );
}

/** Category-level fallback scene when orderId is not one of B01..B06. */
function JobCategoryFallback({ category }: { category: OrderCategory }): JSX.Element {
  switch (category) {
    case "Dizayn":
      return JobPoster();
    case "Video":
      return JobVideoEdit();
    case "Veb":
      return JobLandingPage();
    default:
      return JobLandingPage();
  }
}

/* ---------------------------------------------------------------------- */
/* JobThumbnail                                                            */
/* ---------------------------------------------------------------------- */

export function JobThumbnail({
  orderId,
  category,
  className,
}: {
  orderId: string;
  category: OrderCategory;
  className?: string;
}): JSX.Element {
  let scene: JSX.Element;
  let label: string;

  switch (orderId) {
    case "B01":
      scene = <JobMenuDesign />;
      label = "Kafe uchun menyu dizayni";
      break;
    case "B02":
      scene = <JobPoster />;
      label = "Do'kon uchun afisha";
      break;
    case "B03":
      scene = <JobVideoEdit />;
      label = "30 soniyali rolik montaji";
      break;
    case "B04":
      scene = <JobSubtitles />;
      label = "Videoga subtitr qo'shish";
      break;
    case "B05":
      scene = <JobLandingPage />;
      label = "Bir sahifali sayt yaratish";
      break;
    case "B06":
      scene = <JobTextUpdate />;
      label = "Saytdagi matnni yangilash";
      break;
    default:
      scene = <JobCategoryFallback category={category} />;
      label = `${CATEGORY_LABEL[category]} buyurtmasi`;
      break;
  }

  return (
    <svg
      viewBox="0 0 160 110"
      className={className}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      {scene}
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* CategoryGlyph                                                           */
/* ---------------------------------------------------------------------- */

export function CategoryGlyph({
  category,
  className,
}: {
  category: OrderCategory;
  className?: string;
}): JSX.Element {
  const tint = CATEGORY_COLOR[category];
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {category === "Dizayn" && (
        /* Palette-ish: overlapping shapes + pen nib */
        <>
          <rect x="3" y="3" width="11" height="11" rx="3" fill={tint} opacity="0.85" />
          <circle cx="15.5" cy="15.5" r="5.5" fill="none" stroke={tint} strokeWidth="2" />
          <path d="M9 13 l6 6" stroke={tint} strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {category === "Video" && (
        /* Play triangle inside rounded frame */
        <>
          <rect x="3" y="4" width="18" height="16" rx="4" fill="none" stroke={tint} strokeWidth="2" />
          <path d="M10 9 L10 15 L15 12 Z" fill={tint} />
        </>
      )}
      {category === "Veb" && (
        /* Code brackets */
        <>
          <rect x="3" y="4" width="18" height="16" rx="4" fill="none" stroke={tint} strokeWidth="2" />
          <path d="M9 9 L6.5 12 L9 15 M15 9 L17.5 12 L15 15" fill="none" stroke={tint} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* Sticker                                                                 */
/* ---------------------------------------------------------------------- */

type StickerKind =
  | "idea"
  | "creative"
  | "design"
  | "video"
  | "web"
  | "opportunity"
  | "growth";

const STICKER_TINT: Record<StickerKind, string> = {
  idea: "var(--cat-video)",
  creative: "var(--cat-dizayn)",
  design: "var(--cat-dizayn)",
  video: "var(--cat-video)",
  web: "var(--cat-veb)",
  opportunity: "var(--primary)",
  growth: "var(--cat-veb)",
};

export function Sticker({
  kind,
  className,
}: {
  kind: StickerKind;
  className?: string;
}): JSX.Element {
  const tint = STICKER_TINT[kind];
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sticker-${kind}-grad`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tint} stopOpacity="0.9" />
          <stop offset="100%" stopColor={tint} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {/* Rounded sticker disc with soft ring */}
      <circle cx="32" cy="32" r="28" fill={`url(#sticker-${kind}-grad)`} />
      <circle cx="32" cy="32" r="28" fill="none" stroke="var(--card)" strokeWidth="3" />

      {kind === "idea" && (
        <g stroke="var(--primary-foreground)" strokeWidth="3" strokeLinecap="round" fill="none">
          <circle cx="32" cy="28" r="9" fill="var(--primary-foreground)" stroke="none" opacity="0.95" />
          <path d="M28 40 h8 M29 44 h6" />
          <path d="M32 11 v5 M18 18 l3.5 3.5 M46 18 l-3.5 3.5" />
        </g>
      )}

      {kind === "creative" && (
        /* Sparkle burst */
        <g fill="var(--primary-foreground)">
          <path d="M32 16 L36 28 L48 32 L36 36 L32 48 L28 36 L16 32 L28 28 Z" />
          <circle cx="46" cy="20" r="2.5" opacity="0.8" />
        </g>
      )}

      {kind === "design" && (
        <g>
          {/* Pen nib */}
          <path d="M24 42 L32 18 L40 42 L32 37 Z" fill="var(--primary-foreground)" />
          <circle cx="32" cy="42" r="3" fill="var(--primary-foreground)" />
        </g>
      )}

      {kind === "video" && (
        <g fill="var(--primary-foreground)">
          <circle cx="32" cy="32" r="14" fill="none" stroke="var(--primary-foreground)" strokeWidth="3" />
          <path d="M28 25 L28 39 L40 32 Z" />
        </g>
      )}

      {kind === "web" && (
        <g stroke="var(--primary-foreground)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="32" cy="32" r="14" />
          <path d="M18 32 h28 M32 18 v28" />
          <path d="M32 18 q10 14 0 28 M32 18 q-10 14 0 28" />
        </g>
      )}

      {kind === "opportunity" && (
        /* Rocket */
        <g>
          <path d="M32 14 Q42 24 40 40 L24 40 Q22 24 32 14 Z" fill="var(--primary-foreground)" />
          <circle cx="32" cy="28" r="4" fill={tint} />
          <path d="M24 40 L20 48 L26 44 M40 40 L44 48 L38 44" fill="var(--primary-foreground)" opacity="0.85" />
          <path d="M30 44 L32 52 L34 44 Z" fill="var(--cat-video)" />
        </g>
      )}

      {kind === "growth" && (
        <g stroke="var(--primary-foreground)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 42 L28 32 L34 38 L46 24" />
          <path d="M40 24 L46 24 L46 30" />
        </g>
      )}
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* AIAvatar                                                                */
/* ---------------------------------------------------------------------- */

export function AIAvatar({ className }: SvgProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aiavatar-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cat-veb)" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" fill="url(#aiavatar-grad)" />
      {/* Friendly robot head */}
      <rect x="13" y="15" width="22" height="18" rx="7" fill="var(--card)" />
      {/* Eyes */}
      <circle cx="20" cy="24" r="2.6" fill="var(--primary)" />
      <circle cx="28" cy="24" r="2.6" fill="var(--primary)" />
      {/* Smile */}
      <path d="M20 28.5 Q24 31 28 28.5" fill="none" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Antenna */}
      <path d="M24 15 L24 10" stroke="var(--card)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="8.5" r="2.4" fill="var(--cat-video)" />
      {/* Spark cheeks */}
      <circle cx="15.5" cy="28" r="1.6" fill="var(--cat-dizayn)" opacity="0.8" />
      <circle cx="32.5" cy="28" r="1.6" fill="var(--cat-dizayn)" opacity="0.8" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* EmptyStateArt                                                           */
/* ---------------------------------------------------------------------- */

export function EmptyStateArt({ className }: SvgProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="emptystate-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--muted)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      {/* Soft halo */}
      <ellipse cx="120" cy="150" rx="78" ry="14" fill="var(--muted-foreground)" opacity="0.12" />
      <circle cx="120" cy="86" r="62" fill="url(#emptystate-grad)" opacity="0.5" />

      {/* Empty box */}
      <path d="M78 74 L120 56 L162 74 L120 92 Z" fill="var(--card)" stroke="var(--border)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M78 74 L78 118 L120 136 L120 92 Z" fill="var(--muted)" stroke="var(--border)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M162 74 L162 118 L120 136 L120 92 Z" fill="var(--card)" stroke="var(--border)" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Magnifier searching */}
      <g>
        <circle cx="150" cy="104" r="16" fill="none" stroke="var(--primary)" strokeWidth="4" />
        <circle cx="150" cy="104" r="16" fill="var(--primary)" opacity="0.1" />
        <path d="M161 115 L172 126" stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" />
      </g>

      {/* Dashed suggestion dots */}
      <circle cx="70" cy="52" r="4" fill="var(--cat-video)" opacity="0.7" />
      <circle cx="178" cy="46" r="5" fill="var(--cat-dizayn)" opacity="0.6" />
      <circle cx="56" cy="104" r="3" fill="var(--cat-veb)" opacity="0.7" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* SuccessArt                                                              */
/* ---------------------------------------------------------------------- */

export function SuccessArt({ className }: SvgProps): JSX.Element {
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="success-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--cat-veb)" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="152" rx="70" ry="12" fill="var(--muted-foreground)" opacity="0.12" />

      {/* Celebration rays */}
      <g stroke="var(--cat-video)" strokeWidth="4" strokeLinecap="round">
        <path d="M120 24 L120 12" />
        <path d="M72 40 L64 30" />
        <path d="M168 40 L176 30" />
        <path d="M58 86 L46 84" />
        <path d="M182 86 L194 84" />
      </g>
      <circle cx="60" cy="52" r="4" fill="var(--cat-dizayn)" />
      <circle cx="184" cy="56" r="5" fill="var(--cat-veb)" />
      <rect x="80" y="30" width="7" height="7" rx="2" fill="var(--cat-veb)" transform="rotate(20 83 33)" />
      <rect x="156" y="34" width="7" height="7" rx="2" fill="var(--cat-dizayn)" transform="rotate(-15 159 37)" />

      {/* Success medal/check */}
      <circle cx="120" cy="90" r="46" fill="url(#success-grad)" />
      <circle cx="120" cy="90" r="46" fill="none" stroke="var(--card)" strokeWidth="4" opacity="0.5" />
      <path
        d="M100 90 L114 104 L142 76"
        fill="none"
        stroke="var(--primary-foreground)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
