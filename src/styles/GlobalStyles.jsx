import { StyleSheet } from 'react-native';
import colors from './Colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  textTitle: {
    fontSize: 25,
    color: colors.secondary
  },
  posterImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 7
  },
  contentOneLine: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  textDescription: {
    fontSize: 20,
    textAlign: 'justify'
  },
});

export default globalStyles;