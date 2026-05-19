import { useLocationStore } from "@/stores/location.store";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ShalatData } from "../types/shalat.type";
import { useSchedule } from "./useShalatQuery";

const PRAYER_KEYS: { key: keyof ShalatData; label: string }[] = [
  { key: "subuh", label: "Subuh" },
  { key: "dzuhur", label: "Dzuhur" },
  { key: "ashar", label: "Ashar" },
  { key: "maghrib", label: "Maghrib" },
  { key: "isya", label: "Isya" },
];

function stripKabKota(cityName: string): string {
  return cityName.replace(/^(kota|kabupaten)\s+/i, "").trim();
}

function parseTodayTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function formatCountdown(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const parts = [];
  if (h > 0) parts.push(`${h} jam`);
  if (m > 0) parts.push(`${m} menit`);
  parts.push(`${s} detik`);
  return parts.join(" ");
}

export function usePrayerTime() {
  const { provinsi, kabkota } = useLocationStore();
  const {
    data: schedule,
    isPending,
    isError,
  } = useSchedule(
    provinsi && kabkota
      ? {
          provinsi,
          kabkota,
          bulan: new Date().getMonth() + 1,
          tahun: new Date().getFullYear(),
        }
      : null,
  );

  const [now, setNow] = useState(() => new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setNow(new Date()), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const nextPrayerInfo = useMemo(() => {
    if (!schedule) return null;

    const todayDate = now.getDate();
    const todayData = schedule.jadwal.find((j) => j.tanggal === todayDate);
    if (!todayData) return null;

    const nextPrayer = PRAYER_KEYS.find(({ key }) => {
      const prayerTime = parseTodayTime(todayData[key] as string);
      return prayerTime > now;
    });

    if (!nextPrayer) {
      return {
        name: "Subuh",
        time: todayData.subuh,
        prayerDate: null,
        location: stripKabKota(schedule.kabkota),
        date: todayData.tanggal_lengkap,
      };
    }

    return {
      name: nextPrayer.label,
      time: todayData[nextPrayer.key] as string,
      prayerDate: parseTodayTime(todayData[nextPrayer.key] as string),
      location: stripKabKota(schedule.kabkota),
      date: todayData.tanggal_lengkap,
    };
  }, [schedule, now.getDate()]);

  const countdown = useMemo(() => {
    if (!nextPrayerInfo) return null;
    if (!nextPrayerInfo.prayerDate) return "Besok";
    const diffSec = Math.floor(
      (nextPrayerInfo.prayerDate.getTime() - now.getTime()) / 1000,
    );
    if (diffSec <= 0) return "Sekarang";
    return formatCountdown(diffSec);
  }, [nextPrayerInfo, now]);

  const result = nextPrayerInfo ? { ...nextPrayerInfo, countdown } : null;

  return { prayerTime: result, isPending, isError };
}
