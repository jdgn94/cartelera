import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native';

import colors from '../../styles/Colors';
import globalStyles from '../../styles/GlobalStyles';

const CardMovieComponent = ({ movie, navigation }) => {
  const _movieDetails = () => {
    navigation.navigate({
      name: 'Movie',
      params: {
        id: movie.id,
        title: movie.title
      }
    });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={.8}
      onPress={_movieDetails}
    >
      <Image
        source={ movie.poster_path.length ? 
          { uri: 'https://image.tmdb.org/t/p/w300' + movie.poster_path } :
          require('../../assets/images/no-image-poster.png')
        }
        style={globalStyles.posterImage}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: 150,
    height: 'auto',
    backgroundColor: colors.grey,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 7,
    position: 'relative'
  }
});

export default CardMovieComponent;