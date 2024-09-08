import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import CustomText from "@/components/CustomTextFont";
import AppBackground from "@/components/AppBackground";
import {
  getCityWeather,
  getWeatherImageKey,
  WeatherData,
  weatherImages,
  indianCities,
} from "@/app/utils/weatherService";
import CustomItalicsText from "@/components/CustomItalicsText";

const getBackgroundStyle = (description: string) => {
  const lowerDesc = description.toLowerCase();
  if (lowerDesc.includes("thunder")) {
    return { backgroundColor: "#3B3EAC" };
  } else if (lowerDesc.includes("rain")) {
    return { backgroundColor: "#1B1EAf" };
  } else if (lowerDesc.includes("snow")) {
    return { backgroundColor: "#3B3EAC" };
  } else if (lowerDesc.includes("sunny") || lowerDesc.includes("clear")) {
    return { backgroundColor: "#87CEEB" };
  } else if (lowerDesc.includes("cloud")) {
    return { backgroundColor: "#f4f1f1" };
  } else {
    return { backgroundColor: "#3B3EAC" };
  }
};

const getTextColor = (description: string) => {
  const lowerDesc = description.toLowerCase();
  if (lowerDesc.includes("rain")) {
    return { color: "white" };
  } else {
    return { color: "black" };
  }
};

const WeatherCard = React.memo(
  ({ weatherData }: { weatherData: WeatherData }) => {
    const bgStyle = getBackgroundStyle(weatherData.currentWeather.description);
    const textColorStyle = getTextColor(weatherData.currentWeather.description);

    return (
      <View style={[styles.weatherCard, bgStyle]}>
        <Image
          source={
            weatherImages[
              getWeatherImageKey(weatherData.currentWeather.description)
            ]
          }
          style={styles.weatherIcon}
        />
        <View style={styles.centerContent}>
          <CustomText style={[styles.city, textColorStyle]}>
            {weatherData.city}
          </CustomText>
          <CustomItalicsText style={[styles.condition, textColorStyle]}>
            {weatherData.currentWeather.description}
          </CustomItalicsText>
        </View>
        <CustomText style={[styles.temperature, textColorStyle]}>
          {Math.round(weatherData.currentWeather.temperature)}°
        </CustomText>
      </View>
    );
  }
);

const Widgets = () => {
  const [citiesWeatherData, setCitiesWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCitiesWeather = useCallback(async () => {
    setLoading(true);
    const weatherPromises = indianCities.map((city) => getCityWeather(city));
    const allWeatherData = await Promise.all(weatherPromises);
    setCitiesWeatherData(allWeatherData);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllCitiesWeather();
  }, [fetchAllCitiesWeather]);

  const renderItem = useCallback(
    ({ item }) => <WeatherCard weatherData={item} />,
    []
  );

  return (
    <AppBackground>
      <View style={styles.container}>
        <SafeAreaView style={styles.content}>
          <CustomText style={styles.title}>Widgets</CustomText>
          <FlatList
            data={citiesWeatherData}
            renderItem={renderItem}
            keyExtractor={(item) => item.city}
            style={styles.weatherList}
            onEndReachedThreshold={0.5}
            onEndReached={fetchAllCitiesWeather}
          />
        </SafeAreaView>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
    textAlign: "center",
  },
  weatherList: {
    flex: 1,
  },
  weatherCard: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  city: {
    fontSize: 18,
    fontWeight: "bold",
  },
  condition: {
    fontSize: 14,
    opacity: 0.8,
  },
  temperature: {
    fontSize: 36,
    fontWeight: "bold",
    marginRight: 16,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
});

export default Widgets;
