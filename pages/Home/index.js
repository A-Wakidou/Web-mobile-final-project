import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

import logo from "./assets/icon.png";

const Home = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState<null | {
    localUri
  }>(null);

  const openImagePickerAsync = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then((grantedStatus) => {
      if (grantedStatus.granted) {
        ImagePicker.launchImageLibraryAsync().then((pickerResult) => {
          console.log(pickerResult);
          const { cancelled } = pickerResult;
          if (cancelled) return;

          setSelectedImage({ localUri: pickerResult.uri });
        });
      }
    });
  };
  const openShareDialogAsync = () => {
    Sharing.isAvailableAsync().then((result) => {
      console.log(result);
      if (selectedImage) {
        Sharing.shareAsync(selectedImage.localUri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {selectedImage ? (
        <Image
          source={{
            uri: selectedImage.localUri,
          }}
          style={styles.img}
        />
      ) : (
        <Image
          source={{
            uri: "https://i.imgur.com/TkIrScD.png",
          }}
          style={styles.img}
        />
      )}

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.btn}>
        <Text style={styles.btnText}>Pick a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openShareDialogAsync} style={styles.btn}>
        <Text style={styles.btnText}>Share</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Detail")}
        style={styles.btn}
      >
        <Text style={styles.btnText}>Open Detail</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 305,
    height: 159,
  },
  btn: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 20,
    backgroundColor: "#68a0cf",
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
  },
});

export default Home;
