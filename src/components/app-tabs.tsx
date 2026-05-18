import { Colors } from "@/constants/theme";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

function TabIcon({
  icon,
  color,
  size,
  focused,
  bgColor,
}: {
  icon: React.ReactNode;
  color: string;
  size: number;
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
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const activeBg = colors.indigo950 ?? colors.indigo600;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.indigo400,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.backgroundPrimary,
          borderTopColor: colors.borderDefault,
          borderTopWidth: 1,
          paddingBottom: 10,
          paddingTop: 10,
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
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              focused={focused}
              color={color}
              size={size}
              bgColor={activeBg}
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
              color={color}
              size={size}
              bgColor={activeBg}
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
              color={color}
              size={size}
              bgColor={activeBg}
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
              color={color}
              size={size}
              bgColor={activeBg}
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
              color={color}
              size={size}
              bgColor={activeBg}
              icon={<Feather name="search" size={size} color={color} />}
            />
          ),
        }}
      />
    </Tabs>
  );
}
