import { ThemedText } from "@/components/themed-text";
import { Colors, Radius, Spacing } from "@/constants/theme";
import type { Surat } from "@/features/quran/types/quran.type";
import Feather from "@expo/vector-icons/Feather";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type Props = {
  data: Surat[];
  showArti?: boolean;
  onPressSurat: (nomor: number) => void;
  onPressBookmark: (nomor: number) => void;
  isBookmarked: (nomor: number) => boolean;
};

export function SurahList({
  data,
  showArti = false,
  onPressSurat,
  onPressBookmark,
  isBookmarked,
}: Props) {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  if (data.length === 0) return null;

  return (
    <View style={styles.list}>
      {data.map((surat) => {
        const bookmarked = isBookmarked(surat.nomor);

        return (
          <TouchableOpacity
            key={surat.nomor}
            style={[
              styles.card,
              {
                backgroundColor: colors.backgroundCard,
                borderColor: colors.borderDefault,
              },
            ]}
            onPress={() => onPressSurat(surat.nomor)}
            activeOpacity={0.75}
          >
            <View
              style={[
                styles.numBox,
                {
                  backgroundColor: colors.surahNumBg,
                  borderColor: colors.borderBrand,
                },
              ]}
            >
              <ThemedText style={[styles.num, { color: colors.surahNumText }]}>
                {surat.nomor}
              </ThemedText>
            </View>

            <View style={styles.info}>
              <ThemedText style={styles.name}>{surat.namaLatin}</ThemedText>
              <View style={styles.metaRow}>
                <ThemedText themeColor="textMuted" style={styles.meta}>
                  {surat.tempatTurun === "Mekah" ? "Makkiyah" : "Madaniyah"}
                </ThemedText>
                <View
                  style={[styles.dot, { backgroundColor: colors.textDisabled }]}
                />
                <ThemedText themeColor="textMuted" style={styles.meta}>
                  {surat.jumlahAyat} Ayat
                </ThemedText>
                {showArti && (
                  <>
                    <View
                      style={[
                        styles.dot,
                        { backgroundColor: colors.textDisabled },
                      ]}
                    />
                    <ThemedText
                      themeColor="textMuted"
                      style={styles.meta}
                      numberOfLines={1}
                    >
                      {surat.arti}
                    </ThemedText>
                  </>
                )}
              </View>
            </View>

            <ThemedText
              style={[styles.arabic, { color: colors.textArabicAccent }]}
            >
              {surat.nama}
            </ThemedText>

            <TouchableOpacity
              onPress={() => onPressBookmark(surat.nomor)}
              hitSlop={8}
              activeOpacity={0.7}
              style={styles.bookmarkBtn}
            >
              <Feather
                name="bookmark"
                size={16}
                color={bookmarked ? colors.brand : colors.textDisabled}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Spacing.one + 2,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two + 2,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  numBox: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  num: {
    fontSize: 12,
    fontWeight: "700",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexWrap: "wrap",
  },
  meta: {
    fontSize: 10,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
  },
  arabic: {
    fontSize: 18,
    fontFamily: "serif",
  },
  bookmarkBtn: {
    padding: 4,
    flexShrink: 0,
  },
});
