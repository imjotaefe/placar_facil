import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingTop: 20,
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 35,
    paddingTop: 20,
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textHeaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
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
  optionContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 10,
    marginVertical: 20,
  },
  option: {
    fontWeight: 'bold',
  },
  gameButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  gameButton: {
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 18,
    marginHorizontal: 8,
    marginVertical: 8,
    minWidth: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameButtonText: {
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
});

export default styles;
