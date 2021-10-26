import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 15,
    flex: 1,
  },
  backContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 35,
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  optionsContainer: {},
  separator: {
    height: 1,
    width: '100%',
    opacity: 0.5,
    alignSelf: 'center',
    backgroundColor: colors.gray,
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  settingsContainer: {
    marginBottom: 30,
    paddingLeft: 35,
  },
  logoff: {
    color: colors.red,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default styles;
