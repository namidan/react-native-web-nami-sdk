import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { ApiService } from "react-nami";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

interface ButtonProps {
  label: string;
}

export const ButtonNami: React.FC<ButtonProps> = ({ label }) => {
  const sheetRef = useRef<BottomSheetRef | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [response] = useState<any>();
  const apiService = new ApiService({
    platformID: "platformId_for_data",
  });

  const renderBottomSheet = () => {
    return (
      <BottomSheet open={open} onDismiss={() => setOpen(false)} ref={sheetRef}>
        <View style={styles.container}>
          <Button
            onPress={() => {
              setOpen(false);
            }}
            title={"Close"}
          />
        </View>
        <Text>{response ? response : "No response"}</Text>
      </BottomSheet>
    );
  };

  return (
    <View>
      {renderBottomSheet()}
      <Button
        onPress={() => {
          apiService.fetchPaywalls();
          // setOpen(true);
        }}
        title={label}
      />
      <Text>Yay response</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 100,
  },
});
