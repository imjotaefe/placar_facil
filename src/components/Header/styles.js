import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 60,
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.red,
  },
});

export default styles;
