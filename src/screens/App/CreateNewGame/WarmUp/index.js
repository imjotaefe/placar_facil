import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import Button from './../../../../components/Button/index';
import {colors} from '../../../../utils';
import ImageTenis from '../../../../assets/images/tableTenis.jpg';
import JumpTime from './../../../../components/JumpTime/index';

const WarmUp = ({navigation, route}) => {
  const {warmUp} = route.params;
  const [warmUpTime, setWarmUpTime] = useState(warmUp);
  const [started, setStarted] = useState(false);
  const [jump, setJump] = useState(false);

  useEffect(() => {
    if (started && warmUpTime > 0 && !jump) {
      setTimeout(() => setWarmUpTime(warmUpTime - 1), 1000);
    }
  }, [warmUpTime, started, jump]);

  const handleRender = () => {
    if (warmUpTime === 0 || jump) {
      return (
        <View>
          <Image source={ImageTenis} style={styles.imageStyle} />
          <Button
            onPress={() => {
              navigation.navigate('ScoreBoard', {
                screen: 'ScoreBoard',
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
          <JumpTime
            action={() => {
              setJump(true);
            }}
          />
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
