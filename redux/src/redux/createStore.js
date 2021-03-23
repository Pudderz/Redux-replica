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
        if(typeof listener !== "function"){
            throw new Error("Listener has to be function")
        }
        if(isDispatching) throw new Error("cannot subscribe while dispatching")

        let isSubscribed = true;


        nextListeners.push(listener);

        return function unsubscribe(){
            if(!isSubscribed) return

            if(isDispatching)throw new Error("cannot unsubscribe while dispatching")

            isSubscribed = false;

            const index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
            currentListeners = null;
        }
    }



    const dispatch=(action)=>{

        // runs dispatcher function with currentState and action as arguments and will return a new
        // state

        try{
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }


        //Runs all listener functions after a dispatch

        const listeners = currentListeners;
        for(let i = 0; i< listeners.length; i++){
            const listener = listeners[i];
            listener();
        }

        return action;
    }


    const replaceReducer = (reducer)=>{
        if(isDispatching) throw new Error("cannot replace reducer during dispatch")
        if(typeof reducer !== "function") throw new Error("Reducer has to be a function")

        currentReducer = reducer;
        
    }

    const store = {
        dispatch,
        subscribe,
        getState,
        replaceReducer,
    }

    return store;
} 