import { ThemedText } from "@/components/themed-text";
import { Colors, Radius, Spacing } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, useColorScheme, View } from "react-native";

type Props = {
  isPending: boolean;
  isError: boolean;
  isEmpty: boolean;
  isFavoritEmpty: boolean;
  searchQuery: string;
};

export function SurahListState({
  isPending,
  isError,
  isEmpty,
  isFavoritEmpty,
  searchQuery,
}: Props) {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  if (isPending) {
    return (
      <View style={styles.container}>
        {[...Array(6)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.skeletonItem,
              {
                backgroundColor: colors.backgroundCard,
                borderColor: colors.borderDefault,
              },
            ]}
          >
            <View
              style={[
                styles.skeletonNum,
                { backgroundColor: colors.surahNumBg },
              ]}
            />
            <View style={styles.skeletonInfo}>
              <View
                style={[
                  styles.skeletonLine,
                  { backgroundColor: colors.borderDefault, width: "55%" },
                ]}
              />
              <View
                style={[
                  styles.skeletonLine,
                  {
                    backgroundColor: colors.borderDefault,
                    width: "35%",
                    marginTop: 6,
                  },
                ]}
              />
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <View
            style={[
              styles.emptyIconBox,
              {
                backgroundColor: colors.backgroundCard,
                borderColor: colors.borderDefault,
              },
            ]}
          >
            <Feather name="wifi-off" size={28} color={colors.textDisabled} />
          </View>
          <ThemedText style={styles.emptyTitle}>Gagal memuat</ThemedText>
          <ThemedText themeColor="textMuted" style={styles.emptyDesc}>
            Gagal memuat daftar surah.{"\n"}Periksa koneksi internetmu.
          </ThemedText>
        </View>
      </View>
    );
  }

  if (isFavoritEmpty) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <View
            style={[
              styles.emptyIconBox,
              {
                backgroundColor: colors.surahNumBg,
                borderColor: colors.borderBrand,
              },
            ]}
          >
            <Feather name="bookmark" size={28} color={colors.brand} />
          </View>
          <ThemedText style={styles.emptyTitle}>Belum ada favorit</ThemedText>
          <ThemedText themeColor="textMuted" style={styles.emptyDesc}>
            Tap ikon bookmark di setiap surah{"\n"}untuk menyimpan ke daftar
            favorit.
          </ThemedText>
        </View>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Feather name="search" size={32} color={colors.textDisabled} />
          <ThemedText themeColor="textMuted" style={styles.emptyDesc}>
            Surah "{searchQuery}" tidak ditemukan.
          </ThemedText>
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.three,
  },
  emptyContainer: {
    alignItems: "center",
    paddingTop: Spacing.five,
    gap: Spacing.two,
  },
  emptyIconBox: {
    width: 60,
    height: 60,
    borderRadius: Radius.xl,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  emptyDesc: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two + 2,
    padding: Spacing.two + 2,
    borderWidth: 1,
    borderRadius: Radius.lg,
    marginBottom: Spacing.one + 2,
  },
  skeletonNum: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    flexShrink: 0,
  },
  skeletonInfo: {
    flex: 1,
  },
  skeletonLine: {
    height: 10,
    borderRadius: 5,
  },
});
