import React from "react";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { cn } from "@/lib/utils";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{ label: string; value: string }>;
  className?: string;
}

export function Select({ value, onValueChange, items, className }: SelectProps) {
  return (
    <View className={cn("border border-gray-300 rounded-md", className)}>
      <RNPickerSelect
        value={value}
        onValueChange={onValueChange}
        items={items}
        style={{
          inputIOS: {
            padding: 12,
            fontSize: 16,
          },
          inputAndroid: {
            padding: 12,
            fontSize: 16,
          },
        }}
      />
    </View>
  );
}
