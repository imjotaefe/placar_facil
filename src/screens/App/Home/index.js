import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Search from '../../../assets/icons/search.svg';
import Hamburguer from '../../../assets/icons/hamb.svg';
import Logo from '../../../assets/icons/logo.svg';
import styles from './styles';
import HistoryCard from '../../../components/HistoryCard';
import Button from '../../../components/Button';
import Modal from 'react-native-modal';
import Close from '../../../assets/icons/close.svg';
import Share from '../../../assets/icons/share.svg';
import ToFile from '../../../assets/icons/toFile.svg';
import {database, auth} from '../../../service/firebase';

const Home = ({navigation}) => {
  const [modalisVisible, setModalIsVisible] = useState(false);
  const [games, setGames] = useState();

  useEffect(() => {
    const {currentUser} = auth;
    console.log(currentUser.uid);
    database.ref(`/umpires/${currentUser.uid}`).on('value', snapshot => {
      console.log('testessdfsdf', snapshot.val());
    });
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity>
          <Search />
        </TouchableOpacity>
        <Logo />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Hamburguer />
        </TouchableOpacity>
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
              onPress={() => setModalIsVisible(false)}>
              <Close />
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.modalTitle}>O QUE DESEJA FAZER?</Text>
            <Text style={styles.modalText}>Lorem ipsum dolor sit</Text>
            <TouchableOpacity style={styles.tofileButton}>
              <ToFile />
              <Text style={styles.buttonTextToFile}>ARQUIVAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareButton}>
              <Share />
              <Text style={styles.buttonTextShare}>EXPORTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {console.log(games)}
      <View style={styles.historyContainer}>
        <Text style={styles.title}>Histórico de Partidas</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flat}
          data={[{}, {}, {}, {}, {}, {}, {}]}
          renderItem={({item, index}) => {
            return index === 6 ? (
              <View style={styles.spacer} />
            ) : (
              <HistoryCard isPair setModalIsVisible={setModalIsVisible} />
            );
          }}
        />
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <View style={styles.centerButton}>
            <Button
              label="NOVA PARTIDA"
              elevation
              onPress={() => navigation.navigate('ChooseType')}
            />
          </View>
        </View>
      </View>
      {renderModal()}
    </View>
  );
};

export default Home;
