import React, {Component} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

//Pages
import PokemonList from './../pages/PokemonList';
import PokemonDetails from './../pages/PokemonDetails';

const Router = () => (
    <NavigationContainer>   
        <Stack.Navigator initialRouteName="PokemonList" headerMode="none">
            <Stack.Screen name="PokemonList"    component={PokemonList} />
            <Stack.Screen name="PokemonDetails" component={PokemonDetails} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Router;