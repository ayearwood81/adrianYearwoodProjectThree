import './App.css';
import EntryForm from "./EntryForm"
import SelectedEntry from './SelectedEntry';
import OldEntries from './OldEntries';
import {Routes, Route} from "react-router-dom"
import Footer from './Footer';

function App() {


  return (
    <div className="app">
      <body>
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
      </body>
      <Footer />
    </div>
  );
}

export default App;
