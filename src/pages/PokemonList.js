import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

import Icon from 'react-native-vector-icons/Feather'

import TextInputWithIcon from './../components/TextInputWithIcon';
import SearchIcon from './../assets/images/searchIcon.png'

import PokemonListItem from './../components/PokemonListItem';

import PokeAPI from './../API/PokeApi';

export default class PokemonList extends Component{
    constructor (props) {
        super(props);
        this.state = {
            offset: 0,
            limit: 20,
            results: [],
            refresh: false,

            pokeSearch: '',
        }
    }

    componentDidMount(){
        this.updatePokemonList(this.state.offset, this.state.limit);
    }

    render = () => (
        <View style={Styles.page}>          

            <View style={Styles.header}>
                <Text style={Styles.title}>Pokédex</Text>
                <Text style={Styles.subtitle}>Search for the pokemon by name or using the National Pokemon Number</Text>
                <TextInputWithIcon 
                    backgroundColor="#DDD"
                    icon={SearchIcon}
                    iconOpacity={0.5}
                    placeholder="What pokémon are you looking for?"
                    onChangeText={text => this.setState({pokeSearch: text})}
                    onSubmitEditing={() => this.searchPokemon(this.state.pokeSearch)}
                />

            </View>

            <FlatList 
                data={this.state.results}
                keyExtractor={pokemon => pokemon.name}
                renderItem={pokemon => <PokemonListItem pokemon={pokemon.item} />}
                style={Styles.list}
            />

            <View style={Styles.footer}>

                <TouchableOpacity style={Styles.navigateButton} onPress={() => this.navigate('previous')}>
                    <Icon name="arrow-left" size={20} />
                </TouchableOpacity>

                <Text>{`${this.state.offset} - ${this.state.offset + this.state.limit}`}</Text>

                <TouchableOpacity style={Styles.navigateButton} onPress={() => this.navigate('next')}>
                    <Icon name="arrow-right" size={20} />
                </TouchableOpacity>

            </View>

        </View>
    )
  
    async updatePokemonList(offset, limit){
        this.setState({results: []});

        const pokemonList = await PokeAPI.get('/pokemon', {
            offset: offset,
            limit: limit,
        });

        this.setState({results: pokemonList.results});
    }

    navigate(direction){
        if (this.state.offset == 0 && direction == 'previous'){
            return;
        }  

        const navigation = {
            next:       () => this.state.offset + this.state.limit,
            previous:   () => this.state.offset - this.state.limit,
        }
        if (!navigation[direction]) throw 'Invalid direction: "previous" or "next"';
        const newOffset = navigation[direction]();

        if (newOffset < 0) {
            this.setState({offset: 0});
        } else {
            this.setState({offset: newOffset});
        }
        this.updatePokemonList(newOffset, this.state.limit);
    }

    async searchPokemon(pokemonName) {
        try {
            console.log("Searching info for ", pokemonName);
            const pokeDetails = await PokeAPI.getPokemonInfo(pokemonName);
            this.props.navigation.navigate('PokemonDetails', {pokeDetails: pokeDetails})
        } catch (e) {
            alert("No results found");
        }
    }

}

const Styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    header: {
        padding: 20,
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
    },
    searchBar: {
        padding: 5,
        fontSize: 16,
        backgroundColor: '#BBB',
        borderRadius: 10,
        marginVertical: 15,
    },
    list: {
        borderRadius: 15,
        padding: 15,
    },
    footer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#DDD',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navigateButton: {
        maxHeight: '100%',
    },
})