import { Colors, Radius, Spacing } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";

type Props = {
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
};

export function SearchApp({ value, placeholder, onChangeText }: Props) {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  return (
    <View
      style={[
        styles.searchContainer,
        {
          backgroundColor: colors.backgroundCard,
          borderColor: colors.borderDefault,
        },
      ]}
    >
      <Feather name="search" size={16} color={colors.textMuted} />
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, { color: colors.textPrimary }]}
        onChangeText={onChangeText}
        returnKeyType="search"
        clearButtonMode="while-editing"
        autoCorrect={false}
        autoCapitalize="none"
      />
      {value.length > 0 && (
        <Feather
          name="x-circle"
          size={16}
          color={colors.textMuted}
          onPress={() => onChangeText("")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    height: 46,
    borderRadius: Radius.lg,
    borderWidth: 1,
    marginTop: Spacing.two,
    marginBottom: Spacing.two,
  },
  input: {
    flex: 1,
    fontSize: 13,
  },
});
