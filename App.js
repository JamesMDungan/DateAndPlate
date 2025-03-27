import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const categories = ['Baking', 'Cooking', 'Date Night Specials', 'Quick & Easy'];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Date & Plate</Text>
      <Text style={styles.tagline}>Whisk up love, one recipe at a time</Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.surpriseButton}>
        <Text style={styles.surpriseText}>Surprise Me!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  tagline: { fontSize: 16, textAlign: 'center', color: 'gray', marginBottom: 20 },
  categoryButton: {
    backgroundColor: '#ffcc99',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  categoryText: { fontSize: 18, textAlign: 'center' },
  surpriseButton: {
    marginTop: 20,
    backgroundColor: '#ff6666',
    padding: 15,
    borderRadius: 10,
  },
  surpriseText: { fontSize: 18, color: 'white', textAlign: 'center' },
});
