import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskList from './src/components/TaskList';
import React, { useState, useCallback, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { postTweet, getTweets, deleteTweet, updateTweet } from './src/services/api';

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);
const { height } = Dimensions.get('screen');

export default function App() {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTweetId, setEditTweetId] = useState(null);

  

  async function getAllTweets() {
    const tweets = await getTweets();
    setTask(tweets);
  }

  useEffect(() => {
    getAllTweets();
  }, []);

  async function handleAdd() {
    if (input === '') return;

    const newTweet = await postTweet(input);
    if (newTweet) {
      getAllTweets();
      setOpen(false);
    }

    setInput('');
    setOpen(false);
  }

  async function handleSubmitEdit() {
    const updatedTweet = await updateTweet(editTweetId, input);
    if (updatedTweet) {
      getAllTweets();
      setOpen(false);
    }
    setIsEditing(false);
    setEditTweetId(null);
  }

  const handleDelete = useCallback(async (id) => {
    const success = await deleteTweet(id);
    if (success) {
      setTask(prevTasks => prevTasks.filter(item => item.id !== id));
    }
  }, []);

  const handleEdit = (id, content) => {
    setIsEditing(true);
    setEditTweetId(id);
    setInput(content);
    setOpen(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#008CFF" barStyle="light-content" />

      <View style={styles.container}>
        <Text style={styles.title}>Meus tweets</Text>
      </View>

      <ScrollView style={styles.listContainer}>
        <FlatList
          marginHorizontal={10}
          showsHorizontalScrollIndicator={false}
          data={task}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <TaskList
              data={item}
              handleDelete={() => handleDelete(item.id)}
              handleEdit={() => handleEdit(item.id, item.tweet)}
            
            />
          )}
        />
      </ScrollView>

      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => { setOpen(false); setIsEditing(false); setInput(''); }}>
              <Ionicons style={{ marginLeft: 5, marginRight: 5 }} name="arrow-back-outline" size={40} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{isEditing ? 'Editar tweet' : 'Novo tweet'}</Text>
          </View>

          <Animatable.View style={styles.modalBody} animation="fadeInUp" useNativeDriver>
            <TextInput
              multiline={true}
              placeholderTextColor="#747474"
              autoCorrect={false}
              placeholder="O que está pensando hoje?"
              style={styles.input}
              value={input}
              onChangeText={(texto) => setInput(texto)}
            />

            <TouchableOpacity onPress={isEditing ? handleSubmitEdit :handleAdd}>
              <Text style={styles.handleAdd}>{isEditing ? 'Atualizar' : 'Postar'}</Text>
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
    backgroundColor: '#008CFF',
  },
  title: {
    marginTop: 15,
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    color: '#FFF',
  },
  listContainer: {
    height: height - 150,
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#00417A',
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
    backgroundColor: '#008CFF',
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