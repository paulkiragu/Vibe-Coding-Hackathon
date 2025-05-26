import React from "react";
import { View } from "react-native";

export default function CardContent({ children, className, style }) {
  return (
    <View style={[style]} className={className}>
      {children}
    </View>
  );
}