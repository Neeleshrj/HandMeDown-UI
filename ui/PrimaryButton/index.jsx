import {TouchableOpacity, StyleSheet} from 'react-native';

export default function PrimaryButton({children, flex, borderRadius, styling, action, disabled}){
    return(
        <TouchableOpacity style={[styles.button,{flex: flex,borderRadius: borderRadius},styling]} onPress={action} disabled={disabled}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#F50057',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        elevation: 2,
    }
})