import { StyleSheet } from "react-native";
import { Stack, Tabs } from "expo-router";
import { View, Image } from "react-native";
import AppBackground from "@/components/AppBackground";
import HomeIconLight from "@/assets/icons/home-light.svg";
import HomeIconDark from "@/assets/icons/home-dark.svg";
import WidgetIconLight from "@/assets/icons/widget-light.svg";
import WidgetIconDark from "@/assets/icons/widget-dark.svg";
import NotificationLight from "@/assets/icons/notifications-light.svg";
import NotificationDark from "@/assets/icons/notifications-dark.svg";

export default function TabLayout() {
  return (
    <AppBackground>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "white",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            borderTopWidth: 0,
            paddingBottom: 20,
            borderRadius: 25,
          },
          tabBarBackground: () => (
            <View style={{ backgroundColor: "transparent" }}></View>
          ),
          tabBarLabelStyle: {
            fontSize: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeIconLight style={styles.iconStyle} />
              ) : (
                <HomeIconDark style={styles.iconStyle} />
              ),
          }}
        />
        <Tabs.Screen
          name="widgets"
          options={{
            title: "Widgets",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <WidgetIconLight style={styles.iconStyle} />
              ) : (
                <WidgetIconDark style={styles.iconStyle} />
              ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Notification",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <NotificationLight style={styles.iconStyle} />
              ) : (
                <NotificationDark style={styles.iconStyle} />
              ),
          }}
        />
      </Tabs>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  iconStyle: {
    width: 15,
    height: 15,
    tintColor: "white",
  },
});
