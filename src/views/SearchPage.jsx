import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, indicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';

import AppBar from '../components/utils/AppBar';
import { LoadingComponent, LinearProgress } from '../components/utils/LoadingComponent';

import colors from '../styles/Colors';
import globalStyles from '../styles/GlobalStyles';
import { axiosGet } from '../utils/axios';
import ItemMovieComponent from '../components/home/ItemMovie';

const SearchPage = ({ navigation }) => {
  const [movieName, setMovieName] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [timer, setTimer] = React.useState(null);

  const _handlerMovieName = text => {
    setMovieName(text);
    clearTimeout(timer);
    setPage(1);
    setTimer(setTimeout(() => _fetchMovies(), 750));
  }

  const _forceFetchMovies = () => {
    clearTimeout(timer);
    _fetchMovies();
  }

  const _fetchMovies = async (clear = true) => {
    if (clear) {
      setLoading(true);
    }
    const { status, data } = await axiosGet('search', movieName, page);

    if (status == 200){
      let moviesTemp = clear ? [] : movies;
      moviesTemp = moviesTemp.concat(data.results);
      setMovies(moviesTemp);
      setTotalPage(data.total_pages);
      setPage(page + 1);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  const _clearSearch = () => {
    setMovieName('');
  }

  const _searchMore = () => {
    if (loadingMore || loading || page > totalPages) return;
      setLoadingMore(true);
      _fetchMovies(false);
  }

  const _searchBar = () => {
    return (
      <View style={styles.searchBarContainer}>
        <View style={styles.inputContainer}>
          <AntDesign 
            name="search1"
            size={25}
            color={colors.white}
          />
          <TextInput
            value={movieName}
            autoFocus={true}
            onChangeText={_handlerMovieName}
            style={styles.textInput}
            placeholder='Nombre Película'
            placeholderTextColor={colors.whiteTransparent}
            returnKeyType='search'
            onSubmitEditing={_forceFetchMovies}
          />
          { movieName.length > 0 && (
            <IconButton
              icon="close"
              size={25}
              color={colors.white}
              onPress={_clearSearch}
            />
          )}
        </View>
      </View>
    );
  }

  const _noItems = () => {
    return <Text style={globalStyles.textTitle}>No se encontraron resultados</Text>;
  }

  const _renderMovies = () => {
    // return <Text>Mostrar el listado</Text>;
    return (
      <View style={styles.container}>
        <FlatList
          style={{ flex: 1 }}
          data={movies}
          renderItem={({item}) => <ItemMovieComponent navigation={navigation} movie={item} />}
          keyExtractor={(i, k) => k.toString()}
          onScrollEndDrag={() => _searchMore()}
        />
        { loadingMore && (
          <View style={{ height: 10, width: '100%', marginTop: 5 }}>
            <LinearProgress />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title='Buscar'
        back={true}
        navigation={navigation}
      />
      { _searchBar() }
      <View style={styles.container}>
        { loading ? <LoadingComponent /> :
          movies.length == 0 ? _noItems() :
          _renderMovies()
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
  searchBarContainer: {
    width: '100%',
    height: 50,
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 40,
    backgroundColor: colors.secondaryTransparent,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
    color: colors.white,
    fontSize: 15,
  }
});

export default SearchPage;