import { ArrowUpRight, Code2, Coffee, Play, Sparkles } from "lucide-react";
import type { Order } from "@/types/order";

/** Editorial project mockups: decorative previews, never alternate job data. */
export function JobArtwork({ order }: { order: Order }) {
  return <div className={`job-artwork artwork-${order.id.toLowerCase()}`} aria-hidden="true">
    {order.category === "Dizayn" ? <>
      <div className="art-paper paper-back"><span>STUDIO</span><Sparkles size={30} /></div>
      <div className="art-paper paper-front">{order.id === "B01" ? <><Coffee size={27} /><span className="paper-overline">THE DAILY</span><strong>Good food.<br />Good mood.</strong><div className="menu-rule" /><span className="paper-small">COFFEE & KITCHEN</span><div className="menu-lines"><i /><i /><i /></div></> : <><span className="paper-overline">NEW SEASON</span><strong>Make<br />it bold.</strong><span className="poster-flower">✳</span><span className="paper-small">CREATIVE COLLECTION</span></>}</div>
      <span className="art-disc" /><span className="art-caption">{order.id === "B01" ? "MENU / BRAND DESIGN" : "POSTER / VISUAL DESIGN"}</span>
    </> : order.category === "Video" ? <>
      <div className="video-window"><div className="window-chrome"><i /><i /><i /><span>Creative studio</span></div><div className="video-scene"><span className="scene-orbit" /><span className="scene-type">{order.id === "B03" ? "CREATE." : "YOUR STORY."}</span><span className="play-disc"><Play size={20} fill="currentColor" /></span>{order.id === "B04" && <span className="caption-strip">Har bir kadr — yangi hikoya.</span>}</div><div className="video-timeline"><i /><i /><i /><i /><span /></div></div><span className="art-caption">{order.id === "B03" ? "MOTION / REELS" : "SUBTITLES / STORYTELLING"}</span>
    </> : <>
      <div className="web-window"><div className="window-chrome"><i /><i /><i /><span>your next idea.</span></div><div className="web-nav"><strong>makon®</strong><span>Explore ↗</span></div><div className="web-content"><div><span className="paper-overline">BUILD SOMETHING</span><strong>{order.id === "B05" ? "Beyond\nthe ordinary." : "A fresh\nperspective."}</strong><span className="mini-cta">Let’s create <ArrowUpRight size={9} /></span></div><div className="web-sculpture"><Code2 size={32} /></div></div><div className="web-blocks"><i /><i /><i /></div></div><span className="art-caption">{order.id === "B05" ? "WEB / LANDING PAGE" : "WEB / CONTENT UPDATE"}</span>
    </>}
  </div>;
}

