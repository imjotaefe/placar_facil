import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import Calender from '../../assets/icons/calendar.svg';
import Timer from '../../assets/icons/timer.svg';
import PlayerOne from '../../assets/icons/player_1.svg';
import PlayerTwo from '../../assets/icons/player_2.svg';
import VerticalDots from '../../assets/icons/verticalDots.svg';
import dayjs from 'dayjs';
import Modal from 'react-native-modal';
import Close from '../../assets/icons/close.svg';
import Share from '../../assets/icons/share.svg';
import styles from './styles';
import {colors} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {Creators as ScoreBoardActions} from '../../store/ducks/scoreBoard';
import {Creators as EmailActions} from '../../store/ducks/email';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../../assets/lottie/loadingBall.json';
import CheckAnimation from '../../assets/lottie/check.json';
import ErrorAnimation from '../../assets/lottie/error.json';
import Input from './../Input';
import * as yup from 'yup';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import ErrorInput from './../ErrorInput/index';

const schema = yup.object().shape({
  email: yup.string().required('Campo Obrigatório'),
});

const HistoryCard = ({game, gameId, navigation}) => {
  const {gameType, rightPlayers, leftPlayers, sumula} = game;
  const dispatch = useDispatch();
  const [modalisVisible, setModalIsVisible] = useState(false);
  const startGame = dayjs(sumula?.gameStartAt)
    .subtract(3, 'hours')
    .format('HH:mm');
  const endGame = dayjs(sumula?.gameFinishAt)
    .subtract(3, 'hours')
    .format('HH:mm');
  const dateGame = dayjs(sumula?.gameStartAt)
    .subtract(3, 'hours')
    .format('DD/MM/YYYY');
  const {emailLoading, emailSuccess, emailError} = useSelector(
    ({email}) => email,
  );

  const {
    handleSubmit,
    formState: {errors},
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {email: ''},
  });

  useEffect(() => {
    dispatch(EmailActions.resetEmail());
    reset();
  }, [dispatch]);

  const onSubmit = data => {
    dispatch(EmailActions.sendEmail({game, data}));
    reset();
  };

  const renderEmailContent = () => {
    return (
      <>
        <View style={styles.emailContent}>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({field: {onChange, value}}) => (
              <Input
                onChangeText={text => onChange(text)}
                name={'email'}
                value={value}
                placeholder="Ex: placarfacil@email.com"
                label={'Email'}
                isEmail
              />
            )}
          />
          <ErrorInput error={errors?.email?.message} />
        </View>
        <TouchableOpacity
          style={styles.shareButton}
          disabled={emailLoading}
          onPress={handleSubmit(onSubmit)}>
          {emailLoading ? (
            <LottieView
              source={LoadingAnimation}
              autoPlay
              loop
              style={{width: 25, height: 25}}
            />
          ) : (
            <>
              <Share />
              <Text style={styles.buttonTextShare}>EXPORTAR</Text>
            </>
          )}
        </TouchableOpacity>
      </>
    );
  };

  const renderContentModal = () => {
    if (!game.gameFinished) {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.modalTitle}>Deseja continuar esta partida?</Text>
          <TouchableOpacity
            style={styles.tofileButton}
            onPress={() => {
              dispatch(ScoreBoardActions.setGameId(gameId));
              navigation.navigate('ScoreBoard', {
                screen: 'ScoreBoard',
              });
            }}>
            <Text style={styles.buttonTextToFile}>CONTINUAR</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (emailSuccess) {
      return (
        <View style={styles.contentContainer}>
          <LottieView
            source={CheckAnimation}
            autoPlay
            loop={false}
            style={{width: 100, height: 100}}
          />
          <Text style={styles.modalText}>E-mail enviado</Text>
        </View>
      );
    }
    if (emailError) {
      return (
        <View style={styles.contentContainer}>
          <LottieView
            source={ErrorAnimation}
            autoPlay
            loop={false}
            style={{width: 200, height: 200}}
          />
          <Text style={styles.modalText}>Seu e-mail não foi enviado.</Text>
          <Text style={styles.modalText}>Tente novamente!</Text>
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <Text style={styles.modalTitle}>Deseja exportar essa partida?</Text>
        <Text style={styles.modalText}>
          Isto criará uma cópia da súmula e irá enviá-la para o e-mail abaixo.
        </Text>

        {renderEmailContent()}
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal isVisible={modalisVisible}>
        <View style={styles.modal}>
          <View style={styles.closeContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setModalIsVisible(false);
                dispatch(EmailActions.resetEmail());
                reset();
              }}>
              <Close />
            </TouchableOpacity>
          </View>
          {renderContentModal()}
        </View>
      </Modal>
    );
  };

  const renderPlayerOne = () => {
    return (
      <View style={styles.pairOne}>
        <View style={styles.player}>
          <PlayerOne />
          <Text style={styles.name}>{leftPlayers?.player1}</Text>
        </View>
        {gameType === 'pair' && (
          <>
            <View style={styles.separatorOne} />
            <View style={styles.player}>
              <PlayerOne />
              <Text style={styles.name}>{leftPlayers?.player2}</Text>
            </View>
          </>
        )}
      </View>
    );
  };

  const renderPlayerTwo = () => {
    return (
      <View style={styles.pairTwo}>
        <View style={styles.player}>
          <Text style={styles.name}>{rightPlayers?.player1}</Text>
          <PlayerTwo />
        </View>
        {gameType === 'pair' && (
          <>
            <View style={styles.separatorContainer}>
              <View style={styles.separatorTwo} />
            </View>
            <View style={styles.player}>
              <Text style={styles.name}>{rightPlayers?.player2}</Text>
              <PlayerTwo />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('Sumula', {
          gameId,
        })
      }>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              gameType === 'pair' ? colors.weakBlue : colors.weakOrange,
          },
        ]}>
        <View style={styles.top}>
          <View style={styles.date}>
            <Calender />
            <Text style={styles.textDate}>{dateGame || '00/00/0000'}</Text>
            <Timer style={styles.timer} />
            <Text style={styles.textDate}>
              {startGame || '00:00'} -{' '}
              {startGame === endGame ? 'XX:XX' : endGame || '00:00'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalIsVisible(true);
            }}>
            <View style={styles.verticalDots}>
              <VerticalDots />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.playersContainer}>
          {renderPlayerOne()}
          <Text style={styles.score}>
            {leftPlayers?.finalGame} X {rightPlayers?.finalGame}
          </Text>
          {renderPlayerTwo()}
        </View>
        {renderModal()}
      </View>
    </TouchableOpacity>
  );
};

export default HistoryCard;
