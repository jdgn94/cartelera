import * as React from 'react';
import { View, Text, Pressable, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

import colors from '../../styles/Colors';
import globalStyles from '../../styles/GlobalStyles';

const ItemMovieComponent = ({ movie, navigation }) => {
  const _viewMovie = () => {
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
      activeOpacity={.8}
      style={styles.container}
      onPress={_viewMovie}
    >
      <View style={styles.itemBorder}>
        <View style={styles.image}>
          <Image 
            source={{ uri: 'https://image.tmdb.org/t/p/w200' + movie.poster_path }}
            style={globalStyles.posterImage}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.movieName}>
            { movie.title.length > 35 ? (movie.title.substring(0, 32) + '...') : movie.title }
          </Text>

          <View style={styles.averageContainer}>
            <AntDesign name='star' color={colors.star} size={15} />
            <Text style={{ marginLeft: 5 }}>{ movie.vote_average }</Text>
          </View>

          <Text>
            { movie.overview.length > 115 ? movie.overview.substring(0, 112) + '...' : movie.overview }
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    minHeight: 50,
    maxHeight: 100,
    marginVertical: 4,
  },
  itemBorder: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: colors.primary,
    backgroundColor: colors.grey,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 50,
    height: 80
  },
  averageContainer: {
    width: 50,
    display: 'flex',
    flexDirection: 'row',
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  movieName: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '100%',
    height: 15,
  }
});

export default ItemMovieComponent;