import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing } from "@/constants/theme";
import {
  SHORTCUTS,
  SHORTCUT_COLORS,
} from "@/features/beranda/constants/shortcuts";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  modeKey: "dark" | "light";
  router: any;
};

export function ShortcutSection({ modeKey, router }: Props) {
  return (
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
  );
}

const styles = StyleSheet.create({
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
