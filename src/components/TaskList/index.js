import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList({ data, handleDelete, handleEdit }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.taskContainer}>
        <Text style={styles.task}>{data.tweet}</Text>
      </View>
      <View style={styles.containerIcons}>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={30} 
            color="#121212" 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEdit(data.id, data.tweet)}>
          <Ionicons 
            name="create-outline" 
            size={30} 
            color="#121212" 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(data.id)}>
          <Ionicons 
            name="trash-outline" 
            size={30} 
            color="#121212" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 7,
    gap: 8,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    justifyContent: 'space-between',
  },
  containerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  task: {
    color: '#121212',
    fontSize: 20,
    paddingLeft: 8,
  },
});