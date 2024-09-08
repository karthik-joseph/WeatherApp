import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView, Image } from "react-native";
import CustomText from "@/components/CustomTextFont";
import AppBackground from "@/components/AppBackground";
import Icon from "react-native-vector-icons/Ionicons";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

const notificationData: NotificationItem[] = [
  {
    id: "1",
    title: "A Storm is approaching!",
    description:
      "A high frequency storm is likely to approach your city with a magnitude of 6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter",
    icon: "storm",
  },
  {
    id: "2",
    title: "There will be snow tomorrow",
    description:
      "A high frequency storm is likely to approach your city with a magnitude of 6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter",
    icon: "snow",
  },
  {
    id: "3",
    title: "It's a sunny day",
    description:
      "A high frequency storm is likely to approach your city with a magnitude of 6.0. it is likely to deal damage to weak structures. Please stay safe indoor or under shelter",
    icon: "sun",
  },
];

const NotificationCard = ({ item }: { item: NotificationItem }) => (
  <View style={styles.card}>
    <View style={styles.iconContainer}>
      <Icon name={getIconName(item.icon)} size={50} color="white" />
      <CustomText style={styles.title}>{item.title}</CustomText>
    </View>
    <View style={styles.contentContainer}>
      <CustomText style={styles.description}>{item.description}</CustomText>
    </View>
  </View>
);

const getIconName = (icon: string) => {
  switch (icon) {
    case "storm":
      return "thunderstorm-outline";
    case "snow":
      return "snow-outline";
    case "sun":
      return "sunny-outline";
    default:
      return "alert-circle-outline";
  }
};

const Notification = () => {
  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        <CustomText style={styles.header}>Notification</CustomText>
        <FlatList
          data={notificationData}
          renderItem={({ item }) => <NotificationCard item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#075B94",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 25,
    height: 240,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "navy",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
    flex: 1,
  },
  description: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
  },
});

export default Notification;
