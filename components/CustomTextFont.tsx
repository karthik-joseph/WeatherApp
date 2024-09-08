import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

interface CustomTextProps extends TextProps {
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({
  style,
  children,
  ...props
}) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontFamily: "MerriWeather",
    color: "#fff",
  },
});

export default CustomText;
