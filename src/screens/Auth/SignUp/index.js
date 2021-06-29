import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button, Input} from '../../../components';
import LeftArrow from '../../../assets/icons/left_arrow.svg';

const SignUp = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrow />
          </TouchableOpacity>
          <View style={styles.textHeaderContainer}>
            <Text style={styles.title}>CADASTRE-SE</Text>
          </View>
          <View style={styles.emptyContainer} />
        </View>
        <View>
          <Text style={styles.informartion}>
            Lorem Ipsum is simply dummy text of the printing and typesetting the
            printing and typesetting the pri.
          </Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Input placeholder="Digite um nome" label="Nome" />
        </View>
        <View style={styles.inputContainer}>
          <Input placeholder="usuário@placarFacil.com" label="E-mail" isEmail />
        </View>
        <View style={styles.inputContainer}>
          <Input placeholder="123!@Abc" label="Senha" isPassword />
        </View>
        <View style={styles.inputContainer}>
          <Input placeholder="123!@Abc" label="Confirme a senha" isPassword />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="CADASTRAR" />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
