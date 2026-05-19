import { Colors, Radius, Spacing } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

type Props = {
  isDark?: boolean;
};

export function HomeSkeleton({ isDark = false }: Props) {
  const colors = Colors[isDark ? "dark" : "light"];

  const base = {
    backgroundColor: isDark
      ? "rgba(255,255,255,0.06)"
      : colors.backgroundElevated,
    borderRadius: Radius.md,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[
            styles.logo,
            {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.08)"
                : colors.backgroundElevated,
            },
          ]}
        />
        <View style={{ flex: 1, gap: 6 }}>
          <View style={[styles.lineLg, base]} />
          <View style={[styles.lineSm, base]} />
        </View>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark
              ? colors.backgroundPrayerCard
              : colors.backgroundPrayerCard,
            borderColor: colors.borderPrayer,
          },
        ]}
      >
        <View style={[styles.lineSm, base]} />
        <View style={[styles.lineXl, base]} />
        <View style={[styles.lineMd, base]} />

        <View style={styles.row}>
          <View style={[styles.pill, base]} />
          <View style={[styles.pill, base]} />
        </View>
      </View>

      <View style={styles.shortcutRow}>
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.shortcutItem}>
            <View
              style={[
                styles.shortcutIcon,
                {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.06)"
                    : colors.backgroundElevated,
                },
              ]}
            />
            <View style={[styles.shortcutText, base]} />
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={[styles.lineMd, base]} />
          <View style={[styles.lineSm, base]} />
        </View>

        <View
          style={[
            styles.lastCard,
            {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.04)"
                : colors.backgroundCard,
              borderColor: colors.borderDefault,
            },
          ]}
        >
          <View style={[styles.badge, base]} />
          <View style={[styles.lineXl, base]} />
          <View style={[styles.lineMd, base]} />
        </View>

        {[1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.listItem,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : colors.backgroundCard,
                borderColor: colors.borderDefault,
              },
            ]}
          >
            <View style={[styles.numBox, base]} />

            <View style={{ flex: 1, gap: 6 }}>
              <View style={[styles.lineMd, base]} />
              <View style={[styles.lineSm, base]} />
            </View>

            <View style={[styles.arabicBox, base]} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.three,
    gap: Spacing.four,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
  },
  lineLg: {
    height: 14,
    width: "60%",
  },
  lineMd: {
    height: 12,
    width: "45%",
  },
  lineSm: {
    height: 10,
    width: "30%",
  },
  card: {
    padding: Spacing.three,
    borderRadius: Radius.xl,
    borderWidth: 1,
    gap: 10,
  },
  lineXl: {
    height: 26,
    width: "55%",
    borderRadius: Radius.md,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  pill: {
    width: 90,
    height: 24,
    borderRadius: Radius.full,
  },
  shortcutRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shortcutItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  shortcutIcon: {
    width: 60,
    height: 60,
    borderRadius: Radius.lg,
  },
  shortcutText: {
    width: 40,
    height: 10,
    borderRadius: Radius.sm,
  },
  section: {
    gap: Spacing.two,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastCard: {
    padding: Spacing.three,
    borderRadius: Radius.xl,
    borderWidth: 1,
    gap: 10,
  },
  badge: {
    width: 80,
    height: 18,
    borderRadius: Radius.full,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: Spacing.two,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  numBox: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
  },
  arabicBox: {
    width: 30,
    height: 18,
    borderRadius: Radius.sm,
  },
});
