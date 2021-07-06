import {StyleSheet} from 'react-native';
import {colors} from '../../utils';

const styles = StyleSheet.create({
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
});

export default styles;
