import { View, type ViewProps } from "react-native";

import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  backgroundColor?: ThemeColor;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  backgroundColor,
  ...otherProps
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        { backgroundColor: theme[backgroundColor ?? "backgroundPrimary"] },
        style,
      ]}
      {...otherProps}
    />
  );
}
