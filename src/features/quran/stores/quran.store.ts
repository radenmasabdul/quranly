import { mmkvStorage } from "@/services/storage/mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LastRead {
  nomor: number;
  nama: string;
  namaLatin: string;
  nomorAyat: number;
}

interface QuranStore {
  lastRead: LastRead | null;
  bookmarks: number[];

  setLastRead: (data: LastRead) => void;
  addBookmark: (nomor: number) => void;
  removeBookmark: (nomer: number) => void;
  isBookmarked: (nomor: number) => boolean;
}

export const useSuratStore = create<QuranStore>()(
  persist(
    (set, get) => ({
      lastRead: null,
      bookmarks: [],

      setLastRead: (data) => set({ lastRead: data }),

      addBookmark: (nomor) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, nomor],
        })),

      removeBookmark: (nomor) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((n) => n !== nomor),
        })),

      isBookmarked: (nomor) => get().bookmarks.includes(nomor),
    }),
    {
      name: "quran-store",
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
