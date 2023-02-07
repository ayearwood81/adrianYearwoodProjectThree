import { useState } from "react";
import firebase from "./firebase";
import {push, onValue, ref, getDatabase, remove} from "firebase/database"

const EntryForm = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const entryDate = `${day}-${month}-${year}`;


    const handleBodyChange = (e) => {
      setBody(e.target.value);
    }
    
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      console.log(body, title, entryDate);

      const diaryEntry = {
        content:body,
        title:title,
        date: entryDate,
      }
  
      push(dbRef, diaryEntry);
  
      setBody("");
      setTitle("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit} action="submit" className="entryForm" name="entryForm">
                <label htmlFor="entryTitle">Title</label>
                <input 
                    onChange={handleTitleChange} 
                    id="entryTitle" 
                    type="text" 
                    placeholder="Title"
                    value={title}
                />
                <label htmlFor="entryBody">Diary Entry</label>
                <textarea 
                    onChange={handleBodyChange} 
                    id="entryBody" 
                    type="textarea" 
                    rows="10"
                    value={body}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EntryForm;