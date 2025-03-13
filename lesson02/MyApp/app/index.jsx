import {View, Text,StyleSheet, ImageBackground, Pressable} from 'react-native'
import IcedCoffeeImg from "@/assets/images/iced-coffee.png"
import {Link} from 'expo-router'


const app = ()=>{
    return(
        <View style={styles.container}>

            <ImageBackground
                source={IcedCoffeeImg}
                resizeMode = 'cover'
                style={styles.image}
            >
                <Text style={styles.title}>Coffee Shop</Text>
                <Link href="/explore"
                      style={{marginHorizontal: ' auto'}}
                      asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Explore</Text>
                    </Pressable>
                </Link>
            </ImageBackground>

        </View>
    )
}




export default app


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
    },
    image:{
      width: '100%',
      height: '100%',
      flex:1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    title:{
        color:'white',
        backgroundColor: 'rgba(0,0,0,0.82)',
        fontSize: 42,
        fontWeight: 'condensedBold',
        textAlign: 'center',
        marginBottom:120,

    },
    button:{
        height: 60,
        borderRadius: 20,
        backgroundColor:'rgba(0,0,0,0.80)',
        padding: 6,
    },
    buttonText:{
        color:'white',
        fontSize: 16,
        fontWeight: 'condensedBold',
        textAlign: 'center',
        padding: 4,

    },
})