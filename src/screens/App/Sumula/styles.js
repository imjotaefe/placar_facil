import {StyleSheet} from 'react-native';
import {colors} from '../../../utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 35,
    paddingTop: 20,
    flex: 1,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    backgroundColor: 'blue',
    width: 10.9,
  },
  gameButtonContainer: {
    paddingVertical: 10,
  },
  gameButton: {
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginHorizontal: 8,
    minWidth: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameButtonText: {
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  pointContainer: {
    backgroundColor: colors.weakBlue,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  pointTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointTextLeft: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.blue,
  },
  pointTextRight: {
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.orange,
  },
  pointTextX: {
    fontWeight: 'bold',
    color: colors.dark,
    fontSize: 10,
  },
  pointTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pointTimeText: {
    fontWeight: 'bold',
    color: colors.darkgray,
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  playersTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  players: {
    margin: 10,
  },
  playerText: {
    fontWeight: 'bold',
  },
  selectGame: {
    fontWeight: 'bold',
    color: colors.darkgray,
    marginBottom: 10,
  },
});

export default styles;
