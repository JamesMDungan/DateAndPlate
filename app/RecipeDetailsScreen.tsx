// app/RecipeDetailsScreen.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { recipes } from '../data/recipes';

export default function RecipeDetailsScreen({ route }: any) {
  const { recipeId } = route.params;
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) return <Text>Recipe not found!</Text>;  // Handle case if recipe not found

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      
      {/* Start Cooking Button */}
      <TouchableOpacity style={styles.startCookingButton}>
        <Text style={styles.buttonText}>Start Cooking 🍽️</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>{ingredient}</Text>
      ))}

      <Text style={styles.sectionTitle}>Steps</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} style={styles.step}>{step}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  startCookingButton: {
    backgroundColor: '#f76c6c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  ingredient: {
    fontSize: 18,
    marginVertical: 5,
  },
  step: {
    fontSize: 18,
    marginVertical: 5,
  },
});
