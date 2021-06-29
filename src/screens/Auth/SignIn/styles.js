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
    marginTop: 70,
  },
  createAccount: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  createAccountContainer: {
    marginTop: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotPassword: {
    color: colors.darkgray,
    textDecorationLine: 'underline',
  },
  forgotContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
