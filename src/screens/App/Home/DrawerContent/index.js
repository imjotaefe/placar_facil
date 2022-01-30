import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Plus from '../../../../assets/icons/plus.svg';
import Back from '../../../../assets/icons/back.svg';
import LogOff from '../../../../assets/icons/logoff.svg';
import styles from './styles';
import {Creators as AuthActions} from '../../../../store/ducks/auth';
import {useDispatch} from 'react-redux';
// import firebase from 'firebase';

const DrawerContent = ({navigation}) => {
  const dispatch = useDispatch();
  const options = [
    {
      text: 'Nova Partida',
      icon: <Plus width={18} />,
      action: () => navigation.navigate('ChooseType'),
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.closeDrawer()}>
        <Back />
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View style={styles.optionsContainer}>
          {options.map(item => (
            <>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => item.action()}>
                {item.icon}
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
            </>
          ))}
        </View>
        <View style={styles.settingsContainer}>
          {/* <TouchableOpacity
            style={styles.backContainer}
            onPress={() => console.log('configurações')}>
            <Settings />
            <Text style={styles.text}>Configurações</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => {
              console.log('teste');
              // firebase
              //   .auth()
              //   .signOut()
              //   .then(() => dispatch(AuthActions.authSuccess(null)));
              // navigation.navigate('SignIn');
            }}>
            <LogOff />
            <Text style={styles.logoff}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DrawerContent;
