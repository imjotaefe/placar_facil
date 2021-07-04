import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Plus from '../../../../assets/icons/plus.svg';
import Back from '../../../../assets/icons/back.svg';
import Edit from '../../../../assets/icons/edit.svg';
import EditText from '../../../../assets/icons/editText.svg';
import Restart from '../../../../assets/icons/restart.svg';
import Results from '../../../../assets/icons/results.svg';
import SchareScreen from '../../../../assets/icons/shareScreen.svg';
import Settings from '../../../../assets/icons/settings.svg';
import LogOff from '../../../../assets/icons/logoff.svg';
import styles from './styles';

// import { Container } from './styles';

const DrawerContent = ({navigation}) => {
  const options = [
    {
      text: 'Nova Partida',
      icon: <Plus width={18} />,
      action: () => console.log('nova partida'),
    },
    {
      text: 'Reiniciar o placar',
      icon: <Restart width={18} />,
      action: () => console.log('reiniciar placar'),
    },
    {
      text: 'Ajustar o placar',
      icon: <Edit width={18} />,
      action: () => console.log('ajustar placar'),
    },
    {
      text: 'Alterar nomes',
      icon: <EditText width={18} />,
      action: () => console.log('alterar nomes'),
    },
    {
      text: 'Resultados Anteriores',
      icon: <Results width={18} />,
      action: () => console.log('resultados anteriores'),
    },
    {
      text: 'Transmitir placar',
      icon: <SchareScreen width={18} />,
      action: () => console.log('transmitir placar'),
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
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => console.log('configurações')}>
            <Settings />
            <Text style={styles.text}>Configurações</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => console.log('sair')}>
            <LogOff />
            <Text style={styles.logoff}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DrawerContent;
