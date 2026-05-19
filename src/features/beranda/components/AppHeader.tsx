import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { Image, StyleSheet } from "react-native";

type Props = {
  title?: string;
  tagline?: string;
};

export function AppHeader({
  title = "Quranly",
  tagline = "All Your Daily Worship, One App.",
}: Props) {
  return (
    <ThemedView style={styles.navigation}>
      <ThemedView style={styles.brand}>
        <Image
          source={require("@/assets/images/icons/splash-screen.png")}
          style={styles.logo}
        />

        <ThemedView>
          <ThemedText style={styles.appName}>{title}</ThemedText>
          <ThemedText themeColor="textSecondary" style={styles.appTagline}>
            {tagline}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
});
