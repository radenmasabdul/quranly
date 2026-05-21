import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AppHeader } from "@/components/ui/AppHeader";
import { FilterChipGroup } from "@/components/ui/ChipsApp";
import { SearchApp } from "@/components/ui/SearchApp";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { SurahList } from "@/features/quran/components/SurahList";
import { SurahListState } from "@/features/quran/components/SurahListState";
import { useSurah } from "@/features/quran/hooks/useSurah";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function QuranScreen() {
  const {
    router,
    isPending,
    isError,
    bookmarks,
    isBookmarked,
    searchInput,
    activeFilter,
    setActiveFilter,
    debouncedSearch,
    subtitle,
    handleSearch,
    handleToggleBookmark,
    filteredSurat,
    filtersWithCount,
  } = useSurah();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <AppHeader title="Al-Quran" subtitle={subtitle} />

          <SearchApp
            value={searchInput}
            onChangeText={handleSearch}
            placeholder="Cari surah..."
          />

          <FilterChipGroup
            items={filtersWithCount as any}
            activeKey={activeFilter}
            onChange={setActiveFilter}
          />

          {debouncedSearch.length > 0 && (
            <ThemedText themeColor="textMuted" style={styles.resultInfo}>
              {filteredSurat.length} hasil untuk "{debouncedSearch}"
            </ThemedText>
          )}

          <SurahListState
            isPending={isPending}
            isError={isError}
            isEmpty={filteredSurat.length === 0 && activeFilter !== "favorit"}
            isFavoritEmpty={
              activeFilter === "favorit" && bookmarks.length === 0
            }
            searchQuery={debouncedSearch}
          />

          {!isPending && !isError && filteredSurat.length > 0 && (
            <SurahList
              data={filteredSurat}
              showArti={debouncedSearch.length > 0}
              onPressSurat={(nomor) =>
                router.push({
                  pathname: "/quran/[nomor]" as any,
                  params: { nomor },
                })
              }
              onPressBookmark={handleToggleBookmark}
              isBookmarked={isBookmarked}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
  },
  scrollContent: {
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  resultInfo: {
    fontSize: 11,
    marginBottom: Spacing.two,
  },
  centerText: {
    textAlign: "center",
    marginTop: Spacing.five,
  },
});
