import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import PokeAPI from './../API/PokeApi';

import PokeballImage from './../assets/images/pokeball-outline.png';
import TextCapitalize from './../util/textCapitalize';

import Icon from 'react-native-vector-icons/Feather';


const EvolutionChart = props => {

    const testfunction = () => {
        if (!props.evolutionChain.hasOwnProperty('chain')) return;
        let currentPokemon = props.evolutionChain.chain;

        let evolutionChain = [];
        let steps = 0;

        while (currentPokemon.evolves_to?.length > 0){
            const nextPokemon = currentPokemon.evolves_to[0];
            console.log(currentPokemon.species.name, "evolves to", nextPokemon.species.name);

            evolutionChain.push(<EvolutionStep 
                                key={steps++} 
                                from={currentPokemon.species.name} 
                                to={nextPokemon.species.name} 
                                />)
            
            currentPokemon = nextPokemon;
        }
        return evolutionChain;
    };

    return (
        <View>
            {testfunction()}
        </View>
    );
}

const EvolutionStep = props => {

    const [fromPokeSprite, setFromPokeSprite] = useState(PokeballImage);
    const [toPokeSprite, setToPokeSprite] = useState(PokeballImage);

    const updateSprites = () => {
        PokeAPI.getPokemonInfo(props.from)
        .then(pokeDetails => {
            setFromPokeSprite({ uri: pokeDetails.sprites.front_default});
        });

        PokeAPI.getPokemonInfo(props.to)
        .then( pokeDetails => {
            setToPokeSprite({ uri: pokeDetails.sprites.front_default});
        });
    }

    useEffect( () => {
        updateSprites();
    }, []);    

    return (
        <View style={Styles.evolutionStepContainer}>

            <View style={Styles.spriteContainer}>
                <Image source={fromPokeSprite} style={Styles.pokeSprite}/>
                <Text>{TextCapitalize.firstLetter(props.from)}</Text>
            </View>

            <Icon name="arrow-right" size={35} />

            <View style={Styles.spriteContainer}>
                <Image source={toPokeSprite} style={Styles.pokeSprite}/>
                <Text>{TextCapitalize.firstLetter(props.to)}</Text>
            </View>
        </View>
    ) 
}

const Styles = StyleSheet.create({
    evolutionStepContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 20,
    },
    spriteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pokeSprite: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    }
})

export default EvolutionChart;