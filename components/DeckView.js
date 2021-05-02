import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/styles/common'
import {darkgray, gray, light, pink, white} from "../utils/styles/colors";
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {connect} from "react-redux";
import {handleDeleteDeck} from "../store/actions/decks";

export class DeckView extends Component {
    deleteDeck = () => {
        const {dispatch, deck} = this.props;
        dispatch(handleDeleteDeck(deck.id))
            .then(() => {
                this.props.navigation.navigate('DeckList');
            })
    }
    addQuestion = () => {
        const {deck} = this.props;
        this.props.navigation.navigate('QuestionCreate', {deck_id: deck.id})
    }
    startQuiz = () => {
        const {deck} = this.props;
        this.props.navigation.navigate('QuizView', {id: deck.id})
    }
    render() {
        const { deck } = this.props
        if (!deck) {
            return <View><Text>Not Found</Text></View>;
        }
        return (
            <View style={[commonStyles.container, styles.container]}>
                <View style={styles.titleContainer}>
                    <View style={commonStyles.container}>
                        <Text style={styles.title}>{deck.name}</Text>
                        <Text style={styles.subtitle}>{deck.questions.length} questions</Text>
                    </View>
                    <View style={styles.iconButtonContainer}>
                        <TouchableOpacity onPress={this.deleteDeck}>
                            <Ionicons style={styles.iconButton} name="ios-trash-outline" size={30} color={light} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.button, {marginTop: 'auto', backgroundColor: darkgray}]}
                    onPress={this.addQuestion}
                >
                    <Text style={styles.buttonText}>Add Question</Text>
                    <Ionicons name="ios-add-circle" size={30} color={white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {marginTop: 10}]}
                    onPress={this.startQuiz}
                >
                    <Text style={styles.buttonText}>Start Quiz</Text>
                    <Ionicons name="ios-arrow-forward" size={30} color={white} />
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: '900',
        fontFamily: 'Inter_900Black',
        fontSize: 34,
        marginRight: 15,
        marginBottom: 5
    },
    subtitle: {
        fontSize: 20,
        color: darkgray,
        marginBottom: 15
    },
    iconButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        backgroundColor: white,
        padding: 15,
        borderRadius: 40,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 10,
        marginLeft: 20
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
    const { id } = props.route.params;
    return {
        deck: decks.find(item => item.id === id)
    }
}

export default connect(mapStateToProps)(DeckView)
