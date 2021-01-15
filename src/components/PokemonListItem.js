import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import PokeApi from './../API/PokeApi';

import { addColorToBackground } from './../util/colorPallete';
import TextCapitalize from './../util/textCapitalize';

import { useNavigation } from '@react-navigation/native';

const PokemonListItem = props => {
    const navigation = useNavigation();
    const pokemon = props.pokemon;
    const [pokeDetails, setPokeDetails] = useState({
        order: '',
        name: '',
        types: [],
        sprites: {},
    });

    const retrievePokeDetails = async () => {
        const result = await PokeApi.getPokemonInfo(pokemon.name);
        setPokeDetails(result);
    }

    useEffect( () => {
        retrievePokeDetails();
    },[]);

    return (
        <TouchableOpacity 
        style={addColorToBackground(Styles.container, pokeDetails.types[0]?.type.name)}
        onPress={() => navigation.navigate('PokemonDetails', {pokeDetails: pokeDetails})}
        
        >
            <View style={Styles.infoContainer}>

                <Text>#{pokeDetails.order.toString().padStart(3, '0')}</Text>
                <Text style={Styles.pokemonName}>{TextCapitalize.firstLetter(pokeDetails.name)}</Text>

                <View style={Styles.typesContainer}>
                    {
                        pokeDetails.types?.map((type, index) => (
                            <View key={index} style={Styles.singleTypeContainer}>
                                <Text style={Styles.type}>{TextCapitalize.firstLetter(type.type.name)}</Text>
                            </View>
                        ))
                    }
                </View>

            </View>
            <View style={Styles.spriteContainer}>
                <Image 
                    source={{uri: pokeDetails.sprites.front_default}}  
                    style={Styles.pokeSprite}
                />
            </View>

        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        marginBottom: 20,

        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'visible',
    },
    infoContainer: {
        padding: 15,
        flex: 1
    },
    pokemonName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 3,
        textShadowOffset: {
            width: 2,
            height: 2,
        },
    },
    typesContainer: {
        flexDirection: 'row',
    },
    singleTypeContainer: {
        padding: 5,
        borderColor: 'rgba(255,255,255, .4)',
        backgroundColor: 'rgba(255,255,255, 0.1)',
        borderWidth: 2,
        borderRadius: 5,
        marginVertical: 5,
        marginRight: 7,
    },
    type: {
        color: 'white',
        fontWeight: 'bold',
    },
    spriteContainer: {
        flexDirection: 'row',
        flex: 2,
        alignItems: 'flex-start',
    },
    pokeSprite: {
        height: '140%',
        width: '130%',
        resizeMode: 'contain',
        overflow: 'visible',
        top: -30,
    }
})

export default PokemonListItem;