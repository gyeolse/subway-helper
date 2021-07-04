import "./App.css";
import { Route, HashRouter } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  return (
    <HashRouter>
      <Route path="/" exact={true} component={Home} />
      <Route path="/report/:trainNo" component={Detail} />
    </HashRouter>
  );
}

export default App;
