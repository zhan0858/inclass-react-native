import React, { useRef } from "react";
import { StyleSheet, Text, View, Animated, Button, Easing } from "react-native";

export default function App() {
  const myAnim = useRef(new Animated.Value(0)).current;

  const right = Animated.timing(myAnim, {
    toValue: 100,
    duration: 500,
    useNativeDriver: true,
  });
  const left = Animated.timing(myAnim, {
    toValue: -100,
    delay: 500,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.linear,
    //easing: Easing.bounce,
    //easing: Easing.bezier(0.85, 0, 0.15, 1),
    //easing: Easing.cubic,
  });

  const moveRight = () => {
    right.start();
  };
  const moveLeft = () => {
    left.start();
  };
  const moveSequence = () => {
    Animated.sequence([right, left]).start();
  };

  return (
    <View style={styles.container}>
      <View style={[styles.container, { padding: 10 }]}>
        <Animated.View
          style={{
            transform: [{ translateX: myAnim }],
            width: 200,
            height: 200,
            borderRadius: 10,
            backgroundColor: "aqua",
          }}
        >
          <Text style={{ padding: 50 }}>Moving Box</Text>
        </Animated.View>
      </View>
      <View style={styles.container}>
        <Button title="Go Right" onPress={() => moveRight()} />
        <Button title="Go Left" onPress={() => moveLeft()} />
        <Button title="Go Both" onPress={() => moveSequence()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});