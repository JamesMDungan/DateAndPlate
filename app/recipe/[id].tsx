import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recipes } from '../../data/recipes';
import { questions } from '../../data/questions';  // Ensure this file is correctly importing questions

const RecipeDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  if (!id) {
    return <Text>Recipe not found! Please go back and try again.</Text>;
  }

  const recipe = recipes.find((item) => item.id.toString() === id);
  const [isFavorited, setIsFavorited] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null); // Ref for ScrollView

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const savedStatus = await AsyncStorage.getItem(`favorite_${id}`);
        if (savedStatus === 'true') {
          setIsFavorited(true);
        }
      } catch (error) {
        console.error('Error loading favorite status', error);
      }
    };

    loadFavoriteStatus();
  }, [id]);

  const toggleFavorite = async () => {
    const newFavoriteStatus = !isFavorited;
    setIsFavorited(newFavoriteStatus);

    try {
      await AsyncStorage.setItem(`favorite_${id}`, newFavoriteStatus.toString());

      let likedRecipes = await AsyncStorage.getItem('liked_recipes');
      likedRecipes = likedRecipes ? JSON.parse(likedRecipes) : [];

      if (newFavoriteStatus) {
        likedRecipes.push(recipe);
      } else {
        likedRecipes = likedRecipes.filter((item: any) => item.id !== recipe.id);
      }

      await AsyncStorage.setItem('liked_recipes', JSON.stringify(likedRecipes));
    } catch (error) {
      console.error('Error saving favorite status', error);
    }
  };

  // Scroll to the Ingredients or Steps section
  const handleStartCooking = () => {
    scrollViewRef.current?.scrollTo({ y: 500, animated: true });  // Adjust "y" to scroll to the desired position
  };

  // Get Random Questions
  const getRandomQuestions = () => {
    if (!questions || questions.length === 0) {
      console.log('No questions available');
      return [];
    }

    const selectedQuestions: string[] = [];
    while (selectedQuestions.length < 4) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      const randomQuestion = questions[randomIndex];
      if (!selectedQuestions.includes(randomQuestion)) {
        selectedQuestions.push(randomQuestion);
      }
    }
    console.log('Random Questions:', selectedQuestions);  // Log to see the selected questions
    return selectedQuestions;
  };

  const randomQuestions = getRandomQuestions();

  if (!recipe) return <Text>Recipe not found!</Text>;

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorited ? 'heart' : 'heart-outline'}
            size={30}
            color={isFavorited ? 'red' : 'white'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{recipe.title}</Text>

      <TouchableOpacity style={styles.startCookingButton} onPress={handleStartCooking}>
        <Text style={styles.buttonText}>Start Cooking 🍽️</Text>
      </TouchableOpacity>

      <View style={{ height: 400 }} /> {/* Spacer to allow scrolling */}
      <Text style={styles.subTitle}>Ingredients</Text>
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.text}>{ingredient}</Text>
      ))}

      <Text style={styles.subTitle}>Steps</Text>
      {recipe.steps && recipe.steps.length > 0 ? (
        recipe.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.text}>{step}</Text>
            {randomQuestions[index] && (
              <Text style={styles.questionText}>
                💬 {randomQuestions[index]}
              </Text>
            )}
          </View>
        ))
      ) : (
        <Text>No steps available for this recipe.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 25,
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
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  stepContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff5f5",
    borderRadius: 10,
  },
});

export default RecipeDetailsScreen;
