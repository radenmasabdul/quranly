import { useQuran } from "@/features/quran/hooks/useQuranQuery";
import { useSuratStore } from "@/features/quran/stores/quran.store";
import { FILTERS, FilterMode } from "@/features/quran/types";
import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";

export function useSurah() {
  const router = useRouter();
  const { data: suratList, isPending, isError } = useQuran();
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } =
    useSuratStore();

  const [searchInput, setSearchInput] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<FilterMode>("semua");
  const debouncedSearch = useDebounce(searchInput, 300);

  const totalSurah = suratList?.length ?? 0;
  const totalAyat = suratList?.reduce((t, s) => t + s.jumlahAyat, 0) ?? 0;
  const subtitle =
    totalSurah > 0
      ? `${totalSurah} Surah · 30 Juz · ${totalAyat.toLocaleString("id-ID")} Ayat`
      : "Memuat...";

  const handleSearch = useCallback((text: string) => setSearchInput(text), []);

  const handleToggleBookmark = useCallback(
    (nomor: number) => {
      isBookmarked(nomor) ? removeBookmark(nomor) : addBookmark(nomor);
    },
    [isBookmarked, addBookmark, removeBookmark],
  );

  const filteredSurat = useMemo(() => {
    if (!suratList) return [];

    const query = debouncedSearch.trim().toLowerCase();

    return suratList.filter((s) => {
      if (activeFilter === "makkiyah" && s.tempatTurun !== "Mekah")
        return false;

      if (activeFilter === "madaniyah" && s.tempatTurun !== "Madinah")
        return false;

      if (activeFilter === "favorit" && !bookmarks.includes(s.nomor))
        return false;

      if (!query) return true;

      return (
        s.namaLatin.toLowerCase().includes(query) ||
        s.arti.toLowerCase().includes(query) ||
        s.nomor.toString().includes(query) ||
        s.nama.includes(debouncedSearch.trim())
      );
    });
  }, [suratList, debouncedSearch, activeFilter, bookmarks]);

  const favoriteCount = useMemo(() => {
    if (!suratList) return 0;

    const query = debouncedSearch.trim().toLowerCase();

    return suratList.filter((s) => {
      if (!bookmarks.includes(s.nomor)) return false;
      if (!query) return true;

      return (
        s.namaLatin.toLowerCase().includes(query) ||
        s.arti.toLowerCase().includes(query) ||
        s.nomor.toString().includes(query) ||
        s.nama.toLowerCase().includes(query)
      );
    }).length;
  }, [suratList, bookmarks, debouncedSearch]);

  const filtersWithCount = FILTERS.map((f) =>
    f.key === "favorit" ? { ...f, label: `Favorit (${favoriteCount})` } : f,
  );

  return {
    router,
    isPending,
    isError,
    bookmarks,
    isBookmarked,
    searchInput,
    activeFilter,
    setActiveFilter,
    debouncedSearch,
    subtitle,
    handleSearch,
    handleToggleBookmark,
    filteredSurat,
    filtersWithCount,
  };
}
