import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "@/components/CustomTextFont";
import AppBackground from "@/components/AppBackground";
import {
  getCityWeather,
  getWeatherImageKey,
  WeatherData,
  weatherImages,
  indianCities,
  HourlyForecast,
} from "@/app/utils/weatherService";
import LocationIcon from "@/assets/app-images/location-gps.svg";
import TempIcon from "@/assets/app-images/thermostat.svg";
import HumidityIcon from "@/assets/app-images/humidity.svg";
import WindSpeedIcon from "@/assets/app-images/wind.svg";
import CustomItalicsText from "@/components/CustomItalicsText";

const Home = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCity) {
      fetchCityWeather(selectedCity);
    }
  }, [selectedCity]);

  const fetchCityWeather = async (city: string) => {
    try {
      const data = await getCityWeather(city);
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const renderCityItem = useMemo(
    () =>
      ({ item }: { item: string }) =>
        (
          <TouchableOpacity
            onPress={() => setSelectedCity(item)}
            style={styles.cityItem}
          >
            <CustomText>{item}</CustomText>
          </TouchableOpacity>
        ),
    [styles]
  );

  const renderHourlyForecastItem = useMemo(
    () =>
      ({ item }: { item: HourlyForecast }) =>
        (
          <View style={styles.hourlyForecastItem} key={item.id}>
            <Image
              source={weatherImages[getWeatherImageKey(item.description)]}
              style={styles.smallWeatherIcon}
            />
            <View style={styles.hourlyForecastItemInfo}>
              <CustomText>{item.date}</CustomText>
              <CustomText>{item.temperature}°C</CustomText>
            </View>
          </View>
        ),
    [styles]
  );

  return (
    <AppBackground>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={indianCities}
          renderItem={renderCityItem}
          keyExtractor={(item) => item}
          horizontal
          style={styles.cityList}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={5}
        />

        {weatherData && (
          <View style={styles.weatherContainer}>
            <View style={styles.todayWeather}>
              <View style={styles.locationContainer}>
                <CustomText style={styles.cityName}>{selectedCity}</CustomText>
                <LocationIcon style={styles.locationIcon} />
              </View>
              <View style={styles.currentWeather}>
                <CustomText style={styles.currentTime}>
                  {weatherData.currentWeather.date}
                </CustomText>
                <Image
                  source={
                    weatherImages[
                      getWeatherImageKey(weatherData.currentWeather.description)
                    ]
                  }
                  style={styles.currentWeatherIcon}
                />
                <CustomItalicsText style={styles.currentDescription}>
                  {weatherData.currentWeather.description}
                </CustomItalicsText>
                <View style={styles.currentWeatherInfo}>
                  <View style={styles.currentTWHContainer}>
                    <View style={styles.currentTHWData}>
                      <CustomText style={styles.currentTHWDataText}>
                        Temp
                      </CustomText>
                      <TempIcon style={styles.TWHIcon} />
                    </View>
                    <CustomText style={styles.dataInfo}>
                      {weatherData.currentWeather.temperature}°C
                    </CustomText>
                  </View>
                  <View style={styles.currentTWHContainer}>
                    <View style={styles.currentTHWData}>
                      <CustomText style={styles.currentTHWDataText}>
                        Wind Speed
                      </CustomText>
                      <WindSpeedIcon style={styles.TWHIcon} />
                    </View>
                    <CustomText style={styles.dataInfo}>
                      {weatherData.currentWeather.windSpeed} km/h
                    </CustomText>
                  </View>
                  <View style={styles.currentTWHContainer}>
                    <View style={styles.currentTHWData}>
                      <CustomText style={styles.currentTHWDataText}>
                        Humidity
                      </CustomText>
                      <HumidityIcon style={styles.TWHIcon} />
                    </View>
                    <CustomText style={styles.dataInfo}>
                      {weatherData.currentWeather.humidity}%
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.forecastWeather}>
              <View style={styles.forecastHeader}>
                <CustomText style={styles.forecastTitle}>
                  Today's Forecast
                </CustomText>
                <Link
                  href={{
                    pathname: "../ViewAll/",
                    params: {
                      hourlyForecast: JSON.stringify(weatherData.todayForecast),
                      forecast: JSON.stringify(weatherData.forecast),
                    },
                  }}
                  style={styles.viewAllButton}
                >
                  <CustomText style={styles.viewAllText}>View All</CustomText>
                </Link>
              </View>
              <FlatList
                data={weatherData.todayForecast}
                renderItem={renderHourlyForecastItem}
                keyExtractor={(item) => item.id}
                horizontal
                style={styles.hourlyForecastList}
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={5}
                windowSize={5}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  cityList: {
    maxHeight: 50,
    marginBottom: 20,
  },
  cityItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 25,
    backgroundColor: "#080745",
  },
  weatherContainer: {
    flex: 1,
  },
  todayWeather: {
    flex: 1,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginBottom: 10,
  },
  locationIcon: {
    width: 10,
    height: undefined,
    aspectRatio: 7 / 5,
    marginBottom: 10,
    opacity: 1,
  },

  cityName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 30,
    textAlign: "center",
    flex: 1,
  },
  currentTime: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: -10,
  },
  currentWeather: {
    alignItems: "center",
    flex: 1,
  },
  currentWeatherIcon: {
    width: 180,
    height: undefined,
    aspectRatio: 1,
    marginTop: 50,
    borderRadius: 25,
  },
  currentDescription: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
    textTransform: "capitalize",
  },
  currentWeatherInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  currentTWHContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  currentTHWData: {
    flexDirection: "row",
    opacity: 0.6,
  },
  currentTHWDataText: {
    fontSize: 13,
    textTransform: "capitalize",
    marginRight: 2,
  },
  TWHIcon: {
    width: 10,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 2,
  },
  dataInfo: {
    fontSize: 16,
    fontWeight: "bold",
  },
  forecastWeather: {},
  forecastTitle: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  forecastItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  hourlyForecastList: {
    marginBottom: 20,
  },
  hourlyForecastItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#075B94",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#fff",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.9,
  },

  smallWeatherIcon: {
    width: 60,
    height: undefined,
    aspectRatio: 7 / 6.5,
    borderRadius: 25,
    marginRight: 20,
  },
  hourlyForecastItemInfo: {
    alignItems: "center",
  },
  forecastHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  viewAllButton: {
    padding: 5,
  },
  viewAllText: {
    color: "#007AFF",
    fontSize: 12,
  },
});

export default Home;
