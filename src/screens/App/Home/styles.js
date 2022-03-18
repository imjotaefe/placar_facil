import {StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';
import {colors} from '../../../utils';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingTop: 40,
  },
  unfinishedGame: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    paddingTop: 40,
  },
  title: {
    color: colors.red,
    fontSize: 22,
    fontWeight: 'bold',
  },
  flat: {
    marginVertical: 20,
    flex: 1,
    width: '100%',
  },
  spacer: {
    height: 100,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  centerButton: {},
  switchButtonContainer: {
    flexDirection: 'row',
  },
  switchButton: {
    padding: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 5,
    marginTop: 10,
  },
  emptyList: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.darkgray,
  },
});

export default styles;
