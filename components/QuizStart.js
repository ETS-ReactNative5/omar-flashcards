import React, {Component} from "react";
import commonStyles from "../utils/styles/common";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {darkgray, gray, pink, white} from "../utils/styles/colors";

export class QuizStart extends Component {
    render() {
        const {
            question,
            selectedQuestion,
            questionsCount,
            showAnswer,
            changeShowAnswerValue,
            incorrectAnswer,
            correctAnswer
        } = this.props;
        return (
            <View style={[commonStyles.container, styles.container]}>
                <Text style={styles.title}>{question.title}</Text>
                <Text style={styles.subtitle}>Question {selectedQuestion}/{questionsCount}</Text>
                <Text style={styles.answer}>{showAnswer ? question.answer : '#####'}</Text>
                {
                    showAnswer
                        ? (
                            <View style={styles.row}>
                                <TouchableOpacity style={[styles.button, {flex: 1, justifyContent: 'center', backgroundColor: '#be0000'}]} onPress={incorrectAnswer}>
                                    <Text style={styles.buttonText}>Incorrect</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, {flex: 1, justifyContent: 'center', backgroundColor: '#289672'}]} onPress={correctAnswer}>
                                    <Text style={styles.buttonText}>Correct</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        : (
                            <TouchableOpacity style={[styles.button, {marginTop: 'auto'}]} onPress={changeShowAnswerValue}>
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