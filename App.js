import { StatusBar } from 'expo-status-bar';
import { View, Linking, SafeAreaView, TouchableWithoutFeedback, Keyboard, Text, contentContainerStyle, Alert, TextInput, Button, Image, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
const showAlert = () =>
  Alert.alert(
    'Error',
    'Pokemon Not Found',
    {
      cancelable: true,
    },
  );

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [fontLoaded, setFontLoaded] = useState(false);
  const [pokemonImg, setPokemonImg] = useState(null);
  
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'luckiest-guy': require('./assets/fonts/LuckiestGuy-Regular.ttf'),
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  const fetchPokemon = async () => {
    try {
      const theName = pokemonName.replace(/ /g, ''); // Remove spaces

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${theName.toLowerCase()}`);
      const data = await response.json();
      setPokemonData(data);
      setPokemonImg(data.sprites.front_default);
      Keyboard.dismiss();
    } catch (error) {
      showAlert();
      //console.error('Error fetching Pokémon data', error);
    }
  };
  const swapImg = () => { //Swap to shiny image
    if (pokemonImg == pokemonData.sprites.front_default ){
      setPokemonImg(pokemonData.sprites.front_shiny);
    }else {
      setPokemonImg(pokemonData.sprites.front_default);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {fontLoaded ? (
        <Text style={styles.heading}>Pokémon Info</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Enter Pokémon Name"
        onChangeText={text => setPokemonName(text)}
        value={pokemonName}
      />
      <Button title="Search" style={{backgroundColor:'green'}} onPress={fetchPokemon} />

      {pokemonData && (
        <ScrollView contentContainerStyle={styles.pokemonContainer}>
          <ScrollView contentContainerStyle={styles.pokemonContainer}>
          <Text>Click the image to see the shiny version.</Text>
            {pokemonImg ? (
              <TouchableWithoutFeedback onPress={swapImg}>
                <Image style={styles.pokemonImage} source={{ uri: pokemonImg }} />
              </TouchableWithoutFeedback>
            ) : null}
            {pokemonData.name ? (
              <Text style={styles.pokemonName}>{pokemonData.name}</Text>
            ) : null}
            {pokemonData.types ? (
              <Text style={styles.pokemonType}>Type(s): {pokemonData.types.map(type => type.type.name).join(', ')}</Text>
            ) : null}
            {pokemonData.height ? (
              <Text style={styles.pokemonHeight}>Height: {pokemonData.height / 10} m</Text>
            ) : null}
            {pokemonData.weight ? (
              <Text style={styles.pokemonWeight}>Weight: {pokemonData.weight / 10} kg</Text>
            ) : null}
            {pokemonData.abilities ? (
              <Text style={styles.pokemonAbilities}>Abilities: {pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</Text>
            ) : null}
            {pokemonData.species.name ? (
              <Text style={styles.pokemonSpecies}>Species: {pokemonData.species.name}</Text>
            ) : null}
            {pokemonData.base_experience ? (
              <Text style={styles.pokemonBaseExperience}>Base Experience: {pokemonData.base_experience}</Text>
            ) : null}
            {pokemonData.game_indices ? (
              <Text style={styles.pokemonGames}>Appears in Games: {pokemonData.game_indices.map(game => game.version.name).join(', ')}</Text>
            ) : null}
          </ScrollView>
        </ScrollView>
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Pokémon are registered trademarks of Nintendo and Game Freak.</Text>
        <Text style={styles.footerText}>Created by <Text style={styles.link} onPress={() => Linking.openURL('https://www.dantebradshaw.com')}>Dante Bradshaw</Text> | &copy; {new Date().getFullYear()} </Text>
        <Text style={styles.footerText}>Powered by:</Text>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://pokeapi.co')}>
          <Image style={styles.footerImg} source={require('./assets/images/pokeapi.png')} />
        </TouchableWithoutFeedback>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3334',
  },
  heading: {
    fontSize: 24,
    color: '#f39c12',
    marginBottom: 20,
    fontFamily: 'luckiest-guy'
  },
  input: {
    width: '80%',
    padding: 10,
    fontSize: 16,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  pokemonContainer: {
    marginTop: 10,
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 20,
    paddingTop: 5
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 24,
    color: '#e74c3c',
    marginBottom: 10,
  },
  pokemonType: {
    fontSize: 18,
    color: '#3498db',
    marginBottom: 10,
  },
  pokemonHeight: {
    fontSize: 18,
    color: '#e74c3c',
    marginBottom: 10,
  },
  pokemonWeight: {
    fontSize: 18,
    color: '#27ae60',
    marginBottom: 10,
  },
  pokemonAbilities: {
    fontSize: 18,
    color: '#9b59b6',
    marginBottom: 10,
  },
  pokemonSpecies: {
    fontSize: 18,
    color: '#e67e22',
    marginBottom: 10,
  },
  pokemonBaseExperience: {
    fontSize: 18,
    color: '#c0392b',
    marginBottom: 10,
  },
  pokemonGames: {
    fontSize: 18,
    color: '#f39c12',
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5
  },
  link: {
    textDecorationLine: 'underline'
  },
  footerImg: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  }
});