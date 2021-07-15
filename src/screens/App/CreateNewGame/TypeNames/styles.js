import {StyleSheet} from 'react-native';
import {StatusBar} from 'react-native';
import {colors} from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 35,
    paddingTop: StatusBar.currentHeight + 10,
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -23,
    marginBottom: 60,
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 22,
    color: colors.red,
  },
  buttonContainer: {
    marginTop: 40,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.darkgray,
  },
  orText: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 30,
  },
});

export default styles;
