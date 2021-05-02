import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
        }
    },
});

export const NOTIFICATION_KEY = 'deck_app:notifications';
export const STORAGE_KEY = "decks_app_data";

function generateId() {
    return uuid.v4();
}

export function setInitialDummyData() {
    const dummyData =  [
        {
            id: generateId(),
            name: 'Deck 1',
            created_at: new Date(),
            questions: [
                {
                    title: 'What is the capital of Spain?',
                    answer: 'Madrid'
                },
                {
                    title: 'What is the capital of Egypt?',
                    answer: 'Cairo'
                }
            ]
        },
        {
            id: generateId(),
            name: 'Deck 2',
            created_at: new Date(),
            questions: [
                {
                    title: 'Is Javascript is the same as Java?',
                    answer: 'No'
                },
                {
                    title: 'Is HTML a programming language?',
                    answer: 'No'
                }
            ]
        }
    ];
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));

    return dummyData;
}

export function handleApiDecks(results) {
    return results === null
        ? setInitialDummyData()
        : JSON.parse(results)
}

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                // Permission for iOS
                Notifications.getPermissionsAsync()
                    .then(statusObj => {
                        // Check if we already have permission
                        if (statusObj.status !== "granted") {
                            // If permission is not there, ask for the same
                            return Permissions.askAsync(Permissions.NOTIFICATIONS)
                        }
                        return statusObj
                    })
                    .then(statusObj => {
                        // If permission is still not given throw error
                        if (statusObj.status !== "granted") {
                            throw new Error("Permission not granted")
                        } else if (statusObj.status === "granted") {
                            Notifications.cancelAllScheduledNotificationsAsync().catch((err) => console.error(err))
                            Notifications.scheduleNotificationAsync({
                            content: {
                                title: 'Daily quiz reminder',
                                body: "👋 Don't forget to take a quiz today!",
                                sound: true,
                                vibrate: 1,
                                android: { sound: true }, // Make a sound on Android
                                ios: { sound: true }, // Make a sound on iOS
                            }, trigger: {
                                hour: 16,
                                minute: 28,
                                repeats: true
                            }
                            }).catch((err) => console.error(err))
                        }
                        return statusObj
                    })
                    .catch(err => {
                        console.error(err)
                        return null
                    })
            }
        })
        .catch((error) => console.error(error))
}