import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';

import colors from '../../styles/Colors';

const { width, height } = Dimensions.get('window');

const LoadingBigComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.tertiary} size={100} />
    </View>
  );
}

const LoadingComponent = () => {
  return (
    <View style={styles.containerLow}>
      <ActivityIndicator color={colors.tertiary} size={60} />
    </View>
  );
}

const LinearProgress = () => {
  return (
    <View style={styles.linearContainer}>
      <ProgressBar indeterminate={true} color={colors.tertiary}  style={{ flex: 1 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)'
  },
  containerLow: {
    width: width - 20,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  linearContainer: {
    width: '100%',
    height: 10
  }
});

export {
  LoadingBigComponent,
  LoadingComponent,
  LinearProgress
};