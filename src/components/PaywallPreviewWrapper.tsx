import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

type MainContainerProps = {
  children: ReactNode | ReactNode[];
};

export default function MainContainer({ children }: MainContainerProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.innerContainer}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
  innerContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
