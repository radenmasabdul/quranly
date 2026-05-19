import { StyleSheet, type ViewProps } from "react-native";

import { Spacing } from "@/constants/theme";

import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = ViewProps & {
  label: string;
};

export function ThemedBadge({ label, style, ...props }: Props) {
  return (
    <ThemedView
      backgroundColor="backgroundElevated"
      style={[styles.badge, style]}
      {...props}
    >
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 999,
  },
});
