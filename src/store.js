import { createStore } from "redux";

// add redux functions here

const initialState = {
    //object here
    user: {
        email: '',
        password: '',
        isAuthenticated: false
    }
}

function reducer (state = initialState, action){
    if(action.type === 'login'){
        state.user.email = action.payload.username
        state.user.isAuthenticated = true;
        state.user = {...state.user}
    }else if(action.type === 'logout'){
        state.user.email = null
        state.user.isAuthenticated = false;
        state.user = {...state.user}
    }
    console.log("dddd",state.user)
    return {...state}
    
}


const store = createStore(reducer);

export default store;