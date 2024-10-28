import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList({ data, handleDelete }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleLike}>
        <Ionicons 
          name={liked ? "heart" : "heart-outline"} 
          size={30} 
          color="#121212" 
        />
      </TouchableOpacity>

      <View style={styles.taskContainer}>
        <Text style={styles.task}>{data.task}</Text>
      </View>

      <TouchableOpacity onPress={() => handleDelete(data)}>
        <Ionicons 
          name="trash-outline" 
          size={30} 
          color="#121212" 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 7,
    elevation: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
    justifyContent: 'space-between'
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  task: {
    color: '#121212',
    fontSize: 20,
    paddingLeft: 8,
  }
});
