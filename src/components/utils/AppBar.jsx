import * as React from 'react';
import { Appbar } from 'react-native-paper';

import colors from '../../styles/Colors';

const AppBar = ({ title = '', back = false, navigation, search = false }) => {
  const _goBack = () => {
    navigation.goBack();
  }

  const _search = () => {
    navigation.navigate('Search');
  }

  return (
    <Appbar.Header style={{ backgroundColor: colors.primary }}>
      { back && <Appbar.BackAction onPress={_goBack} /> }
      <Appbar.Content title={title} />
      { search && <Appbar.Action icon='magnify' onPress={_search} /> }
    </Appbar.Header>
  );
}

export default AppBar;