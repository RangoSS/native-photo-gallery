import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Button, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function IndexPage() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need your permission to access your camera roll.');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update with the selected image URI
    }
  };

  const takePhoto = async () => {
    // Request permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need your permission to use the camera.');
      return;
    }

    // Launch the camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Update with the captured photo URI
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.preview} />
          <Button title="Save Photo" onPress={() => Alert.alert('Save functionality')} />
        </>
      ) : (
        <>
          <Button title="Pick Image" onPress={pickImage} />
          <Button title="Take Photo" onPress={takePhoto} />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  preview: { width: 300, height: 300, marginVertical: 20 },
});
