import { useLocationStore } from "@/stores/location.store";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { getCityList, getProvinceList } from "../api/shalat.api";

function normalizeRegionName(value: string): string {
  return value
    .toLowerCase()
    .replace(/^kecamatan\s+/i, "")
    .replace(/^kelurahan\s+/i, "")
    .replace(/^desa\s+/i, "")
    .trim();
}

function extractMainCity(value: string): string {
  const normalized = normalizeRegionName(value);
  const words = normalized.split(" ");
  return words[0] ?? normalized;
}

function similarity(a: string, b: string): number {
  const s1 = normalizeRegionName(a);
  const s2 = normalizeRegionName(b);

  if (s1 === s2) return 100;

  const words1 = s1.split(" ");
  const words2 = s2.split(" ");

  let score = 0;

  for (const w1 of words1) {
    for (const w2 of words2) {
      if (w1 === w2) {
        score += 10;
      } else if (w1.includes(w2) || w2.includes(w1)) {
        score += 5;
      }
    }
  }

  return score;
}

const REGION_MAP: Record<string, string> = {
  aceh: "Aceh",
  "north sumatra": "Sumatera Utara",
  "west sumatra": "Sumatera Barat",
  riau: "Riau",
  "riau islands": "Kepulauan Riau",
  jambi: "Jambi",
  "south sumatra": "Sumatera Selatan",
  bengkulu: "Bengkulu",
  lampung: "Lampung",
  "bangka belitung islands": "Kepulauan Bangka Belitung",
  jakarta: "DKI Jakarta",
  "west java": "Jawa Barat",
  "central java": "Jawa Tengah",
  "east java": "Jawa Timur",
  banten: "Banten",
  yogyakarta: "DI Yogyakarta",
  bali: "Bali",
  "west nusa tenggara": "Nusa Tenggara Barat",
  "east nusa tenggara": "Nusa Tenggara Timur",
  "west kalimantan": "Kalimantan Barat",
  "central kalimantan": "Kalimantan Tengah",
  "south kalimantan": "Kalimantan Selatan",
  "east kalimantan": "Kalimantan Timur",
  "north kalimantan": "Kalimantan Utara",
  "north sulawesi": "Sulawesi Utara",
  "central sulawesi": "Sulawesi Tengah",
  "south sulawesi": "Sulawesi Selatan",
  "southeast sulawesi": "Sulawesi Tenggara",
  gorontalo: "Gorontalo",
  "west sulawesi": "Sulawesi Barat",
  maluku: "Maluku",
  "north maluku": "Maluku Utara",
  "west papua": "Papua Barat",
  papua: "Papua",
};

function mapRegionToIndonesian(region: string): string {
  return REGION_MAP[region.toLowerCase()] ?? region;
}

export function useLocationInit() {
  const { provinsi, isLocationReady, setLocation } = useLocationStore();

  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLocationReady && provinsi) {
      return;
    }
    detectLocation();
  }, [isLocationReady, provinsi]);

  const detectLocation = async () => {
    setIsDetecting(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("Izin lokasi ditolak");
        return;
      }

      const coords = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const [place] = await Location.reverseGeocodeAsync({
        latitude: coords.coords.latitude,
        longitude: coords.coords.longitude,
      });

      const detectedCity =
        place.city ?? place.subregion ?? place.district ?? "";

      const mainCity = extractMainCity(detectedCity);

      const detectedRegion = mapRegionToIndonesian(place.region ?? "");

      const provinceList = await getProvinceList();

      const matchedProvinsi = provinceList.reduce((best, p) =>
        similarity(p, detectedRegion) > similarity(best, detectedRegion)
          ? p
          : best,
      );

      const cityList = await getCityList(matchedProvinsi);

      const kotaMatch = cityList.find((city) => {
        const normalized = normalizeRegionName(city);
        return normalized.includes(mainCity) && normalized.includes("kota");
      });

      if (kotaMatch) {
        setLocation(matchedProvinsi, kotaMatch);
        return;
      }

      const matchedKabkota = cityList.reduce((best, city) =>
        similarity(city, detectedCity) > similarity(best, detectedCity)
          ? city
          : best,
      );

      setLocation(matchedProvinsi, matchedKabkota);
    } catch (err) {
      setError("Aktifkan GPS lalu coba lagi.");
    } finally {
      setIsDetecting(false);
    }
  };

  return {
    isDetecting,
    error,
    retryDetect: detectLocation,
  };
}
