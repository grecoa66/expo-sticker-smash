import { useState } from 'react';
import { FlatList, Platform, Pressable, Image, StyleSheet } from 'react-native';

import emoji1 from '../assets/images/emoji1.png';
import emoji2 from '../assets/images/emoji2.png';
import emoji3 from '../assets/images/emoji3.png';
import emoji4 from '../assets/images/emoji4.png';
import emoji5 from '../assets/images/emoji5.png';
import emoji6 from '../assets/images/emoji6.png';

export const EmojiList = ({ onSelect, onClose }) => {
  const [emoji] = useState([emoji1, emoji2, emoji3, emoji4, emoji5, emoji6]);

  return (
    <FlatList
      data={emoji}
      horizontal
      showHorizontalScrollIndicator={Platform.OS === 'web'}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onClose();
          }}
        >
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
