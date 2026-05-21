import { ThemedText } from "@/components/themed-text";
import { Colors, Radius, Spacing } from "@/constants/theme";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

export interface ChipItem<T extends string = string> {
  key: T;
  label: string;
}

type ChipProps = {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
};

export function FilterChip({ label, isActive = false, onPress }: ChipProps) {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: isActive
            ? colors.chipActiveBg
            : colors.backgroundCard,
          borderColor: isActive
            ? colors.borderBrandMedium
            : colors.borderDefault,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <ThemedText
        style={[
          styles.chipText,
          { color: isActive ? colors.chipActiveText : colors.textMuted },
        ]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

type GroupProps<T extends string> = {
  items: ChipItem<T>[];
  activeKey: T;
  onChange: (key: T) => void;
  scrollable?: boolean;
  style?: object;
};

export function FilterChipGroup<T extends string>({
  items,
  activeKey,
  onChange,
  scrollable,
  style,
}: GroupProps<T>) {
  const shouldScroll = scrollable ?? items.length > 4;

  const chips = items.map((item) => (
    <FilterChip
      key={item.key}
      label={item.label}
      isActive={activeKey === item.key}
      onPress={() => onChange(item.key)}
    />
  ));

  if (shouldScroll) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.row, style]}
        style={styles.scrollContainer}
      >
        {chips}
      </ScrollView>
    );
  }

  return <View style={[styles.row, style]}>{chips}</View>;
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 11,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    gap: Spacing.one + 2,
    marginTop: Spacing.two,
    marginBottom: Spacing.three,
  },
  scrollContainer: {
    marginBottom: Spacing.two,
  },
});
