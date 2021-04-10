import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from '../views/HomePage';
import MoviePage from '../views/MoviePage';
import SearchPage from '../views/SearchPage';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Movie" component={MoviePage} />
      <Stack.Screen name="Search" component={SearchPage} />
    </Stack.Navigator>
  );
}

export default Router;