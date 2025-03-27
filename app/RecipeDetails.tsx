// app/recipeDetails.tsx
// app/recipeDetails.tsx
// app/recipeDetails.tsx
import React, { useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, Image, View } from 'react-native';

export default function RecipeDetailsScreen() {
  // Create a reference for the ScrollView
  const scrollViewRef = useRef<ScrollView | null>(null);

  // Recipe Data (for demonstration)
  const recipe = {
    title: 'Chocolate Cake',
    image: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FRecipes%2F2024-01-chocolate-cake%2Fchocolate-cake-0632-edit-32',
    ingredients: ['Flour', 'Sugar', 'Butter', 'Cocoa Powder'],
    steps: [
      'Preheat the oven to 350°F.',
      'Mix all ingredients.',
      'Bake for 30 minutes.',
    ],
    questions: [
      'What’s your favorite dessert?',
      'What was the most memorable meal you had together?',
    ],
  };

  // Function to handle the scroll to ingredients and steps
  const handleStartCooking = () => {
    scrollViewRef.current?.scrollTo({ y:500, animated: true });  // Adjust "y" to scroll to the desired position
  };

  return (
    <ScrollView ref={scrollViewRef} style={{ padding: 20 }}>
      <Image
        source={{ uri: recipe.image }}
        style={{ width: '100%', height: 200, borderRadius: 10, marginBottom: 20 }}
      />
      <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
        {recipe.title}
      </Text>

      {/* Start Cooking Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#f76c6c',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginVertical: 20,
        }}
        onPress={handleStartCooking}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
          Start Cooking 🍽️
        </Text>
      </TouchableOpacity>

      {/* Add some space between the button and the rest of the content to create a scroll effect */}
      <View style={{ height: 800 }} />

      {/* Ingredients Section */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={{ fontSize: 18 }}>• {ingredient}</Text>
      ))}

      {/* Steps Section */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>Steps</Text>
      {recipe.steps.map((step, index) => (
        <Text key={index} style={{ fontSize: 18, marginVertical: 5 }}>
          • {step}
        </Text>
      ))}

      {/* Questions Section */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20 }}>Questions</Text>
      {recipe.questions.map((question, index) => (
        <Text key={index} style={{ fontSize: 18, marginVertical: 5, fontStyle: 'italic' }}>
          💬 {question}
        </Text>
      ))}
    </ScrollView>
  );
}
