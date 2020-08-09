import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257E5',
        //verticalmente
        justifyContent: 'center',
        padding: 40,
    },
    banner: {
        width: '100%',
        //contain: deixar todo o conteúdo visível;
        //cover: corta em cima e embaixo para ajustar
        resizeMode: 'contain'
    },
    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#FFF',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80,
    },
    titleBold: {
        fontFamily: 'Poppins_600SemiBold'
    },

    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },
    button: {
        height: 130,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 20,
        justifyContent: 'space-between',
    },
    buttonPrimay: {
        backgroundColor: '#9871F5',
    },
    buttonSecondary: {
        backgroundColor: '#04D361',
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20,
    },
    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#D4C2FF',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40,
    },
});

export default styles;