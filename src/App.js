import './App.css';
import EntryForm from "./EntryForm"
import OldEntries from './OldEntries';

function App() {


  return (
    <div className="App">
      <h1>Confidant</h1>
      <EntryForm />
      <OldEntries />
    </div>
  );
}

export default App;
