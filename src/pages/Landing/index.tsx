import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Adaptar o efeito do click ao SO utilizado;
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import heartIcon from '../../assets/images/icons/heart.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';

function Landing() {
    const { navigate } = useNavigation();
    const [totalConnections, setTotalConnections] = useState(0);
    
    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        });
    }, []);


    function handleNavigationToGiveClassesPage() {
        navigate('GiveClasses');
    }

    function handleNavigationToStudyPages(){
        navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />

            {/* Única exceção de que o componente de dentro herda o style do que tá acima;*/}
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                {/* Dois estilos para o mesmo botão */}
                <RectButton
                    onPress={handleNavigationToStudyPages}
                    style={[styles.button, styles.buttonPrimay]}>
                    <Image source={studyIcon} />

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigationToGiveClassesPage}
                    style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon} />

                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon} />
            </Text>
        </View >
    );
}

export default Landing;