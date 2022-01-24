import {StyleSheet} from 'react-native';
import {colors} from '../../../../utils';

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 25,
    left: 25,
  },
  button: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  rightMenu: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  bigButton: {
    backgroundColor: colors.orange,
    borderRadius: 50,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    backgroundColor: colors.orange,
    borderRadius: 50,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: colors.darkgrey,
    opacity: 0.5,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 70,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
  gameInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gameInfo: {
    color: colors.blue,
    fontSize: 23,
    fontWeight: 'bold',
  },
  scoreNumber: {
    fontSize: 150,
    fontWeight: 'bold',
    padding: 0,
    margin: 0,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameTimer: {
    fontSize: 20,
    marginLeft: 5,
  },
  numberContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    paddingVertical: 0,
    minWidth: 200,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',

    shadowColor: '#E8E8E8',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 7,
  },
  addPoint: {
    height: '50%',
    top: 0,
    zIndex: 10,
    width: '100%',
    position: 'absolute',
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  removePoint: {
    position: 'absolute',
    zIndex: 10,
    height: '50%',
    width: '100%',
    bottom: 0,
    borderTopColor: colors.gray,
    borderTopWidth: 1,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingBottom: 25,
    paddingTop: 10,
    width: '100%',

    shadowColor: '#E8E8E8',
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 70,
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
    borderRadius: 8,
    backgroundColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 13,
    margin: 20,
  },
  buttonTextToFile: {
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 5,
  },
  shareButton: {
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.orange,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 11,
    margin: 20,
  },
  buttonTextShare: {
    fontWeight: 'bold',
    color: colors.orange,
    marginLeft: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  portraitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRaquetContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  topRaquetContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default styles;
