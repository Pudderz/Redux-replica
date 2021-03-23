import logo from "./logo.svg";
import "./App.css";
import { createStore } from "./redux/createStore";

function App() {
  const reducer = (state, action) => {
    if (action.type === "INC") {
      return { ...state, number: state.number + action.payload };
    }

    if (action.type === "DEC") {
      return { ...state, number: state.number - action.payload };
    }
    return { state };
  };

  const store = createStore(reducer, { number: 0 });

  const listener = () => console.log(store.getState());
  store.subscribe(listener);

  store.dispatch({ type: "INC", payload: 5 });
  store.dispatch({ type: "INC", payload: 2 });
  store.dispatch({ type: "DEC", payload: 7 });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
