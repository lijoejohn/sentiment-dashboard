import "./App.css";
import Dashboard from "./components/Dashboard";
import { ErrorBoundary } from "./components/ErrorBoundary";

function App() {
  return (
    <div className=" w-full">
      <ErrorBoundary>
        <Dashboard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
