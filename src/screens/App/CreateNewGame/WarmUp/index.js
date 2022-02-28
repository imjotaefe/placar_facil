import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import styles from './styles';
import Button from './../../../../components/Button/index';
import {colors} from '../../../../utils';
import ImageTenis from '../../../../assets/images/tableTenis.jpg';

const WarmUp = ({navigation, route}) => {
  const {warmUp, gameId} = route.params;
  const [warmUpTime, setWarmUpTime] = useState(warmUp);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started && warmUpTime > 0) {
      setTimeout(() => setWarmUpTime(warmUpTime - 1), 1000);
    }
  }, [warmUpTime, started]);

  const handleRender = () => {
    if (warmUpTime === 0) {
      return (
        <View>
          <Image source={ImageTenis} style={styles.imageStyle} />
          <Button
            onPress={() => {
              navigation.navigate('ScoreBoard', {
                screen: 'ScoreBoard',
                params: {gameId},
              });
            }}
            label="COMEÇAR JOGO"
            backgroundColor={colors.blue}
            color={colors.white}
          />
        </View>
      );
    }
    if (started) {
      return (
        <>
          <Text style={styles.textCounter}>{warmUpTime}</Text>
          <Text style={styles.label}>Aquecimento</Text>
        </>
      );
    } else {
      return (
        <View>
          <Image source={ImageTenis} style={styles.imageStyle} />
          <Button
            onPress={() => setStarted(true)}
            label="INICIAR AQUECIMENTO"
            backgroundColor={colors.blue}
            color={colors.white}
          />
        </View>
      );
    }
  };

  return <View style={styles.container}>{handleRender()}</View>;
};

export default WarmUp;
