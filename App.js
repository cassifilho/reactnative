import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import React, { useState, useCallback, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false); 
  const [input, setInput] = useState('');

  useEffect(() =>{

    async function loadTask(){
      const taskStorage = await AsyncStorage.getItem('@task');


      if(taskStorage)
        setTask(JSON.parse(taskStorage))
    }


    loadTask();
  }, [])

  useEffect(() => {


  }, [task])

  function handleAdd(){
    if(input === '') return;
    const data = {
      key:input,
      task: input
    };
    setTask([...task,data])
    setOpen(false);
    setInput('');
  }

  const handleDelete = useCallback((key) => {
    const find = task.filter(r => r.key !== key);
    setTask(find);
  }, [task]); 
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#008cff" barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.title}>Meus tweets</Text>
      </View>

   

      <FlatList
        marginHorizontal={10}
        showsHorizontalScrollIndicator={false}
        data={task}
        keyExtractor={(item) => String(item.key)}
        renderItem={ ({ item }) => <TaskList data={item} handleDelete={() => handleDelete(item.key)} /> }

      />

<Modal animationType="slide" transparent={false} visible={open} >
  <SafeAreaView style={styles.modal}>
    <View style={styles.modalHeader}>
      <TouchableOpacity onPress={() => setOpen(false)}>
        <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="arrow-back-outline" size={40} color="#FFF" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Novo tweet</Text>
    </View>

    <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
      <TextInput 
        multiline={true}
        placeholderTextColor="$747474"
        autoCorrect={false}
        placeholder="O que esta pensando hoje?"
        style={styles.input}
        value={input}
        onChangeText={(texto) => setInput(texto)}
      />
      

      <TouchableOpacity onPress={handleAdd}>
        <Text style={styles.handleAdd}>Postar</Text>
      </TouchableOpacity>
    </Animatable.View>
  </SafeAreaView>
</Modal>


      <AnimatedBtn
        style={styles.fab}
        useNativeDriver
        animation="bounceInUp"
        duration={1500}
        onPress={() => setOpen(true)} 
      >
        <Ionicons name="add-outline" size={35} color="#FFF" />
      </AnimatedBtn>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008cff',
  },
  title: {
    marginTop: 15,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#00417a',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 25,
    bottom: 25,
    elevation: 2,
    zIndex: 9,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  modal: {
    flex: 1,
    backgroundColor: '#008cff',
    padding: 20, 
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  modalTitle: {
    fontSize: 23,
    color: '#FFF',
    marginLeft: 15,
  },
  modalBody: {
    flex: 1,
    justifyContent: '', 
    marginTop: 20,
  },
  input: {
    fontSize: 16,
    backgroundColor: '#FFF',
    height: 80, 
    padding: 10,
    borderRadius: 5,
    color: '#000',
    textAlignVertical: 'top',
  },
  handleAdd: {
    backgroundColor: '#FFF',
    marginTop: 20,
    paddingVertical: 10,
 
    textAlign: 'center', 
    fontSize: 18, 
    borderRadius: 5,
  },
});
