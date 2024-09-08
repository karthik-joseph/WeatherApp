import React, { useState, memo, useMemo, useCallback } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import CustomText from "@/components/CustomTextFont";
import AppBackground from "@/components/AppBackground";
import {
  WeatherForecast,
  HourlyForecast,
  weatherImages,
  getWeatherImageKey,
} from "@/app/utils/weatherService";
import { Image } from "react-native";

const ViewAll = () => {
  const [selectedDays, setSelectedDays] = useState(5);
  const params = useLocalSearchParams();
  const hourlyForecast = JSON.parse(
    params.hourlyForecast as string
  ) as HourlyForecast[];
  const forecast = JSON.parse(params.forecast as string) as WeatherForecast[];

  // hourly Forecast component
  const renderHourlyForecast = useMemo(
    () =>
      ({ item }: { item: HourlyForecast }) =>
        (
          <View
            style={[styles.forecastItem, { marginRight: 10 }]}
            key={item.id}
          >
            <Image
              source={weatherImages[getWeatherImageKey(item.description)]}
              style={styles.weatherIcon}
            />
            <View style={styles.dataInfo}>
              <CustomText>{item.time}</CustomText>
              <CustomText>{item.temperature}°C</CustomText>
            </View>
          </View>
        ),
    [styles]
  );
  // daily forecast component
  const renderDailyForecast = useMemo(
    () =>
      ({ item }: { item: WeatherForecast }) =>
        (
          <View
            style={[styles.forecastItem, { paddingVertical: 15 }]}
            key={item.id}
          >
            <CustomText style={styles.dailyDate}>{item.date}</CustomText>
            <CustomText style={styles.temperature}>
              {item.temperature}°C
            </CustomText>
            <Image
              source={weatherImages[getWeatherImageKey(item.description)]}
              style={[styles.weatherIcon, { width: 80 }]}
            />
          </View>
        ),
    [styles]
  );
  // How many Selected days from the user
  const DaysDropdown = memo(
    ({
      selectedDays,
      onSelect,
    }: {
      selectedDays: number;
      onSelect: (days: number) => void;
    }) => {
      const [isOpen, setIsOpen] = useState(false);
      const options = [2, 3, 5, 7, 9, 10, 12, 15, 20, 25, 30];

      return (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            onPress={() => setIsOpen(!isOpen)}
            style={styles.dropdownButton}
          >
            <CustomText style={styles.dropdownButtonText}>
              {selectedDays} day ▼
            </CustomText>
          </TouchableOpacity>
          {isOpen && (
            <View style={styles.dropdownList}>
              {options.map((days) => (
                <TouchableOpacity
                  key={days}
                  onPress={() => {
                    onSelect(days);
                    setIsOpen(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <CustomText style={styles.dropdownItemText}>
                    {days} day
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      );
    }
  );

  const handleSelect = useCallback(
    (days: number) => {
      setSelectedDays(days);
    },
    [setSelectedDays]
  );

  const filteredDailyForecast = useMemo(
    () => forecast.slice(0, selectedDays),
    [forecast, selectedDays]
  );

  return (
    <AppBackground>
      <View style={styles.container}>
        <CustomText style={styles.title}>Today</CustomText>
        <FlatList
          data={hourlyForecast}
          renderItem={renderHourlyForecast}
          horizontal
          keyExtractor={(item) => item.id}
        />
        <View style={styles.nextForecastHeader}>
          <CustomText style={styles.nextForecastTitle}>
            Next forecast
          </CustomText>
          <DaysDropdown selectedDays={selectedDays} onSelect={handleSelect} />
        </View>
        <FlatList
          data={filteredDailyForecast}
          renderItem={renderDailyForecast}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.dailyForecastListContent}
          style={styles.dailyForecastList}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
        />
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderTopColor: "#080745",
    borderTopWidth: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  forecastItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#080745",
    borderRadius: 10,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
  dailyDate: {
    fontSize: 14,
    maxWidth: "30%",
  },
  weatherIcon: {
    width: 60,
    height: undefined,
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 50,
  },
  dataInfo: {
    flex: 1,
    marginLeft: 8,
  },
  temperature: {
    fontSize: 22,
    fontWeight: "bold",
  },
  nextForecastHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 10,
  },
  nextForecastTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  dropdownContainer: {
    position: "relative",
    width: 80,
    justifyContent: "center",
    zIndex: 999,
  },
  dropdownButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    width: "100%",
  },
  dropdownButtonText: {
    color: "white",
    fontSize: 14,
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
  },
  dropdownItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    color: "white",
    fontSize: 14,
  },
  dailyForecastList: {},
  dailyForecastListContent: {
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingBottom: 250,
  },
});

export default ViewAll;
