import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import { CircleButton } from './components/CircleButton';
import { IconButton } from './components/IconButton';
import { EmojiPicker } from './components/EmojiPicker';
import { EmojiList } from './components/EmojiList';
import { EmojiSticker } from './components/EmojiSticker';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import placeholderImageSource from './assets/images/background-image.png';

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const addSticker = () => {
    setShowStickerModal(true);
  };
  const closeStickerModal = () => {
    setShowStickerModal(false);
  };
  const saveImage = () => {
    alert('Save image');
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={{ color: '#fff' }}>
        Open up App.js to start working on your app!
      </Text>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={placeholderImageSource}
          selectedImage={selectedImage}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              label="Reset"
              icon="refresh"
              onPress={() => setShowAppOptions(false)}
            />
            <CircleButton onPress={() => addSticker()} />
            <IconButton
              label="Save"
              icon="save-alt"
              onPress={() => saveImage()}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            label="Choose a photo"
            theme="primary"
            onPress={() => pickImageAsync()}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={showStickerModal} onClose={closeStickerModal}>
        <EmojiList
          onSelect={(emoji) => setPickedEmoji(emoji)}
          onClose={closeStickerModal}
        />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
