import {
    getDecksFromApi, addDeckToApi, deleteDeckFromApi, addQuestionToApi,
} from "../../utils/api";

export const GET_DECKS = "GET_DECKS";
export const ADD_DECK = "ADD_DECK";
export const DELETE_DECK = "DELETE_DECK";
export const ADD_QUESTION = "ADD_QUESTION";

// GET DECKS

export function handleGetDecks() {
    return dispatch => {
        return getDecksFromApi().then(decks => {
            dispatch(getDecks(decks));
        });
    };
}

export function getDecks(decks) {
    return {
        type: GET_DECKS,
        decks
    };
}

// ADD DECK

export function handleAddDeck(deck) {
    return dispatch => {
        return addDeckToApi(deck).then(() => {
            dispatch(addDeck(deck));
        });
    };
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    };
}

// DELETE DECK

export function handleDeleteDeck(id) {
    return dispatch => {
        return deleteDeckFromApi(id).then(() => {
            dispatch(deleteDeck(id));
        });
    };
}

export function deleteDeck(id) {
    return {
        type: DELETE_DECK,
        id
    };
}

// ADD QUESTION

export function handleAddQuestion(payload) {
    return dispatch => {
        return addQuestionToApi(payload).then(() => {
            dispatch(addQuestion(payload));
        });
    };
}

export function addQuestion(payload) {
    return {
        type: ADD_QUESTION,
        payload
    };
}