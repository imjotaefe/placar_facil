import {StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';
import {colors} from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    marginBottom: 50,
  },
  textCounter: {
    fontSize: 150,
    color: colors.darkgray,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 20,
    color: colors.darkgray,
    fontWeight: 'bold',
  },
});

export default styles;
