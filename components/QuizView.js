import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import commonStyles from '../utils/styles/common'
import { darkgray, gray, pink, white} from "../utils/styles/colors";
import {Ionicons} from '@expo/vector-icons';
import {connect} from "react-redux";
import {clearLocalNotifications, setLocalNotification} from "../utils/helpers";
import {QuizStart} from "./QuizStart";
import {QuizScoreboard} from "./QuizScoreboard";

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
            clearLocalNotifications()
            setLocalNotification()
        }
    }
    changeShowAnswerValue = () => {
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
                <QuizScoreboard
                    correct={correct}
                    correctPercent={correctPercent}
                    incorrect={incorrect}
                    incorrectPercent={incorrectPercent}
                    restartQuiz={this.restartQuiz}
                    backToDeck={this.backToDeck}
                />
            )
        }
        return (
            <QuizStart
                question={question}
                selectedQuestion={selectedQuestion}
                questionsCount={questionsCount}
                showAnswer={showAnswer}
                changeShowAnswerValue={this.changeShowAnswerValue}
                incorrectAnswer={this.incorrectAnswer}
                correctAnswer={this.correctAnswer}
            />
        )
    }
}

function mapStateToProps({decks}, props) {
    const { id } = props.route.params;
    const questions = decks.find((item) => item.id === id).questions;
    return {
        questions,
        id
    }
}

export default connect(mapStateToProps)(QuizView)
