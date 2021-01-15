import React, { Component, createRef} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import ConditionalRender from './../components/ConditionalRender';
import EvolutionChart from './../components/EvolutionChart';

import ColorPallete, { addColorToBackground } from './../util/colorPallete';
import TextCapitalize from './../util/textCapitalize';

import PokeAPI from './../API/PokeApi';


export default class PokemonDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokeDetails: this.props.route.params.pokeDetails,
            activeTab: 'stats',
            tabs: [],
            evolutionChain: {},
            test: ''
        };
        this.statsTab = createRef();
        this.evolutionTab = createRef();
    }

    componentDidMount(){
        this.getEvolutionChain();
    }


    render = () => (
        <View style={addColorToBackground({flex: 1}, this.state.pokeDetails.types[0].type.name)}>

            <View style={Styles.header}>
                <Image source={{uri: this.state.pokeDetails.sprites.front_default}} style={Styles.pokeSprite}/>

                <View style={Styles.headeInfoContainer}>
                    <Text>#{this.state.pokeDetails.order}</Text>
                    <Text style={Styles.pokemonName}>{TextCapitalize.firstLetter(this.state.pokeDetails.name)}</Text>

                    <View style={Styles.typesContainer}>      
                    {
                        this.state.pokeDetails.types?.map((type, index) => (
                            <View key={index} style={Styles.singleTypeContainer}>
                                <Text style={Styles.type}>{TextCapitalize.firstLetter(type.type.name)}</Text>
                            </View>
                        ))
                    }
                    </View>

                </View>
                
            </View>

            <View style={Styles.tabsContainer}>
                <TouchableOpacity 
                ref={ref => this.statsTab = ref}
                onPress={() => this.changeTabTo('stats')}
                style={Styles.tab}
                >
                    <Text style={Styles.tabText}>Info</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                ref={ref => this.evolutionTab = ref}
                onPress={() => this.changeTabTo('evolution')}
                style={Styles.tab}
                >
                    <Text style={Styles.tabText}>Evolution</Text>
                </TouchableOpacity>
            </View>

            {/* Stats tab*/}
            <ConditionalRender visible={this.state.activeTab == 'stats'} keepLoaded={true}>
                <View style={Styles.pokeInfoContainer}>
                    <Text style={{...Styles.infoTitle, color: ColorPallete[this.state.pokeDetails.types[0].type.name]}}>Base Stats</Text>
                    
                    {this.state.pokeDetails.stats.map((stat, index) => (
                        <View style={Styles.statContainer} key={index}> 
                            <Text>{TextCapitalize.firstLetter(stat.stat.name.split('-').join(' '))}</Text>
                            <Text>{stat.base_stat}</Text>
                        </View>
                    ))}

                    <Text style={{...Styles.infoTitle, color: ColorPallete[this.state.pokeDetails.types[0].type.name]}}>Abilities</Text>
                    
                    {this.state.pokeDetails.abilities.map((ability, index) => (
                        <View style={Styles.statContainer} key={index}> 
                            <Text>{TextCapitalize.firstLetter(ability.ability.name.split('-').join(' '))}</Text>
                            <Text>{'Slot: ' + ability.slot}</Text>
                        </View>
                    ))}

                </View>
            </ConditionalRender>

            {/* Evolution Chart tab*/}
            <ConditionalRender visible={this.state.activeTab == 'evolution'} keepLoaded={true}>
                <View style={Styles.pokeInfoContainer}>
                    <Text style={{...Styles.infoTitle, color: ColorPallete[this.state.pokeDetails.types[0].type.name]}}>Evolution Chart</Text>
                    <EvolutionChart evolutionChain={this.state.evolutionChain} test={this.state.test}/>
                </View>
            </ConditionalRender>

        </View>
    );

    changeTabTo(tabName){
        this.setState({activeTab: tabName});
        console.log(ColorPallete[this.state.pokeDetails.types[0].type.name]);
    }

    async getEvolutionChain(){
        const speciesDetail = await PokeAPI.get(`/pokemon-species/${this.state.pokeDetails.name}`);
        const evolutionChain = await PokeAPI.getDirect(speciesDetail.evolution_chain.url);
        this.setState({evolutionChain: evolutionChain, test: 'aaaa'});
    }
}

const Styles = StyleSheet.create({
    header:{
        minHeight: '25%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pokeSprite: {
        width: '50%',
        height: '100%',
        resizeMode: 'contain',
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
        textAlign: 'center',
    },
    type: {
        color: 'white',
        fontWeight: 'bold',
        minWidth: '15%',
        textAlign: 'center',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tab: {
        paddingVertical: '5%',
        flex: 1,
    },  
    tabText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    pokeInfoContainer:{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'rgb(255,255,255)',
        padding: 10,
        height: '100%',
    },
    infoTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    statContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        paddingVertical: '0.5%',
        marginHorizontal: '13%',
        borderBottomWidth: 2,
        borderBottomColor: '#AAA',
    }
})