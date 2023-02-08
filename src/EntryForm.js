import { useState } from "react";
import firebase from "./firebase";
import {push, ref, getDatabase} from "firebase/database"
import Swal from "sweetalert2";

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

      if (body && title) {
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
      } else {
        Swal.fire(
          'Oops!',
          'Missing Title or Content!',
          'question'
        )
      }
    }

    return (
        <div className="wrapper">
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
                    placeholder="Dear Diary..."
                    value={body}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EntryForm;