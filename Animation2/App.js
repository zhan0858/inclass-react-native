import React, { useRef } from "react";
import { StyleSheet, View, Pressable, Text, Animated } from "react-native";

export default function App() {
  // Animated value for x and y axis
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Animation functions
  const moveLeft = () => {
    Animated.timing(translateX, {
      toValue: -100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveRight = () => {
    Animated.timing(translateX, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveUp = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveDown = () => {
    Animated.timing(translateY, {
      toValue: 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { transform: [{ translateX }, { translateY }] }]}
      />

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={moveLeft}>
          <Text style={styles.buttonText}>Left</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={moveRight}>
          <Text style={styles.buttonText}>Right</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={moveUp}>
          <Text style={styles.buttonText}>Up</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={moveDown}>
          <Text style={styles.buttonText}>Down</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "aqua",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 200,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});

