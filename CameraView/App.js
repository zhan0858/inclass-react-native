import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Camera, CameraView } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [facing, setFacing] = useState("back");
  const [photo, setPhoto] = useState(null);

  // Request camera permission
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // If permission is not granted
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera, please allow access</Text>;
  }

  // Function to take a picture
  const takePicture = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setPhoto(data.uri); // Set the photo URI to display
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Camera view if no photo is taken yet */}
      {!photo ? (
        <CameraView
          style={{ flex: 1 }}
          facing={facing}
          ref={(ref) => setCameraRef(ref)}
        >
          <View style={styles.cameraContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.flipText}> Flip </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <Text style={styles.captureText}> Take Picture </Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        // If a photo is taken, display the preview
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.imagePreview} />
          <TouchableOpacity
            style={styles.captureButton}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.captureText}> Retake </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  flipButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  flipText: {
    fontSize: 18,
    color: "black",
  },
  captureButton: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  captureText: {
    fontSize: 18,
    color: "black",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
});