import { StoreState } from '../types/StoreState';
import { ADD_MESSAGES, CREATE_USERNAME, CHANGE_SETTINGS } from '../constants/index';
import { MessagesActions, OptionsActions } from '../actions';
import { combineReducers } from 'redux';



const initialState: StoreState = { messages: [], options: { userName: '', clockDisplay: 0, theme: 0, sendOnEnter: 0 } }

function messages(state: StoreState = initialState, action: MessagesActions | OptionsActions): StoreState {

    switch (action.type) {
        case ADD_MESSAGES:
            return { ...state, messages: state.messages.concat(action.message) };
        case CREATE_USERNAME:
            return { ...state, options: Object.assign(state.options, action.userName) };
        case CHANGE_SETTINGS:
            return { ...state, options: Object.assign(state.options, action.options) };
    }
    return state;
}



export const rootReducer = combineReducers({
    messages
})