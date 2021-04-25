import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-paper';

import AppBar from '../components/utils/AppBar';
import { LoadingComponent } from '../components/utils/LoadingComponent';

import { axiosGet } from '../utils/axios';
import globalStyles from '../styles/GlobalStyles';
import CardMovieComponent from '../components/home/CardMovie';
import ItemMovieComponent from '../components/home/ItemMovie';

const { width, height } = Dimensions.get('screen');

const HomePage = ({ navigation }) => {
  const [moviesPopulars, setMoviesPopulars] = React.useState([]);
  const [moviesTopRated, setMoviesTopRated] = React.useState([]);
  const [loadingPopular, setLoadingPopular] = React.useState(true);
  const [loadingTopRated, setLoadingTopRated] = React.useState(true);
  
  React.useEffect(() => {
    _fetchPopular();
    _fetchTopRated();
  }, []);

  const _fetchPopular = async () => {
    const { status, data } = await axiosGet('popular');

    if (status == 200) 
      setMoviesPopulars(data.results);
    setLoadingPopular(false);
  }

  const _fetchTopRated = async () => {
    const { status, data } = await axiosGet('top_rated');

    if (status == 200) 
      setMoviesTopRated(data.results);
    setLoadingTopRated(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar title='TheMovieDB' search={true} navigation={navigation} />
      <View style={globalStyles.container}>
        <ScrollView style={{ height }}>
          <View style={styles.containerCarroucel}>
            <Text style={globalStyles.textTitle}>Peliculas Populares</Text>
            <ScrollView horizontal={true} style={{ marginHorizontal: -10 }}>
              { loadingPopular && <LoadingComponent /> }
              <View style={{ width: 15 }} />
              { moviesPopulars?.map(movie => 
                <CardMovieComponent movie={movie} key={movie.id} navigation={navigation} />
              )}
              <View style={{ width: 15 }} />
            </ScrollView>
          </View>
          <Divider />
          <ScrollView style={styles.moviesContainer}>
            <Text style={globalStyles.textTitle}>Top Peliculas</Text>
            <View style={{ height: 10 }} />
              { loadingTopRated && <LoadingComponent /> }
            { moviesTopRated?.map(movie => <ItemMovieComponent movie={movie} key={'top' + movie.id} navigation={navigation} />) }
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCarroucel: {
    width,
    height: 300,
    padding: 10,
  },
  moviesContainer: {
    padding: 10,
    minWidth: 150,
  }
});

export default HomePage;