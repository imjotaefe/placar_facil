import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Plus from '../../../../assets/icons/plus.svg';
import Back from '../../../../assets/icons/back.svg';
import EditText from '../../../../assets/icons/editText.svg';
import Restart from '../../../../assets/icons/restart.svg';
import styles from './styles';

const ScoreDrawerContent = ({navigation}) => {
  const options = [
    {
      text: 'Nova Partida',
      icon: <Plus width={18} />,
      action: () => navigation.navigate('ChooseType'),
    },
    {
      text: 'Reiniciar o placar',
      icon: <Restart width={18} />,
      action: () => console.log('reiniciar placar'),
    },

    {
      text: 'Alterar nomes',
      icon: <EditText width={18} />,
      action: () => console.log('alterar nomes'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.closeDrawer()}>
        <Back />
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <View style={styles.optionsContainer}>
          {options.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => item.action()}>
                {item.icon}
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ScoreDrawerContent;