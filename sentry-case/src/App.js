import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Start from "./pages/Start";
import * as Sentry from "@sentry/react";
function App() {
  const transaction = Sentry.startTransaction({
    name: "从页面B到页面C的流程",
    op: "business-flow",
  });

  return (
    <div>
      <Router>
        <Link to="/home">Home</Link>
        <Routes>
          <Route path="/" exact element={<Start transaction={transaction} />} />
          <Route
            path="/home"
            exact
            element={<Home transaction={transaction} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
