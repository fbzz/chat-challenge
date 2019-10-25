import * as constants from '../constants';

export interface AddMessages {
    type: constants.ADD_MESSAGES;
    message: object;
}

export interface CreateUser {
    type: constants.CREATE_USERNAME;
    userName: string;
}

export interface ChangeSettings {
    type: constants.CHANGE_SETTINGS;
    options: Object
}



export type MessagesActions = AddMessages;

export function addMessages(message: object): AddMessages {
    return {
        type: constants.ADD_MESSAGES,
        message
    };
}


export type OptionsActions = CreateUser | ChangeSettings;

export function createUser(userName: string): CreateUser {
    return {
        type: constants.CREATE_USERNAME,
        userName
    };
}

export function changeSettings(options: Object): ChangeSettings {
    return {
        type: constants.CHANGE_SETTINGS,
        options
    };
}