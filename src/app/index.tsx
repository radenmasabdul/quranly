import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  BottomTabInset,
  Colors,
  MaxContentWidth,
  Radius,
  Spacing,
} from "@/constants/theme";
import { useLocationInit } from "@/features/shalat/hooks/useLocationInit";
import { usePrayerTime } from "@/features/shalat/hooks/usePrayerTime";
import { useLocationStore } from "@/stores/location.store";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  const { isDetecting, retryDetect } = useLocationInit();
  const { prayerTime, isPending, isError } = usePrayerTime();
  const { clearLocation } = useLocationStore();
  const isLoading = isDetecting || isPending;

  const handleRefreshLocation = () => {
    clearLocation();
    retryDetect();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.navigation}>
          <ThemedView style={styles.brand}>
            <Image
              source={require("@/assets/images/icons/splash-screen.png")}
              style={styles.logo}
            />
            <ThemedView>
              <ThemedText style={styles.appName}>Quranly</ThemedText>
              <ThemedText themeColor="textSecondary" style={styles.appTagline}>
                All Your Daily Worship, One App.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <View
          style={[
            styles.prayerCardWrapper,
            { borderColor: colors.borderPrayer },
          ]}
        >
          <LinearGradient
            colors={[
              colors.backgroundPrayerCard,
              colors.backgroundPrayerCardEnd,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />

          <View style={styles.glowCircle} pointerEvents="none" />

          <ThemedText
            style={[styles.prayerLabel, { color: colors.textPrayerLabel }]}
          >
            SHALAT BERIKUTNYA
          </ThemedText>

          {isError ? (
            <ThemedText
              style={[styles.prayerName, { color: colors.textPrayerName }]}
            >
              Gagal memuat jadwal.
            </ThemedText>
          ) : isLoading || !prayerTime ? (
            <ThemedText
              style={[styles.prayerName, { color: colors.textPrayerName }]}
            >
              {isDetecting ? "Mendeteksi lokasi..." : "Memuat jadwal..."}
            </ThemedText>
          ) : (
            <>
              <ThemedText
                style={[styles.prayerName, { color: colors.textPrayerName }]}
              >
                {prayerTime.name}
              </ThemedText>

              <ThemedText
                style={[styles.prayerTime, { color: colors.textPrayerTime }]}
              >
                {prayerTime.time} · {prayerTime.countdown} lagi
              </ThemedText>

              <View style={styles.pillRow}>
                <TouchableOpacity
                  style={[
                    styles.pill,
                    {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(255,255,255,0.7)",
                      borderColor: colors.borderSubtle,
                    },
                  ]}
                  onPress={handleRefreshLocation}
                  disabled={isDetecting}
                  activeOpacity={0.7}
                >
                  <Feather
                    name={isDetecting ? "loader" : "map-pin"}
                    size={10}
                    color={isDark ? colors.textPrimary : colors.textPrayerLabel}
                  />
                  <ThemedText
                    style={[
                      styles.pillText,
                      {
                        color: isDark
                          ? colors.textPrimary
                          : colors.textPrayerLabel,
                      },
                    ]}
                  >
                    {isDetecting ? "Mendeteksi..." : prayerTime.location}
                  </ThemedText>
                </TouchableOpacity>

                <View
                  style={[
                    styles.pill,
                    {
                      backgroundColor: isDark
                        ? "rgba(99,102,241,0.2)"
                        : "rgba(99,102,241,0.1)",
                      borderColor: colors.borderBrandMedium,
                    },
                  ]}
                >
                  <Feather
                    name="calendar"
                    size={10}
                    color={colors.brandLight}
                  />
                  <ThemedText
                    style={[styles.pillText, { color: colors.brandLight }]}
                  >
                    {prayerTime.date}
                  </ThemedText>
                </View>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  navigation: {
    width: "100%",
    paddingTop: Spacing.four,
    paddingBottom: Spacing.three,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  logo: {
    width: 64,
    height: 64,
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
  },
  appTagline: {
    fontSize: 13,
    marginTop: 1,
  },
  prayerCardWrapper: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    overflow: "hidden",
    padding: Spacing.three,
    position: "relative",
  },
  glowCircle: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(59,130,246,0.1)",
  },
  prayerLabel: {
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
    marginBottom: Spacing.one,
  },
  prayerName: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: Spacing.one,
  },
  prayerTime: {
    fontSize: 13,
    marginBottom: Spacing.two + Spacing.one,
  },
  pillRow: {
    flexDirection: "row",
    gap: Spacing.two,
    flexWrap: "wrap",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 10,
    fontWeight: "500",
  },
});
