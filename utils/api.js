import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleApiDecks} from "./helpers";

export const STORAGE_KEY = "decks_app_data";

export async function addDeckToApi(deck) {
    return AsyncStorage
        .getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data.push(deck);
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
}

export async function addQuestionToApi(payload) {
    return AsyncStorage
        .getItem(STORAGE_KEY)
        .then((results) => {
            const {deck_id, title, answer} = payload
            const data = JSON.parse(results);
            const deck = data.find((deck) => deck_id === deck.id);
            deck.questions.push({
                title,
                answer
            });
            console.log('hiady');
            console.log(data);
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        })
}

export async function deleteDeckFromApi(id) {
    return AsyncStorage
        .getItem(STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results).filter((deck) => deck.id !== id)
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
}

export async function getDecksFromApi() {
    return AsyncStorage.getItem(STORAGE_KEY).then(handleApiDecks)
}