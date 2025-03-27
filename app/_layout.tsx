import React from 'react';
import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Layout() {
  const router = useRouter();

  // Navigate to the Liked Recipes screen when the button is pressed
  const handleFavoritesPress = () => {
    router.push('/LikedRecipesScreen'); // Adjust this path if necessary
  };

  return (
    <Stack
      screenOptions={{
        headerTitle: 'Date & Plate',
        headerRight: () => (
          <TouchableOpacity onPress={handleFavoritesPress} style={{ padding: 10 }}>
            <Text style={{ fontSize: 18 }}>Favorites</Text> {/* You can replace this with an icon */}
          </TouchableOpacity>
        ),
      }}
    />
  );
}

