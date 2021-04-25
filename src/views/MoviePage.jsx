import * as React from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Chip } from 'react-native-paper';
import moment from 'moment';
import 'moment/locale/es';

import AppBar from '../components/utils/AppBar';
import { LoadingBigComponent } from '../components/utils/LoadingComponent';

import { axiosGet } from '../utils/axios';
import globalStyles from '../styles/GlobalStyles';
import colors from '../styles/Colors';

moment.locale('es');

const MoviePage = ({ navigation, route }) => {
  const [title, setTitle] = React.useState('');
  const [movie, setMovie] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    _fetch();
  }, []);
  
  const _fetch = async () => {
    setTitle(route.params.title);
    const { status, data } = await axiosGet('movie', route.params.id);
    console.log(data);

    if (status == 200) {
      setMovie(data);
      const response = await axiosGet('credits', route.params.id);
      console.log(response.data);
    }
    setLoading(false);
  }

  const _header = () => {
    return (
      <View style={styles.containerHeader}>
        <ImageBackground
          source={ movie.backdrop_path ? 
            { uri: 'https://image.tmdb.org/t/p/w500' + movie.backdrop_path } :
            require('../assets/images/no-image.jpg')
          }
          style={styles.imageBackground}
        />

        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={ movie.poster_path ? 
                { uri: 'https://image.tmdb.org/t/p/w300' + movie.poster_path } :
                require('../assets/images/no-image-poster.png')
              }
              style={globalStyles.posterImage}
            />
          </View>

          <View style={styles.textHeaderContainer}>
            <Text style={styles.titleHeader}>
              Titulo original: { movie.original_title }
            </Text>
            <View style={{ height: 5 }} />
            <Text style={styles.headerContnet}>
              Estreno: { movie.release_date &&  moment(movie.release_date).format('LL') }
            </Text>
            <Text style={styles.headerContnet}>
              Duración: { movie.runtime ? parseInt(movie.runtime / 60) : 0 }h { movie.runtime ? movie.runtime % 60 : 0 }m
            </Text>
            <View style={globalStyles.contentOneLine}>
              <Text style={styles.headerContnet}>Calificarión: { movie.vote_average } </Text>
              <AntDesign name='star' color={colors.star} size={17} />
            </View>
            <Text style={styles.headerContnet}></Text>
            <Text style={styles.headerContnet}></Text>
            <Text style={styles.headerContnet}></Text>
            <Text style={styles.headerContnet}></Text>
          </View>
        </View>
      </View>
    );
  }

  const _categories = () => {
    return (
      <View style={styles.chipContainer}>
        { movie.genres?.length > 0 ?
          movie.genres.map(genre => (
            <Chip
              key={genre.id}
              style={{ backgroundColor: colors.tertiary, marginRight: 5, marginBottom: 5 }}
              textStyle={{ fontSize: 15 }}
            >
              {genre.name}
            </Chip>)
          ) : (
            <Text style={globalStyles.textDescription}>Sin categorias</Text>
          )}
      </View>
    );
  }

  const _body = () => {
    return (
      <View style={styles.body}>
        <Text style={globalStyles.textTitle}>Categorias:</Text>
        { _categories() }
        <View style={{ height: 10 }} />
        <Text style={globalStyles.textTitle}>Sinopsis</Text>
        <View style={{ height: 5 }} />
        <Text style={globalStyles.textDescription}>
          { movie.overview?.length > 0 ? movie.overview : 'Sin sinopsis.' }
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title={title}
        back={true}
        navigation={navigation}
      />
      <ScrollView style={globalStyles.container}>
        { _header() }
        { _body() }
      </ScrollView>
      { loading && <LoadingBigComponent /> }
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    minHeight: 200,
    width: '100%',
    position: 'relative',
    backgroundColor: 'black'
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover'
  },
  header: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryTransparent,
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  imageContainer: {
    height: 180,
    width: 110
  },
  textHeaderContainer: {
    flex: 1,
    marginLeft: 10
  },
  titleHeader: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.white
  },
  headerContnet: {
    fontSize: 17,
    color: colors.white
  },
  body: {
    flex: 1,
    padding: 10
  },
  chipContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
});

export default MoviePage;