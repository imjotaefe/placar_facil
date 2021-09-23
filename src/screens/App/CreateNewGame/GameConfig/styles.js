import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 25,
    paddingHorizontal: 35,
  },
  select: {
    color: 'black',
    backgroundColor: 'blue',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 70,
    marginTop: 30,
  },
});

export default styles;
