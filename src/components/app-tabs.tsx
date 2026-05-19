import { Colors } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, useColorScheme, View } from "react-native";

function TabIcon({
  icon,
  focused,
  bgColor,
}: {
  icon: React.ReactNode;
  focused: boolean;
  bgColor: string;
}) {
  return (
    <View style={[styles.iconWrapper, focused && { backgroundColor: bgColor }]}>
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 52,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function AppTabs() {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";
  const colors = Colors[isDark ? "dark" : "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.textDisabled,
        tabBarStyle: {
          backgroundColor: colors.backgroundElevated,
          borderTopColor: colors.borderDefault,
          borderTopWidth: 0.5,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          paddingTop: 8,
          height: Platform.OS === "ios" ? 82 : 62,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
          marginTop: 2,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              focused={focused}
              bgColor={colors.navActiveBg}
              icon={<Feather name="home" size={size} color={color} />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="quran"
        options={{
          title: "Quran",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              focused={focused}
              bgColor={colors.navActiveBg}
              icon={<Feather name="book-open" size={size} color={color} />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="shalat"
        options={{
          title: "Shalat",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              focused={focused}
              bgColor={colors.navActiveBg}
              icon={<Feather name="clock" size={size} color={color} />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="doa"
        options={{
          title: "Doa",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              focused={focused}
              bgColor={colors.navActiveBg}
              icon={<Feather name="heart" size={size} color={color} />}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Cari",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              focused={focused}
              bgColor={colors.navActiveBg}
              icon={<Feather name="search" size={size} color={color} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
