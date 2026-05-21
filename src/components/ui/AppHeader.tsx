import { ThemedText } from "@/components/themed-text";
import { Colors, Radius, Spacing } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import {
  Image,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  variant?: "list" | "detail";
  showLogo?: boolean;
  showBackButton?: boolean;
  showBookmarkButton?: boolean;
  showShareButton?: boolean;
  showMenuButton?: boolean;
  isBookmarked?: boolean;
  onBackPress?: () => void;
  onBookmarkPress?: () => void;
  onSharePress?: () => void;
  onMenuPress?: () => void;
};

export function AppHeader({
  title,
  subtitle,
  variant = "list",
  showLogo = false,
  showBackButton = false,
  showBookmarkButton = false,
  showShareButton = false,
  showMenuButton = false,
  isBookmarked = false,
  onBackPress,
  onBookmarkPress,
  onSharePress,
  onMenuPress,
}: Props) {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  if (variant === "list") {
    return (
      <View style={styles.listWrapper}>
        <View style={styles.listRow}>
          <View style={styles.listLeft}>
            {showLogo && (
              <Image
                source={require("@/assets/images/icons/splash-screen.png")}
                style={styles.logo}
              />
            )}
            <View>
              <ThemedText style={styles.listTitle}>{title}</ThemedText>
              {subtitle ? (
                <ThemedText
                  themeColor="textSecondary"
                  style={styles.listSubtitle}
                >
                  {subtitle}
                </ThemedText>
              ) : null}
            </View>
          </View>

          <View style={styles.actionRow}>
            {showShareButton && (
              <Pressable
                style={[
                  styles.iconBtn,
                  {
                    backgroundColor: colors.backgroundCard,
                    borderColor: colors.borderDefault,
                  },
                ]}
                onPress={onSharePress}
                hitSlop={8}
              >
                <Feather
                  name="share-2"
                  size={16}
                  color={colors.textSecondary}
                />
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.detailWrapper,
        { borderBottomColor: colors.borderDefault },
      ]}
    >
      {showBackButton && (
        <Pressable
          style={[
            styles.iconBtn,
            {
              backgroundColor: colors.backgroundCard,
              borderColor: colors.borderDefault,
            },
          ]}
          onPress={onBackPress}
          hitSlop={8}
        >
          <Feather name="arrow-left" size={18} color={colors.textSecondary} />
        </Pressable>
      )}

      <View style={styles.detailCenter}>
        <ThemedText
          style={styles.detailTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText
            themeColor="textMuted"
            style={styles.detailSubtitle}
            numberOfLines={1}
          >
            {subtitle}
          </ThemedText>
        ) : null}
      </View>

      <View style={styles.actionRow}>
        {showBookmarkButton && (
          <Pressable
            style={[
              styles.iconBtn,
              {
                backgroundColor: isBookmarked
                  ? isDark
                    ? colors.chipActiveBg
                    : colors.chipActiveBg
                  : colors.backgroundCard,
                borderColor: isBookmarked
                  ? colors.borderBrand
                  : colors.borderDefault,
              },
            ]}
            onPress={onBookmarkPress}
            hitSlop={8}
          >
            <Feather
              name={isBookmarked ? "bookmark" : "bookmark"}
              size={16}
              color={isBookmarked ? colors.brand : colors.textSecondary}
            />
          </Pressable>
        )}

        {showShareButton && (
          <Pressable
            style={[
              styles.iconBtn,
              {
                backgroundColor: colors.backgroundCard,
                borderColor: colors.borderDefault,
              },
            ]}
            onPress={onSharePress}
            hitSlop={8}
          >
            <Feather name="share-2" size={16} color={colors.textSecondary} />
          </Pressable>
        )}

        {showMenuButton && (
          <Pressable
            style={[
              styles.iconBtn,
              {
                backgroundColor: colors.backgroundCard,
                borderColor: colors.borderDefault,
              },
            ]}
            onPress={onMenuPress}
            hitSlop={8}
          >
            <Feather
              name="more-vertical"
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.three,
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    flex: 1,
  },
  logo: {
    width: 56,
    height: 56,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 28,
  },
  listSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  detailWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    paddingTop: Spacing.two + 4,
    paddingBottom: Spacing.two + 4,
    borderBottomWidth: 0.5,
  },
  detailCenter: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  detailSubtitle: {
    fontSize: 10,
    marginTop: 1,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  actionRow: {
    flexDirection: "row",
    gap: Spacing.one + 2,
  },
});
