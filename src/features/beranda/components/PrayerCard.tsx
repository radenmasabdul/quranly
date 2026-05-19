import Feather from "@expo/vector-icons/Feather";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing } from "@/constants/theme";

type Props = {
  isDark: boolean;
  colors: any;
  isDetecting: boolean;
  isError: boolean;
  isLoading: boolean;
  prayerTime: any;
  refreshLocation: () => void;
};

export function PrayerCard({
  isDark,
  colors,
  isDetecting,
  isError,
  isLoading,
  prayerTime,
  refreshLocation,
}: Props) {
  const base = {
    backgroundColor: isDark
      ? "rgba(255,255,255,0.08)"
      : "rgba(255,255,255,0.3)",
    borderRadius: Radius.md,
  };

  if (isLoading || !prayerTime) {
    return (
      <View
        style={[styles.prayerCardWrapper, { borderColor: colors.borderPrayer }]}
      >
        <LinearGradient
          colors={[colors.backgroundPrayerCard, colors.backgroundPrayerCardEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.glowCircle} pointerEvents="none" />

        <View
          style={[
            { height: 10, width: "30%", marginBottom: Spacing.one },
            base,
          ]}
        />
        <View
          style={[
            { height: 28, width: "55%", marginBottom: Spacing.two },
            base,
          ]}
        />
        <View
          style={[
            { height: 13, width: "45%", marginBottom: Spacing.three },
            base,
          ]}
        />

        <View style={{ flexDirection: "row", gap: Spacing.two }}>
          <View
            style={[
              { width: 100, height: 24, borderRadius: Radius.full },
              base,
            ]}
          />
          <View
            style={[
              { width: 120, height: 24, borderRadius: Radius.full },
              base,
            ]}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={[styles.prayerCardWrapper, { borderColor: colors.borderPrayer }]}
    >
      <LinearGradient
        colors={[colors.backgroundPrayerCard, colors.backgroundPrayerCardEnd]}
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
              onPress={refreshLocation}
              disabled={isDetecting}
              activeOpacity={0.7}
            >
              <Feather
                name={isDetecting ? "loader" : "map-pin"}
                size={10}
                color={isDark ? colors.textSecondary : colors.textPrayerLabel}
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
              <Feather name="calendar" size={10} color={colors.brandLight} />
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
  );
}

const styles = StyleSheet.create({
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
});
