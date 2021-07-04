import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const styles = StyleSheet.create({
  container: {
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 8,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  verticalDots: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    marginLeft: 10,
  },
  textDate: {
    color: colors.darkgray,
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    alignItems: 'center',
  },
  score: {
    fontWeight: 'bold',
  },
  player: {
    flexDirection: 'row',
  },
  name: {
    marginHorizontal: 6,
    padding: 0,
    marginTop: -2,
  },
  separatorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  separatorOne: {
    width: 2,
    height: 10,
    marginLeft: 6,
    backgroundColor: colors.blue,
    marginVertical: 2,
    marginTop: -1,
  },
  separatorTwo: {
    width: 2,
    height: 10,
    marginRight: 6,
    backgroundColor: colors.orange,
    marginVertical: 2,
    marginTop: -1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
