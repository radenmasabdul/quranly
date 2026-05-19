import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface locationState {
  provinsi: string | null;
  kabkota: string | null;
  isLocationReady: boolean;
  setLocation: (provinsi: string, kabkota: string) => void;
  clearLocation: () => void;
}

export const useLocationStore = create<locationState>()(
  persist(
    (set) => ({
      provinsi: null,
      kabkota: null,
      isLocationReady: false,
      setLocation: (provinsi, kabkota) =>
        set({ provinsi, kabkota, isLocationReady: true }),
      clearLocation: () =>
        set({ provinsi: null, kabkota: null, isLocationReady: false }),
    }),
    {
      name: "location",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({
        provinsi: state.provinsi,
        kabkota: state.kabkota,
      }),
    },
  ),
);
