import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoritIcon from '../../assets/images/icons/unfavorite.png';
import whattsAppIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
    id: number,
    avatar: string,
    bio: string,
    cost: number,
    name: string,
    subject: string,
    whatsapp: string,
}

interface TeacherItemProps {
    teacher: Teacher;
    //Tudo que precisa ser alterado, precisa estar no estado;
    //Princípio da Imutabilidade;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    //Toda info que pode mudar, precisa de um estado;
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsApp() {
        api.post('connections', {
            user_id: teacher.id
        });
        
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');

        //Pode ser que não tenha nenhum favorito inicialmente;
        let favoritesArray = [];

        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                //Varrendo todos os favoritos procurando qual a posição que o teacher está dentro do array;
                return teacherItem.id === teacher.id;
                //Retornado a posição do array que o mesmo se/foi encontrado
            });

            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);

        } else {
            favoritesArray.push(teacher);

            setIsFavorited(true);
        }

        //Converte devolta para String
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teacher.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>


                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}>
                        {isFavorited ?
                            <Image source={unfavoritIcon} /> :
                            <Image source={heartOutlineIcon} />
                        }

                    </RectButton>

                    <RectButton
                        onPress={handleLinkToWhatsApp}
                        style={styles.contactButton}>
                        <Image source={whattsAppIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;