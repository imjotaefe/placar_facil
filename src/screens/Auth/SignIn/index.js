import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {Creators as AuthActions} from '../../../store/ducks/auth';

const schema = yup.object().shape({
  email: yup.string().required('Campo Obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Campo Obrigatório')
    .min(8, 'Senha deve conter ao menos 8 caracteres'),
});

const SignIn = ({navigation}) => {
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const onSubmit = data => {
    setLoading(true);
    const {email, password} = data;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(AuthActions.authSuccess(user));
        setLoading(false);
      })
      .catch(error =>
        dispatch(AuthActions.authError('Erro ao autenticar usuário')),
      );
  };

  return (
    <ScrollView style={styles.container}>
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
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="123!@Abc"
                onChangeText={text => onChange(text)}
                value={value}
                label="Senha"
                isPassword
                name="password"
              />
            )}
          />
          <ErrorInput error={errors?.password?.message} />
        </View>
        <View style={styles.forgotContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={loading}
            onPress={handleSubmit(onSubmit)}
            label={loading ? 'CARREGANDO...' : 'ENTRAR'}
          />
        </View>
      </View>
      <View style={styles.createAccountContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.createAccount}>Não possuo uma conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;
