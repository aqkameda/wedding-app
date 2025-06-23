import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppRouter } from "./AppRouter";

export default function App() {
  return (
    <SafeAreaProvider>
      <AppRouter />
    </SafeAreaProvider>
  );
}
