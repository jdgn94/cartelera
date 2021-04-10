import 'react-native-gesture-handler';
import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Router from './src/router/Router';

import globalStyles from './src/styles/GlobalStyles';

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SafeAreaView>
  );
}