import {View,StyleSheet} from 'react-native';

export default function Card({children,styling}){
    return(
        <View style={[styles.container,styling]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        backgroundColor: "#fff",
    }
})