import { Text, TextInput, Pressable, View, StyleSheet, FlatList} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {data} from "@/data/todos";
import {useState} from "react";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Index() {
    const [todos,setTodos] =  useState(data.sort((a,b)=>b.id-a.id))
    const [text, setText]  = useState("")
 //CRUD

    //Create
    const addTodo = ()=> {
        if(text.trim()){
            const newId = todos.length>0? todos[0].id+1: 1;
            setTodos([{id:newId, title:text,completed:false}, ...todos])
            setText('')
        }
    }
    //Update
    // @ts-ignore
    const toggleTodo=(id)=>{
        setTodos(todos.map(todo => todo.id === id? {...todo, completed:!todo.completed}:todo))
    }

    // @ts-ignore
    const removeTodo=(id)=>{
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
                <MaterialIcons name="delete-outline" size={24} color="black"  selectable={undefined}/>
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
          </View>
          <FlatList
              data={todos}
              // @ts-ignore
              keyExtractor={todo=>todo.id}
              renderItem={renderitem}
              contentContainerStyle={{flexGrow:1}}

          />
      </SafeAreaView>
  );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
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
        color:'gray',

    },
    addButton:{
        backgroundColor:'#7DA0CA',

        borderRadius:12,
        padding:20,
        marginLeft:20,
    },
    addButtonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20,
        fontFamily:'Arial',
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
      fontFamily:'Arial',
      color:'black',
    },
    completedText:{
        textDecorationLine:'line-through',
        color:'#7DA0CA',
        opacity:0.5,
    }

})
