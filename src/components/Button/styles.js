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
    marginBottom: 20,
    marginHorizontal: 9,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  disabledContainer: {
    backgroundColor: colors.gray,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 50,
    paddingVertical: 15,
  },
  disabledText: {
    fontWeight: 'bold',
  },
});

export default styles;
