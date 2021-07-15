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
  textNameOrange: {
    color: colors.orange,
  },
  textNameBlue: {
    color: colors.blue,
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
  playerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  swapButton: {
    borderRadius: 8,
    backgroundColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 30,
    marginHorizontal: 60,
    zIndex: 50000,
  },
  buttonTextSwap: {
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 5,
  },
  table: {
    borderColor: colors.darkgray,
    borderWidth: 2,
    paddingVertical: 160,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalSeparator: {
    height: 2,
    backgroundColor: colors.gray,
    width: '100%',
    marginTop: -27,
  },
  verticalSeparator: {
    backgroundColor: colors.gray,
    width: 2,
    height: 346,
    position: 'absolute',
  },
  tableContainer: {
    flexDirection: 'row',
  },
  sideContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: -20,
  },
  textSide: {
    transform: [{rotate: '90deg'}],
  },
  startContainer: {
    width: '100%',
    position: 'absolute',
    top: 0,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  finishContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingRight: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default styles;
