import React, { useRef, useEffect } from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window"); // Get screen dimensions

export default function App() {
  const ballSize = 1; // Size of the ball

  // Animated values for x and y axis
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Ref values for velocity in x and y directions
  const velocityX = useRef(4); // Initial velocity for X direction
  const velocityY = useRef(4); // Initial velocity for Y direction

  // Function to start the bouncing animation
  const bounceBall = () => {
    const ballX = translateX.__getValue(); // Current X position
    const ballY = translateY.__getValue(); // Current Y position

    let newVelocityX = velocityX.current;
    let newVelocityY = velocityY.current;

    // Check for collision with left or right boundaries
    if (ballX <= 0 || ballX >= width - ballSize) {
      newVelocityX = -velocityX.current; // Reverse X direction
    }

    // Check for collision with top or bottom boundaries
    if (ballY <= 0 || ballY >= height - ballSize) {
      newVelocityY = -velocityY.current; // Reverse Y direction
    }

    // Animate the ball with the updated velocities
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: ballX + newVelocityX,
        duration: 2,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: ballY + newVelocityY,
        duration: 2,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Update velocities for the next bounce
      velocityX.current = newVelocityX;
      velocityY.current = newVelocityY;

      // Repeat the animation by calling bounceBall recursively
      bounceBall();
    });
  };

  useEffect(() => {
    bounceBall(); // Start the bouncing when the app loads
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.ball, { transform: [{ translateX }, { translateY }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ball: {
    width: 20,
    height: 20,
    backgroundColor: "blue",
    borderRadius: 10, // Make the box into a circle
    position: "absolute",
  },
});