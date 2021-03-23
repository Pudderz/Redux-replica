export const createStore = (reducer, preloadedState)=>{


    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = [];
    let nextListeners = currentListeners;
    let isDispatching = false;


    // returns current state
    const getState = () =>{
        if(isDispatching) throw new Error("get state cannot be called in dispatch");
        
        return currentState;
    } 




    //Adds a change listener
    //  listener - callback function to be invoked any time an action has been dispatched and
    // the current state might of changed


    const subscribe = (listener)=>{
    }



    const dispatch=(action)=>{
    }


    const replaceReducer = (reducer)=>{
    }

    const store = {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
    }

    return store;
} 