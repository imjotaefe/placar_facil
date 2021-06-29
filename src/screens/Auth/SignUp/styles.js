import {StyleSheet} from 'react-native';
import {colors} from '../../../utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 35,
  },
  inputContainer: {
    marginVertical: 11,
  },
  buttonContainer: {
    marginTop: 40,
  },
  informartion: {
    color: colors.darkgray,
    textAlign: 'center',
    marginTop: 15,
  },
  form: {
    marginTop: 30,
  },
  title: {
    color: colors.red,
    fontWeight: 'bold',
    fontSize: 18,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    backgroundColor: 'blue',
    width: 10.9,
  },
});

export default styles;
