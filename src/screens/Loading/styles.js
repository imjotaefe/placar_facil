import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  loadingText: {
    color: colors.darkgray,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
