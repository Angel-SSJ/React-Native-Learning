import { Text, TextInput, Pressable, View, StyleSheet, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {data} from "@/data/todos";
import {useState,useContext, useEffect} from "react";
import {ThemeContext} from "@/context/ThemeContext";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Inter_500Medium,useFonts} from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import Animated, {LinearTransition} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StatusBar} from "expo-status-bar";

export default function Index() {
    const [todos,setTodos] =  useState([])
    const [text, setText]  = useState("")
    // @ts-ignore
    const {colorScheme,setColorScheme,theme} = useContext(ThemeContext)
    const [loaded,error]=useFonts({Inter_500Medium})

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const jsonValue= await AsyncStorage.getItem('TodoApp')
                const storageTodos = jsonValue!=null?JSON.parse(jsonValue):null
                if(storageTodos && storageTodos.length){
                    // @ts-ignore
                    setTodos(storageTodos.sort((a,b)=>b.id-a.id))
                }else{
                    // @ts-ignore
                    setTodos(data.sort((a,b)=>b.id-a.id))
                }
            } catch(e){
                console.error(e)
            }
        }
        fetchData()
    }, [data])

    useEffect(() => {
        const storeData=async ()=>{
            try{
                const jsonValue= JSON.stringify(todos)
                await AsyncStorage.setItem('TodoApp', jsonValue)
            }catch(e){
                console.error(e)
            }
        }
        storeData()
    }, [todos]);

    if(!loaded && !error){
        return null
    }

    const styles=createStyles(theme,colorScheme)

 //CRUD

    //Create
    const addTodo = ()=> {
        if(text.trim()){
            // @ts-ignore
            const newId = todos.length>0? todos[0].id+1: 1;
            // @ts-ignore
            setTodos([{id:newId, title:text,completed:false}, ...todos])
            setText('')
        }
    }
    //Update
    // @ts-ignore
    const toggleTodo=(id)=>{
        // @ts-ignore
        setTodos(todos.map(todo => todo.id === id? {...todo, completed:!todo.completed}:todo))
    }

    // @ts-ignore
    const removeTodo=(id)=>{
        // @ts-ignore
        setTodos(todos.filter(todo=>todo.id!==id))

    }

    // @ts-ignore
    const renderitem=({item})=>(
        <View style={styles.todoItem}>
            <Text style={[styles.todoText, item.completed && styles.completedText]}
            onPress={()=>toggleTodo(item.id)}
            >{item.title}
            </Text>
            <Pressable onPress={()=>removeTodo(item.id)}>
                <MaterialIcons name="delete-outline" size={24} color='#7DA0CA'  selectable={undefined}/>
            </Pressable>
        </View>
    )
  // @ts-ignore
    // @ts-ignore
    return (
      <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
            style={styles.input}
            placeholder="Add a new todo"
            placeholderTextColor="gray"
            value={text}
            onChangeText={setText}
            />
            <Pressable onPress={addTodo} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
              <Pressable
              onPress={()=>setColorScheme(colorScheme==='light'?'dark':'light')}
              style={{marginLeft:20}}>
                  {colorScheme==='dark'
                      ?<Octicons name='moon' size={36} color={theme.text} selectable={undefined} style={{width: 36}}/>
                      :<Octicons name='sun' size={36} color={theme.text} selectable={undefined} style={{width: 36}}/>
                  }
              </Pressable>
          </View>
          <Animated.FlatList
              data={todos}
              // @ts-ignore
              keyExtractor={todo=>todo.id}
              renderItem={renderitem}
              contentContainerStyle={{flexGrow:1}}
              itemLayoutAnimation={LinearTransition}
              keyboardDismissMode="on-drag"
          />
          <StatusBar style={colorScheme ==='dark'?'light':'dark'}/>
      </SafeAreaView>
  );
}

// @ts-ignore
function createStyles(theme,colorScheme){
return StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:theme.background,
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
        padding:10,
        width:'100%',
        maxWidth:1024,
        marginHorizontal:'auto',
        pointerEvents:'auto',
    },
    input:{
        fontFamily:'Inter_500Medium',
        shadowColor:'#7DA0CA',
        shadowOpacity:0.5,
        shadowOffset:{width:5,height:5},
         flex:1,
        borderColor:'black',
        borderRadius:12,
        padding:14,
        marginRight:10,
        fontSize:20,
        minWidth:0,
        color:theme.text,

    },
    addButton:{
        backgroundColor:theme.button,
        borderRadius:12,
        padding:20,
        marginLeft:20,
    },
    addButtonText:{
        color:colorScheme==='dark'?'black':'white',
        fontWeight:'bold',
        fontSize:20,
        fontFamily:'Inter_500Medium',
    },
    todoItem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        gap:4,
        padding:20,
        borderBottomColor:'#7DA0CA',
        borderBottomWidth:1,
        width:'100%',
        maxWidth:1024,
        marginHorizontal:'auto',
        pointerEvents:'auto',
    },
    todoText:{
      flex:1,
      fontSize:20,
      fontFamily:'Inter_500Medium',
      color:theme.text,
    },
    completedText:{
        textDecorationLine:'line-through',
        color:'#7DA0CA',
        opacity:0.5,
        fontFamily:'Inter_500Medium',
    }
})
}