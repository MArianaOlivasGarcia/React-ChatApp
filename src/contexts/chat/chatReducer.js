import { types } from "../../types/types";



export const chatReducer = ( state, action ) => {

    switch ( action.type ) {
        
        case types.getUsers:
            return {
                ...state,
                users: [ ...action.payload ]
            }

        case types.showChat:
            // Si el userTo es el mismo retornar el mismo state para evitar limpiar los mensaje
            if ( state.userTo === action.payload ) return state
            
            return {
                ...state,
                userTo: action.payload,
                messages: []
            }

        case types.newMessage:
            
            if ( state.userTo === action.payload.para || state.userTo === action.payload.de ) {
                return {
                    ...state,
                    messages: [ ...state.messages, action.payload ]
                }
            } else {
                return state;
            }

        case types.getAllMessages:
            return {
                ...state,
                messages: [...action.payload]
            }


        case types.chatClean:
            return {
                uid: '',
                userTo: null,
                users: [],
                messages: []
            }
    
        default:
            return state;
    }

}