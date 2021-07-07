import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 25,
    paddingHorizontal: 35,
    flex: 1,
  },
  card: {
    borderWidth: 2,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 25,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.darkgray,
  },
  title: {
    marginBottom: 30,
    fontSize: 16,
  },
  vsText: {
    marginTop: -10,
  },
  orText: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 30,
  },
  selectedBlueCard: {
    borderWidth: 2,
    borderColor: colors.blue,
  },
  selectedOrangeCard: {
    borderWidth: 2,
    borderColor: colors.orange,
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
  backButton: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 65,
  },
});

export default styles;
