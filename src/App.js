import logo from "./logo.svg";
import "./App.css";
import DisplayTask from "./components/DisplayTask";
import { CreateTask } from "./components/CreateTask";
function App() {
  return (
    <>
    <CreateTask />
      <DisplayTask />
    </>
  );
}

export default App;
