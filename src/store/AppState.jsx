import React, {useReducer} from 'react'

import taskReducer from './reducers/taskReducer'
import userReducer from './reducers/userReducer';

/////////////////////////////////////////////////////////
////////////// INITIAL STATE ////////////////////////////
/////////////////////////////////////////////////////////
const initialState = {
    serverURL: '',
    formToggle: {
        taskToUpdate: null, 
        toggle: false
    },
    userAuthStatus: {
		loading: true,
		error: '',
        isUserLoggedIn: false,
	},
    user: {
        token: null,
        user_id: null,
        username: '',
        email: ''
    },
    standup: '',
    darkTheme: null, 
    tasks: null,
    latestTask: null,
    deletedTask: null,
    refreshState: false,
    lightMode: false,
    monthly: null,
    notification: {
      status: '',
      message: ''
    }
}

////////////////////////////////////////////////////////////////////
// REDUCER //
////////////////////////////////////////////////////////////////////
export const reducer = (state, action) => {
    let newState;
    const {type, payload} = action
    
    switch(action.type){
        case "SET_MONTHLY":
            newState = {...state, monthly: action.payload}
            return newState
            break;
        case "LATEST_STAND_UP":
            newState = {...state, standup: action.payload}
            return newState
            break;
        case "DARK_THEME":
            newState = {...state, darkTheme: action.payload}
            return newState
            break;
        case "FORM_TOGGLE":
            newState = {...state, formToggle: action.payload}
            return newState
            break;
        case "AUTH":
            newState = {...state, user: action.payload}
            return newState
            break;
        case "LIGHT_DARK_MODE":
            newState = {...state, lightMode: action.payload}
            return newState
            break;
        case "STATE_REFRESH":
            newState = {...state, refreshState: action.payload}
            return newState
            break;
        case "NOTIFICATION_STATUS":
          newState = {...state, notification: action.payload}
          return newState
          break;
        case "LOGOUT":
            newState = {...state, token: null, user: [{}]}
            return newState
            break;
        case "GETTASKS":
            newState = {...state, tasks: action.payload}
            return newState;
            break;
        case "ADD_TO_LOCAL_STORAGE":
            newState = {...state, tasks: action.payload}
            return newState;
            break;
        default: 
            return state 
            break;
    }
};

////////////////////////////////////////////////////////////////////
// COMBINE REDUCERS //
////////////////////////////////////////////////////////////////////
const combineReducers = (...reducers) => {
    return (state, action) => {
      return reducers.reduce((currentState, reducer) => {
        return reducer(currentState, action);
      }, state);
    };
  };
  

const combinedReducer = combineReducers(reducer, userReducer, taskReducer);

////////////////////////////////////////////////////////////////////
// APP CONTEXT //
////////////////////////////////////////////////////////////////////
const AppContext = React.createContext(null)


////////////////////////////////////////////////////////////////////
// APP STATE COMPONENT //
////////////////////////////////////////////////////////////////////
export const AppState = (props) => {
    const [state, dispatch] = useReducer(combinedReducer, initialState)
    
    return (
            <AppContext.Provider value={{state, dispatch}}>
                {props.children}
            </AppContext.Provider>
    )
}

////////////////////////////////////////////////////////////////////
// USEAPPSTATE HOOK //
////////////////////////////////////////////////////////////////////

export const useAppState = () => {
    return React.useContext(AppContext)
}
