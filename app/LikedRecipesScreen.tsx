import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { recipes } from '../data/recipes'; // Import the recipes list
import AsyncStorage from '@react-native-async-storage/async-storage';


const LikedRecipesScreen = () => {
  const router = useRouter();
  const [likedRecipes, setLikedRecipes] = useState<any[]>([]);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      try {
        // Get liked recipes from AsyncStorage
        const likedRecipesData = await AsyncStorage.getItem('liked_recipes');
        if (likedRecipesData) {
          setLikedRecipes(JSON.parse(likedRecipesData));
        }
      } catch (error) {
        console.error('Error fetching liked recipes', error);
      }
    };

    fetchLikedRecipes();
  }, []);

  if (likedRecipes.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No liked recipes yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {likedRecipes.map((recipe: any) => (
        <View key={recipe.id} style={styles.recipeContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => router.push(`/recipe/${recipe.id}`)}
          >
            <Text style={styles.buttonText}>View Recipe</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  recipeContainer: {
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  recipeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  },
  viewButton: {
    backgroundColor: '#f76c6c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LikedRecipesScreen;
