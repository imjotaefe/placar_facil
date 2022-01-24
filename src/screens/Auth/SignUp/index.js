import React, {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import ErrorInput from '../../../components/ErrorInput';
import LeftArrow from '../../../assets/icons/left_arrow.svg';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import firebase from 'firebase';
import {useDispatch} from 'react-redux';
import {Creators as AuthActions} from '../../../store/ducks/auth';

const schema = yup.object().shape({
  email: yup.string(),
  password: yup.string(),
  confirm_password: yup.string(),
});

const SignUp = ({navigation}) => {
  const dispatch = useDispatch();
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

  const onSubmit = async values => {
    setLoading(true);
    const {email, password, name} = values;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => user.user.updateProfile({displayName: name}))
      .catch(() => 'deu problema na criação');

    const user = firebase.auth().currentUser;
    dispatch(AuthActions.authSuccess(user));
    setLoading(false);
  };
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
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <Input
                onChangeText={text => onChange(text)}
                name="name"
                value={value}
                placeholder="Digite um nome"
                label="Nome"
              />
            )}
          />
          <ErrorInput error={errors?.name?.message} />
        </View>
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
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="confirm_password"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="123!@Abc"
                onChangeText={text => onChange(text)}
                value={value}
                label="Confirmação de Senha"
                isPassword
                name="confirm_password"
              />
            )}
          />
          <ErrorInput error={errors?.confirm_password?.message} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label={loading ? 'CARREGANDO...' : 'CADASTRAR'}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
