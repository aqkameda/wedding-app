import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled,
}) => (
  <TouchableOpacity
    style={[styles.button, style, disabled && styles.disabled]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={disabled}
  >
    <Text style={[styles.text, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4F8EF7",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 4,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabled: {
    backgroundColor: "#b0b0b0",
  },
});
