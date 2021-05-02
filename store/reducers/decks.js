import {
    ADD_DECK, ADD_QUESTION, DELETE_DECK,
    GET_DECKS,
} from "../actions/decks";

export default function decks(state = [], action) {
    let decks = [];
    switch (action.type) {
        case ADD_QUESTION:
            const { title, answer, deck_id} = action.payload
            decks = state;
            const deck = decks.find((deck) => deck_id === deck.id)
            deck.questions.push({
                title,
                answer
            })
            return [...decks]

        case ADD_DECK:
            return [
                ...state,
                action.deck
            ]

        case DELETE_DECK:
            decks = state.filter((deck) => deck.id !== action.id)
            return [...decks]

        case GET_DECKS:
            return action.decks

        default:
            return state;
    }
}
