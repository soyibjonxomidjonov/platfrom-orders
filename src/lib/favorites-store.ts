"use client";

import { getMyFavoriteIds, toggleFavoriteAction } from "@/actions/favorites";

/**
 * Sevimlilar — PostgreSQL'da saqlanadi (login talab qilinadi).
 * Klient tomonida bitta kesh: barcha yurakcha tugmalari va ro'yxatlar
 * "favorites:changed" hodisasi orqali sinxron yangilanadi.
 */
let cache: string[] = [];
let loaded = false;
let authed = false;
let loading: Promise<void> | null = null;

function emit() {
  window.dispatchEvent(new Event("favorites:changed"));
}

export function ensureFavoritesLoaded(): Promise<void> {
  if (loaded) return Promise.resolve();
  if (!loading) {
    loading = getMyFavoriteIds()
      .then((r) => {
        cache = r.ids;
        authed = r.authed;
      })
      .catch(() => {
        cache = [];
      })
      .finally(() => {
        loaded = true;
        loading = null;
        emit();
      });
  }
  return loading;
}

/** Joriy keshlangan sevimli ID'lar (birinchi chaqiruvda yuklashni boshlaydi). */
export function getFavorites(): string[] {
  if (typeof window !== "undefined") void ensureFavoritesLoaded();
  return cache;
}

export function favoritesLoaded(): boolean {
  return loaded;
}

export function isAuthedForFavorites(): boolean {
  return authed;
}

/** Sevimlilarga qo'shish/olib tashlash (optimistik yangilanish bilan). */
export async function toggleFavorite(id: string): Promise<"ok" | "unauthorized" | "error"> {
  const prev = cache;
  cache = cache.includes(id) ? cache.filter((x) => x !== id) : [...cache, id];
  emit();
  const res = await toggleFavoriteAction(id).catch(() => ({ status: "error" as const }));
  if (res.status === "ok") {
    cache = res.ids;
    authed = true;
    emit();
    return "ok";
  }
  cache = prev;
  emit();
  return res.status;
}
