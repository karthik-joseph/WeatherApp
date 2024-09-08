# A Simple Weather App 👋

This is a Simple Weather App that shows the current weather of some cities in India.

## Get started

### Prerequisites

1.  **Node.js and npm:** Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [https://nodejs.org/](https://nodejs.org/).

2.  **Expo CLI:** If you don't have Expo CLI installed, you can install it globally using npm:

    ```bash
    npm install -g expo-cli
    ```

3.  **OpenWeather API Key:** Obtain an API key from OpenWeather [https://openweathermap.org/api](https://openweathermap.org/api)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/karthik-joseph/WeatherApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd WeatherApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the Project:
   - For IOS:
     ```bash
     npx expo start --ios
     ```
   - For Android:
     ```bash
     npx expo start --android
     ```
   - For Both IOS/Android:
     ```bash
     npx expo start
     ```

### Running the App

1. Start the development server:
2. You should see a QR code in your terminal. You can use the Expo Go app on your mobile
   device to scan the QR code and run the app. You can also use an Android emulator or iOS
   simulator.

### Features

- Current Weather: Displays the current temperature, humidity, wind speed, and weather icon for selected cities in India.
- Search: Allows users to search for different cities according to the weather list and view their weather information.[You can include Your city name in the cites Array]
- Notification: A static Notification tab is present.

### API

This app uses the OpenWeatherMap API to fetch weather data.

- You can find their API documentation here: [Open Weather API](https://openweathermap.org/api)
- Ensure that you replace the placeholder API key with your actual API key in the application code.[Create you secrete key from the open Weather API]

### Error Handling

The application incorporates error handling for the following:

- API Errors: Displays an error message if there are issues connecting to the OpenWeatherMap API (e.g., invalid API key, network problems).
- Location Errors: Provides feedback if the entered city is invalid or if the app cannot determine the user's location.
- Data Handling: Implements checks to handle cases where the API response data is incomplete or formatted incorrectly.

### Functionality to Implement

- It does not have a skelton Loading functionality
- It does not have a refresh functionality
- It does not have a functionality to save the searched cities
- It does not have a functionality to view the searched cities
- It does not have a functionality to delete the searched cities
- It does not have a functionality to view the searched cities in a list view
- It does not have a functionality to view the searched cities in a map view

### Built With

This project is built using:

- Expo: https://expo.dev
- React Native: https://reactnative.dev/
- TypeScript: https://www.typescriptlang.org/
- OpenWeatherMap API: https://openweathermap.org/api

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### License

**No License.Just for development**
