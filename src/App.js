import logo from "./logo.svg";
import "./App.css";
import MainView from "./components/main";
import { useState } from "react";

function App() {
  const [isLoading, setLoading] = useState(false);

  return <div className="App">{<MainView uploading={setLoading} />}</div>;
}

export default App;
