import './App.css';
import EntryForm from "./EntryForm"
import SelectedEntry from './SelectedEntry';
import OldEntries from './OldEntries';
import {Routes, Route} from "react-router-dom"

function App() {


  return (
    <div className="App">
      <h1>Confidant</h1>
      <Routes>
        <Route path ="/" element={
          <>
            <EntryForm />
            <OldEntries />
          </>
        }/>;
        <Route path ="/:entryID" element={<SelectedEntry />}/>;
        <Route path="*" element={<h2>Error</h2>}/>;
      </Routes>
    </div>
  );
}

export default App;
