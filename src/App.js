import "./App.scss";
import MainView from "./components/main";

function App() {
  return (
    <div className="App">
      {<MainView />}
      <p>
        Created by{" "}
        <a href="https://github.com/hieund20" target="_blank" rel="noreferrer">
          hieund
        </a>
      </p>
      <p>
        <a href="https://devchallenges.io/" target="_blank" rel="noreferrer">
          https://devchallenges.io
        </a>{" "}
      </p>
    </div>
  );
}

export default App;
