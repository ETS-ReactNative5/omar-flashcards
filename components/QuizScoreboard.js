import React, {Component} from "react";
import commonStyles from "../utils/styles/common";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {darkgray, gray, pink, white} from "../utils/styles/colors";
import {Ionicons} from "@expo/vector-icons";

export class QuizScoreboard extends Component {
    render() {
        const {
            correctPercent,
            correct,
            incorrectPercent,
            incorrect,
            restartQuiz,
            backToDeck,
        } = this.props;
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
                <TouchableOpacity style={[styles.button, {marginTop: 'auto', backgroundColor: darkgray}]} onPress={restartQuiz}>
                    <Text style={styles.buttonText}>Restart Quiz</Text>
                    <Ionicons name="ios-refresh" size={30} color={white} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button]} onPress={backToDeck}>
                    <Text style={styles.buttonText}>Back to Deck</Text>
                    <Ionicons name="ios-arrow-back" size={30} color={white} />
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