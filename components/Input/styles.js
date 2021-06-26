import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.gray,
    borderWidth: 2,
    height: 50,
    fontWeight: 'bold',
    color: colors.dark,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingRight: 40,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
  },
  icon: {
    position: 'absolute',
    right: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
