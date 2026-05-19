import { ThemedText } from "@/components/themed-text";
import { Radius, Spacing } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  isDark: boolean;
  colors: any;
  lastRead: any;
  recentSurat: any[];
  router: ReturnType<typeof useRouter>;
};

export function LastReadSection({
  isDark,
  colors,
  lastRead,
  recentSurat,
  router,
}: Props) {
  return (
    <View style={styles.lastReadSection}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>
          {lastRead ? "Terakhir Dibaca" : "Mulai Membaca"}
        </ThemedText>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/quran" as any)}
          activeOpacity={0.7}
        >
          <ThemedText style={[styles.seeAll, { color: colors.brand }]}>
            Lihat semua
          </ThemedText>
        </TouchableOpacity>
      </View>

      {lastRead && (
        <TouchableOpacity
          style={[
            styles.continueCard,
            {
              backgroundColor: colors.backgroundBismillah,
              borderColor: colors.borderBismillah,
            },
          ]}
          onPress={() =>
            router.push({
              pathname: "/quran/[nomor]" as any,
              params: {
                nomor: lastRead.nomor,
                scrollToAyat: lastRead.nomorAyat,
              },
            })
          }
          activeOpacity={0.75}
        >
          <View
            style={[
              styles.continueBadge,
              {
                backgroundColor: colors.chipActiveBg,
                borderColor: colors.borderBrand,
              },
            ]}
          >
            <Feather name="bookmark" size={10} color={colors.brand} />
            <ThemedText
              style={[
                styles.continueBadgeText,
                { color: colors.chipActiveText },
              ]}
            >
              Lanjutkan
            </ThemedText>
          </View>

          <View style={styles.continueContent}>
            <View style={styles.continueInfo}>
              <ThemedText style={styles.continueSurahName}>
                {lastRead.namaLatin}
              </ThemedText>

              <ThemedText themeColor="textMuted" style={styles.continueMeta}>
                Ayat {lastRead.nomorAyat} · Surah ke-{lastRead.nomor}
              </ThemedText>
            </View>

            <View style={styles.continueRight}>
              <ThemedText
                style={[
                  styles.continueArabic,
                  { color: colors.textArabicAccent },
                ]}
              >
                {lastRead.nama}
              </ThemedText>

              <View
                style={[
                  styles.continueArrow,
                  {
                    backgroundColor: colors.chipActiveBg,
                    borderColor: colors.borderBrand,
                  },
                ]}
              >
                <Feather name="chevron-right" size={16} color={colors.brand} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.surahList}>
        {recentSurat.map((surat) => {
          const isActive = lastRead?.nomor === surat.nomor;

          return (
            <TouchableOpacity
              key={surat.nomor}
              style={[
                styles.surahItem,
                {
                  backgroundColor: isActive
                    ? isDark
                      ? "rgba(99,102,241,0.08)"
                      : colors.chipActiveBg
                    : colors.backgroundCard,
                  borderColor: isActive
                    ? colors.borderBrand
                    : colors.borderDefault,
                },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/quran/[nomor]" as any,
                  params: { nomor: surat.nomor },
                })
              }
              activeOpacity={0.75}
            >
              <View
                style={[
                  styles.surahNumBox,
                  {
                    backgroundColor: isActive
                      ? colors.chipActiveBg
                      : colors.surahNumBg,
                    borderColor: isActive
                      ? colors.borderBrandMedium
                      : colors.borderBrand,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.surahNum,
                    {
                      color: isActive ? colors.brand : colors.surahNumText,
                    },
                  ]}
                >
                  {surat.nomor}
                </ThemedText>
              </View>

              <View style={styles.surahInfo}>
                <ThemedText style={styles.surahName}>
                  {surat.namaLatin}
                </ThemedText>

                <ThemedText themeColor="textMuted" style={styles.surahMeta}>
                  {surat.tempatTurun === "Mekah" ? "Makkiyah" : "Madaniyah"} ·{" "}
                  {surat.jumlahAyat} Ayat
                </ThemedText>
              </View>

              <ThemedText
                style={[styles.surahArabic, { color: colors.textArabicAccent }]}
              >
                {surat.nama}
              </ThemedText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lastReadSection: {
    marginTop: Spacing.five,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.two,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  seeAll: {
    fontSize: 12,
  },
  continueCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    padding: Spacing.three,
    paddingTop: Spacing.three + Spacing.two + 4,
    marginBottom: Spacing.two,
  },
  continueBadge: {
    position: "absolute",
    top: Spacing.two,
    left: Spacing.three,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  continueBadgeText: {
    fontSize: 9,
    fontWeight: "500",
  },
  continueContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  continueInfo: {
    flex: 1,
  },
  continueSurahName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  continueMeta: {
    fontSize: 11,
  },
  continueRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
  },
  continueArabic: {
    fontSize: 22,
    fontFamily: "serif",
  },
  continueArrow: {
    width: 30,
    height: 30,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  surahList: {
    gap: Spacing.one + 2,
  },
  surahItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two + 2,
    padding: Spacing.two + 2,
    borderRadius: Radius.lg,
    borderWidth: 1,
  },
  surahNumBox: {
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  surahNum: {
    fontSize: 12,
    fontWeight: "700",
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 2,
  },
  surahMeta: {
    fontSize: 10,
  },
  surahArabic: {
    fontSize: 18,
    fontFamily: "serif",
  },
});
