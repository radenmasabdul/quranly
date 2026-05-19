import { StyleSheet, type ViewProps } from "react-native";

import { Spacing, ThemeColor } from "@/constants/theme";

import { ThemedView } from "./themed-view";

type ThemedCardProps = ViewProps & {
  backgroundColor?: ThemeColor;
};

export function ThemedCard({
  style,
  backgroundColor,
  ...props
}: ThemedCardProps) {
  return (
    <ThemedView
      backgroundColor={backgroundColor ?? "backgroundCard"}
      style={[styles.card, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.four,
    padding: Spacing.three,
  },
});
