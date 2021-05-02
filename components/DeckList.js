import React, { Component } from 'react'
import {Text, View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native'
import commonStyles from '../utils/styles/common'
import {darkgray, gray, light, pink, white} from "../utils/styles/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {connect} from "react-redux";
import {handleGetDecks} from "../store/actions/decks";
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

export class DeckList extends Component {
    componentDidMount() {
        const { dispatch } = this.props
        dispatch(handleGetDecks())
    }
    render() {
        const { decks } = this.props;
        return (
            <View style={[commonStyles.container, styles.container]}>
                <Text style={[styles.title, {padding: 20, paddingBottom: 0}]}>List</Text>
                <ScrollView>
                    <View style={{padding: 20}}>
                        {
                            decks && decks.map((deck) => (
                                <TouchableOpacity
                                    key={deck.id}
                                    style={styles.deckCard}
                                    onPress={() => this.props.navigation.navigate('DeckView', {id: deck.id})}
                                >
                                    <View style={styles.deckCardBody}>
                                        <Text style={styles.deckCardTitle}>{deck.name}</Text>
                                        <Text style={styles.deckCardDesc}>{deck.questions && deck.questions.length} questions</Text>
                                    </View>
                                    <MaterialCommunityIcons name="clipboard-play-outline" size={40} color={pink} />
                                </TouchableOpacity>
                            ))
                        }
                        {
                            decks && decks.length === 0 && (
                                <View><Text>You haven't added any decks yet!</Text></View>
                            )
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gray,
    },
    title: {
        fontWeight: '900',
        marginBottom: 10,
        fontFamily: 'Inter_900Black',
        fontSize: 34
    },
    deckCard: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        padding: 15,
        borderColor: gray,
        backgroundColor: white,
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 8,
    },
    deckCardBody: {
        paddingRight: 10,
        flex: 1
    },
    deckCardTitle: {
        fontSize: 22,
        fontWeight: '600',
        fontFamily: 'Inter_600SemiBold',
        color: pink
    },
    deckCardDesc: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'Inter_400Regular',
        color: darkgray
    }
});

function mapStateToProps({decks}) {
    return {
        decks: decks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
}

export default connect(mapStateToProps)(DeckList)
