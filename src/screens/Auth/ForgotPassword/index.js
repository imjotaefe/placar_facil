import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ErrorInput from '../../../components/ErrorInput';
import Logo from '../../../assets/icons/full_logo.svg';
import firebase from 'firebase';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import Back from '../../../assets/icons/back.svg';
import MessageModal from '../../../components/MessageModal';

const schema = yup.object().shape({
  email: yup.string().required('Campo Obrigatório').email('Email inválido'),
});

const ForgotPassword = ({navigation}) => {
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = data => {
    setLoading(true);
    const {email} = data;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setIsVisible(true);
        setLoading(true);
        setTimeout(() => {
          navigation.goBack();
        }, 5000);
        setError(false);
      })
      .catch(() => {
        setIsVisible(true);
        setLoading(false);
        setError(true);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        style={{marginTop: 20}}>
        <Back />
      </TouchableOpacity>
      <View style={styles.header}>
        <Logo />
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <Input
                onChangeText={text => onChange(text)}
                name="email"
                value={value}
                placeholder="usuário@placarFacil.com"
                label="E-mail"
                isEmail
              />
            )}
          />
          <ErrorInput error={errors?.email?.message} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
            label={loading ? 'CARREGANDO...' : 'ENVIAR'}
          />
        </View>
      </View>
      <MessageModal
        isvisible={isVisible}
        setIsVisible={setIsVisible}
        error={error}
      />
    </ScrollView>
  );
};

export default ForgotPassword;
