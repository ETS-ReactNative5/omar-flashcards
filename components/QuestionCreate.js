import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import commonStyles from '../utils/styles/common'
import {dark, darkgray, gray, pink, white} from "../utils/styles/colors";
import { Ionicons } from '@expo/vector-icons';
import {connect} from "react-redux";
import {handleAddDeck, handleAddQuestion} from "../store/actions/decks";
import {v4 as generateId} from "uuid";

export class QuestionCreate extends Component {
    state = {
        title: '',
        answer: '',
    }
    addQuestion = () => {
        const {title, answer} = this.state
        const {dispatch} = this.props
        const {deck_id} = this.props.route.params
        if (title && answer) {
            dispatch(handleAddQuestion({
                title,
                answer,
                deck_id
            })).then(() => {
                this.setState({
                    title: '',
                    answer: ''
                })
                this.props.navigation.navigate('DeckView', {id: deck_id})
            })
        }
    }
    render() {
        const { deck_name } = this.props;
        const { title, answer } = this.state;
        return (
            <View style={[commonStyles.container, styles.container]}>
                <Text style={styles.title}>Add New Question</Text>
                <Text style={styles.subtitle}>{deck_name}</Text>
                <Text style={[styles.subtitle, {marginTop: 'auto'}]}>Please type the question information.</Text>
                <TextInput style={[styles.input, {minHeight: 50, marginBottom: 15}]} placeholder={'Question'} value={title} onChangeText={(title) => this.setState({title})}  multiline />
                <TextInput style={[styles.input, {marginBottom: 'auto', minHeight: 80}]} placeholder={'Answer'} value={answer} onChangeText={(answer) => this.setState({answer})}  multiline />
                <TouchableOpacity
                    style={[styles.button, (!title || !answer) && {opacity: 0.5}]}
                    onPress={this.addQuestion}
                    disabled={!title || !answer}
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
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
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

function mapStateToProps({decks}, props) {
    const {deck_id} = props.route.params;
    return {
        deck_name: decks.find(item => item.id === deck_id).name
    }
}

export default connect(mapStateToProps)(QuestionCreate)
