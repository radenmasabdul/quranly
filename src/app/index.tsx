import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  BottomTabInset,
  Colors,
  MaxContentWidth,
  Radius,
  Spacing,
} from "@/constants/theme";
import {
  SHORTCUT_COLORS,
  SHORTCUTS,
} from "@/features/beranda/constants/shortcuts";
import { useLocationInit } from "@/features/shalat/hooks/useLocationInit";
import { usePrayerTime } from "@/features/shalat/hooks/usePrayerTime";
import { useLocationStore } from "@/stores/location.store";
import Feather from "@expo/vector-icons/Feather";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

dayjs.locale("id");

export default function HomeScreen() {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];
  const modeKey = isDark ? "dark" : "light";
  const router = useRouter();

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedView style={styles.navigation}>
            <ThemedView style={styles.brand}>
              <Image
                source={require("@/assets/images/icons/splash-screen.png")}
                style={styles.logo}
              />
              <ThemedView>
                <ThemedText style={styles.appName}>Quranly</ThemedText>
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.appTagline}
                >
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
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.7)",
                        borderColor: isDark
                          ? "rgba(255,255,255,0.15)"
                          : colors.borderSubtle,
                      },
                    ]}
                    onPress={handleRefreshLocation}
                    disabled={isDetecting}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name={isDetecting ? "loader" : "map-pin"}
                      size={10}
                      color={
                        isDark ? colors.textSecondary : colors.textPrayerLabel
                      }
                    />
                    <ThemedText
                      style={[
                        styles.pillText,
                        {
                          color: isDark
                            ? colors.textSecondary
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
                      {dayjs(prayerTime.date).format("DD MMMM YYYY")}
                    </ThemedText>
                  </View>
                </View>
              </>
            )}
          </View>

          <View style={styles.shortcutSection}>
            <View style={styles.shortcutGrid}>
              {SHORTCUTS.map((item) => {
                const c = SHORTCUT_COLORS[item.colorKey][modeKey];
                return (
                  <TouchableOpacity
                    key={item.key}
                    style={styles.shortcutItem}
                    onPress={() => router.push(item.route as any)}
                    activeOpacity={0.75}
                  >
                    <View
                      style={[
                        styles.shortcutIconBox,
                        { backgroundColor: c.bg, borderColor: c.border },
                      ]}
                    >
                      <Feather name={item.icon} size={30} color={c.icon} />
                    </View>

                    <ThemedText
                      themeColor="textMuted"
                      style={styles.shortcutLabel}
                      numberOfLines={2}
                    >
                      {item.label}
                    </ThemedText>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
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
  },
  scrollContent: {
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
    margin: Spacing.two,
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
    marginBottom: Spacing.two,
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
  shortcutSection: {
    marginTop: Spacing.five,
  },
  shortcutGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shortcutItem: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.one + 2,
  },
  shortcutIconBox: {
    width: 60,
    height: 60,
    borderRadius: Radius.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shortcutLabel: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
  },
});
