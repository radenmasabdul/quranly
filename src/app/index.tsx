import { ThemedView } from "@/components/themed-view";
import { AppHeader } from "@/components/ui/AppHeader";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { HomeSkeleton } from "@/features/beranda/components/HomeSkeleton";
import { LastReadSection } from "@/features/beranda/components/LastReadSection";
import { PrayerCard } from "@/features/beranda/components/PrayerCard";
import { ShortcutSection } from "@/features/beranda/components/ShortcutSection";
import { useHome } from "@/features/beranda/hooks/useHome";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
dayjs.locale("id");

export default function HomeScreen() {
  const router = useRouter();

  const {
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
  } = useHome();

  if (isGlobalLoading) {
    return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <HomeSkeleton isDark={isDark} />
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <AppHeader
            showLogo
            title="Quranly"
            subtitle="All Your Daily Worship, One App."
          />

          <PrayerCard
            isDark={isDark}
            colors={colors}
            isDetecting={isDetecting}
            isError={isError}
            isLoading={isLoading}
            prayerTime={prayerTime}
            refreshLocation={refreshLocation}
          />

          <ShortcutSection modeKey={modeKey} router={router} />

          {recentSurat.length > 0 && (
            <LastReadSection
              isDark={isDark}
              colors={colors}
              lastRead={lastRead}
              recentSurat={recentSurat}
              router={router}
            />
          )}
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
});
