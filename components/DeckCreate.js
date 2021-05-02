import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import commonStyles from '../utils/styles/common'
import {dark, darkgray, gray, pink, white} from "../utils/styles/colors";
import { Ionicons } from '@expo/vector-icons';
import {connect} from "react-redux";
import {handleAddDeck} from "../store/actions/decks";
import { v4 as generateId } from 'uuid';

export class DeckCreate extends Component {
    state = {
        title: '',
    }
    addDeck = () => {
        const {title} = this.state
        const {dispatch} = this.props
        if (title) {
            const id = generateId();
            dispatch(handleAddDeck({
                id,
                name: title,
                questions: [],
                created_at: new Date().toISOString()
            }))
            this.setState({
                title: ''
            })
            this.props.navigation.navigate('DeckView', {id})
        }
    }
    render() {
        const {title} = this.state;
        return (
            <View style={[commonStyles.container, styles.container]}>
                <Text style={styles.title}>Add New Deck</Text>
                <Text style={styles.subtitle}>Please type the deck title.</Text>
                <TextInput style={styles.input} placeholder={'Deck Title'} value={title} onChangeText={(title) => this.setState({title})} />
                <TouchableOpacity
                    style={[styles.button, !title && {opacity: 0.5}]}
                    onPress={this.addDeck}
                    disabled={!title}
                >
                    <Text style={styles.buttonText}>Add</Text>
                    <Ionicons name="ios-add-circle" size={30} color={white} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gray,
        padding: 20
    },
    title: {
        fontWeight: '900',
        fontFamily: 'Inter_900Black',
        fontSize: 34,
        marginBottom: 'auto'
    },
    subtitle: {
        fontSize: 20,
        color: darkgray,
        marginBottom: 15
    },
    input: {
        borderColor: dark,
        borderStyle: 'solid',
        borderWidth: 1,
        height: 50,
        fontSize: 18,
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 'auto',
    },
    button: {
        backgroundColor: pink,
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 40
    },
    buttonText: {
        fontSize: 20,
        color: white
    }
});

export default connect()(DeckCreate)
