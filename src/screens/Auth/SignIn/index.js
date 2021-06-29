import React, {useEffect} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Button, Input, ErrorInput} from '../../../components';
import Logo from '../../../assets/icons/full_logo.svg';
import firebase from 'firebase';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

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

  useEffect(() => {
    var firebaseConfig = {
      apiKey: 'AIzaSyDFTDWhnChN4g4clObbiLXzr6Pxy4CdxWU',
      authDomain: 'placar-facil.firebaseapp.com',
      databaseURL: 'https://placar-facil-default-rtdb.firebaseio.com',
      projectId: 'placar-facil',
      storageBucket: 'placar-facil.appspot.com',
      messagingSenderId: '411932128819',
      appId: '1:411932128819:web:59168758eb718e43ea1546',
      measurementId: 'G-4TMQXJHJCS',
    };
    firebase.initializeApp(firebaseConfig);
  }, []);

  const onSubmit = data => {
    const {email, password} = data;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => console.log('logado', user))
      .catch(error => console.log('deu ruim', error));
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
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={handleSubmit(onSubmit)} label="ENTRAR" />
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
