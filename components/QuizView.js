import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/styles/common'
import { darkgray, gray, pink, white} from "../utils/styles/colors";
import {Ionicons} from '@expo/vector-icons';
import {connect} from "react-redux";

export class QuizView extends Component {
    state = {
        showScoreboard: false,
        showAnswer: false,
        selectedQuestion: 1,
        correct: 0,
        incorrect: 0,
    }
    restartQuiz = () => {
        this.setState({
            showScoreboard: false,
            showAnswer: false,
            selectedQuestion: 1,
            correct: 0,
            incorrect: 0,
        })
    }
    correctAnswer = () => {
        this.setState((oldState) => ({
            correct: oldState.correct + 1,
            selectedQuestion: oldState.selectedQuestion + 1,
            showAnswer: false,
        }))
        this.lastQuestionChecker();
    }
    incorrectAnswer = () => {
        this.setState((oldState) => ({
            incorrect: oldState.incorrect + 1,
            selectedQuestion: oldState.selectedQuestion + 1,
            showAnswer: false,
        }))
        this.lastQuestionChecker();
    }
    lastQuestionChecker = () => {
        const {questions} = this.props;
        const {selectedQuestion} = this.state;
        if (selectedQuestion === questions.length) {
            this.setState({
                showAnswer: false,
                showScoreboard: true,
            })
        }
    }
    showAnswer = () => {
        this.setState({
            showAnswer: true
        })
    }
    backToDeck = () => {
        const {id} = this.props;
        this.props.navigation.navigate('DeckView', {id})
    }
    render() {
        const {showScoreboard, showAnswer, selectedQuestion, correct, incorrect} = this.state;
        const {questions} = this.props;
        const question = questions[selectedQuestion-1];
        const questionsCount = questions.length;
        const correctPercent = ((correct / questionsCount) * 100) > 0 ? Math.floor((correct / questionsCount) * 100) : 0;
        const incorrectPercent = ((incorrect / questionsCount) * 100) > 0 ? Math.floor((incorrect / questionsCount) * 100) : 0;
        if (showScoreboard) {
            return (
                <View style={[commonStyles.container, styles.container]}>
                    <Text style={styles.title}>Your score</Text>
                    <View style={[styles.row, styles.answer, styles.resultsContainer]}>
                        <View style={styles.results}>
                            <View style={[styles.percentContainer, styles.correctPercentContainer]}><Text style={[styles.percent, styles.correctPercent]}>{correctPercent}%</Text></View>
                            <Text style={styles.result}>{correct} Correct</Text>
                        </View>
                        <View style={styles.results}>
                            <View style={styles.percentContainer}><Text style={styles.percent}>{incorrectPercent}%</Text></View>
                            <Text style={styles.result}>{incorrect} Incorrect</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.button, {marginTop: 'auto', backgroundColor: darkgray}]} onPress={this.restartQuiz}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                        <Ionicons name="ios-refresh" size={30} color={white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button]} onPress={this.backToDeck}>
                        <Text style={styles.buttonText}>Back to Deck</Text>
                        <Ionicons name="ios-arrow-back" size={30} color={white} />
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={[commonStyles.container, styles.container]}>
                <Text style={styles.title}>{question.title}</Text>
                <Text style={styles.subtitle}>Question {selectedQuestion}/{questionsCount}</Text>
                <Text style={styles.answer}>{showAnswer ? question.answer : '#####'}</Text>
                {
                    showAnswer
                    ? (
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, {flex: 1, justifyContent: 'center', backgroundColor: '#be0000'}]} onPress={this.incorrectAnswer}>
                                <Text style={styles.buttonText}>Incorrect</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, {flex: 1, justifyContent: 'center', backgroundColor: '#289672'}]} onPress={this.correctAnswer}>
                                <Text style={styles.buttonText}>Correct</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    : (
                        <TouchableOpacity style={[styles.button, {marginTop: 'auto'}]} onPress={this.showAnswer}>
                            <Text style={styles.buttonText}>Show Answer</Text>
                            <Ionicons name="ios-arrow-forward" size={30} color={white} />
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: gray,
        padding: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    title: {
        fontWeight: '900',
        fontFamily: 'Inter_900Black',
        fontSize: 34,
        marginBottom: 5
    },
    subtitle: {
        fontSize: 18,
        color: darkgray,
        marginBottom: 15
    },
    resultsContainer: {
        justifyContent: 'space-around'
    },
    results: {
        flex: 1,
        alignItems: 'center'
    },
    result: {
        fontSize: 18,
        color: darkgray,
        marginTop: 25
    },
    percentContainer: {
        width: 100,
        height: 100,
        textAlign: 'center',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 10,
    },
    correctPercentContainer: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: pink,
    },
    percent: {
        fontSize: 30,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    correctPercent: {
        color: pink,
    },
    answer: {
        fontSize: 34,
        color: darkgray,
        fontFamily: 'Inter_600SemiBold',
        padding: 15,
        textAlign: 'center',
        marginTop: 'auto',
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
        borderRadius: 40,
        marginTop: 10
    },
    buttonText: {
        fontSize: 20,
        color: white
    }
});

function mapStateToProps({decks}, props) {
    const { id } = props.route.params;
    const questions = decks.find((item) => item.id === id).questions;
    return {
        questions,
        id
    }
}

export default connect(mapStateToProps)(QuizView)
