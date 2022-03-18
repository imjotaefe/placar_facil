import React, {useEffect, useRef, useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {Creators as AuthActions} from '../../../store/ducks/auth';
import {Snackbar} from 'react-native-paper';
import colors from './../../../utils/colors';

const schema = yup.object().shape({
  email: yup.string().required('Campo Obrigatório').email('Email inválido'),
  password: yup
    .string()
    .required('Campo Obrigatório')
    .min(8, 'Senha deve conter ao menos 8 caracteres'),
});

const SignIn = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const [snack, setSnack] = useState({
    text: '',
    color: '',
  });
  const [snackIsVisible, setSnackIsVisible] = useState(false);

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
      .catch(error => {
        console.log('error', error);
        setSnack({
          text: 'Erro ao autenticar usuário',
          color: colors.red,
        });
        setSnackIsVisible(true);
        dispatch(AuthActions.authError('Erro ao autenticar usuário'));
        setLoading(false);
      });
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
      <Snackbar
        visible={snackIsVisible}
        onDismiss={() => {
          setSnack({
            text: '',
            color: '',
          });
          setSnackIsVisible(false);
        }}
        style={{backgroundColor: snack.color, elevation: 1}}
        action={{
          label: 'Fechar',
          onPress: () => {
            setSnack({
              text: '',
              color: '',
            });
            setSnackIsVisible(false);
          },
        }}>
        {snack.text}
      </Snackbar>
    </ScrollView>
  );
};

export default SignIn;
