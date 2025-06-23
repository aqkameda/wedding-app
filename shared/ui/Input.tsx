import React from "react";
import { TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  keyboardType?: "default" | "numeric";
}

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  style,
  inputStyle,
  keyboardType,
}) => (
  <TextInput
    style={[styles.input, inputStyle, style]}
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    keyboardType={keyboardType}
  />
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginVertical: 4,
    backgroundColor: "#fff",
  },
});
