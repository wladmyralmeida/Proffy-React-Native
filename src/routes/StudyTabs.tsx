import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//Padrão de ìcones já pronto conforme as tabs aceitam;
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator tabBarOptions={{
            style: {
                elevation: 0,
                shadowOpacity: 0,
                height: Platform.OS === 'ios' ? 84 : 64,
            },
            tabStyle: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: Platform.OS === 'ios' ? 20 : 0,
            },
            iconStyle: {
                flex: 0,
                width: 20,
                height: Platform.OS === 'ios' ? 24 : 20,
            },
            labelStyle: {
                fontFamily: 'Archivo_700Bold',
                fontSize: 13,
                marginLeft: 16,
            },
            inactiveBackgroundColor: '#FAFAFC',
            activeBackgroundColor: '#EBEBF5',
            inactiveTintColor: '#C1BCCC',
            activeTintColor: '#32264D',
            safeAreaInsets: {
                bottom: 0,
            }
        }}>
            <Screen
                name="TeacherList"
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys', 
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
            <Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos', 
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    )
}

export default StudyTabs;