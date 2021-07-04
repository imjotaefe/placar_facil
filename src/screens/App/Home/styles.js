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
  modal: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingBottom: 25,
    paddingTop: 10,
  },
  closeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalText: {
    color: colors.darkgray,
    marginTop: 5,
  },
  tofileButton: {
    marginTop: 35,
    borderRadius: 8,
    backgroundColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 13,
  },
  buttonTextToFile: {
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 5,
  },
  shareButton: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 11,
  },
  buttonTextShare: {
    fontWeight: 'bold',
    color: colors.orange,
    marginLeft: 5,
  },
});

export default styles;
