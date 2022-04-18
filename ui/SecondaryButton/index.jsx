import {TouchableOpacity, StyleSheet} from 'react-native';

export default function SecondaryButton({children, borderRadius, flex, action, styling}){
    return(
        <TouchableOpacity style={[styles.button,{flex: flex,borderRadius: borderRadius},styling]} onPress={action}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 32,
        borderColor: '#F50057',
        borderWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        elevation: 2,
        margin: '1%',
    }
})