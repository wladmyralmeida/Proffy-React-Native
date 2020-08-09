import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                //No banco Async do RN vem em formato de texto, aí pra converter de volta pra um array, faz o parse;
                const favoritedTeachers = JSON.parse(response);
                //Facilicar a busca pelo usuário já favoritado
                const favoritedTechersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTechersIds);
            }
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    })

    async function handleFiltersSubmit() {
        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });

        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys Disponíveis"
                headerRight={(
                    <BorderlessButton
                        onPress={handleToggleFiltersVisible}>
                        <Feather
                            name="filter"
                            size={20}
                            color='#FFF'
                        />
                    </BorderlessButton>)
                }>
                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#C1BCCC"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#C1BCCC"
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#C1BCCC"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton
                            style={styles.submitButton}
                            onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>

                        </RectButton>

                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => <TeacherItem
                    key={teacher.id}
                    teacher={teacher}
                    favorited={favorites.includes(teacher.id)}
                />)}
            </ScrollView>
        </View>
    );
}

export default TeacherList;