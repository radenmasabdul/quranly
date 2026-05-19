import { Colors } from "@/constants/theme";
import { useQuran } from "@/features/quran/hooks/useQuranQuery";
import { useSuratStore } from "@/features/quran/stores/quran.store";
import { useLocationInit } from "@/features/shalat/hooks/useLocationInit";
import { usePrayerTime } from "@/features/shalat/hooks/usePrayerTime";
import { useLocationStore } from "@/stores/location.store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export function useHome() {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];
  const modeKey: "dark" | "light" = isDark ? "dark" : "light";

  const { isDetecting, retryDetect } = useLocationInit();
  const { prayerTime, isPending, isError } = usePrayerTime();
  const { clearLocation } = useLocationStore();

  const { lastRead } = useSuratStore();
  const { data: quranList } = useQuran();

  const isLoading = isDetecting || isPending;
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  useEffect(() => {
    if ((quranList && prayerTime) || isError) {
      setIsGlobalLoading(false);
    }
  }, [quranList, prayerTime, isError]);

  const recentSurat = useMemo(() => {
    if (!quranList) return [];
    if (!lastRead) return quranList.slice(0, 5);

    const idx = quranList.findIndex((s) => s.nomor === lastRead.nomor);
    if (idx === -1) return quranList.slice(0, 5);

    const picks = [quranList[idx]];
    if (idx + 1 < quranList.length) picks.push(quranList[idx + 1]);
    if (idx + 2 < quranList.length) picks.push(quranList[idx + 2]);

    return picks;
  }, [quranList, lastRead]);

  const refreshLocation = useCallback(() => {
    clearLocation();
    retryDetect();
  }, [clearLocation, retryDetect]);

  return {
    isDark,
    colors,
    modeKey,
    isDetecting,
    prayerTime,
    isError,
    isLoading,
    isGlobalLoading,
    lastRead,
    recentSurat,
    refreshLocation,
  };
}
