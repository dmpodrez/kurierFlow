import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ParcelsProvider } from "../context/ParcelsContext";
export default function RootLayout() {
  return (
    <ParcelsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: "#111111",
          tabBarInactiveTintColor: "#8A919E",

          tabBarStyle: {
            height: 88,
            paddingTop: 10,
            paddingBottom: 22,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
          },

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="deliveries"
          options={{
            title: "Deliveries",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cube-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="scan"
          options={{
            title: "Scan",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="scan-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="route"
          options={{
            title: "Route",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="git-branch-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="delivery/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </ParcelsProvider>
  );
}
