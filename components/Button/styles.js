import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orange,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default styles;
