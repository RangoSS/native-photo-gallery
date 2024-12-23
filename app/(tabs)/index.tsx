import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Button, Image, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function IndexPage() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need your permission to access your camera roll.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'We need your permission to use the camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const savePhoto = async () => {
    if (image) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        try {
          await MediaLibrary.createAssetAsync(image);
          Alert.alert('Photo Saved', 'Your photo has been saved to the gallery.');
        } catch (error) {
          Alert.alert('Error', 'Failed to save the photo.');
        }
      } else {
        Alert.alert('Permission required', 'We need your permission to save the photo.');
      }
    }
  };

  const discardPhoto = () => {
    setImage(null); // Clear the current photo
  };

  return (
    <SafeAreaView style={styles.container}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.preview} />
          <Button title="Save Photo" onPress={savePhoto} />
          <Button title="Discard Photo" onPress={discardPhoto} />
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
