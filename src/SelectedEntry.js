import { useState, useEffect } from "react";
import firebase from "./firebase";
import {Link, useParams} from "react-router-dom"
import {getDatabase, onValue, ref} from "firebase/database"

const SelectedEntry = () => {
    const {entryID} = useParams();
    
    const [currentEntry, setCurrentEntry] = useState({key:"", entry:{date:"", content:"",title:""}})

    useEffect( () => {
        // create variable to hold database details
        const database = getDatabase(firebase);
        // create variable that makes a reference to database
        const dbRef = ref(database);
        // get database info on load or on change
        onValue(dbRef, (response) => {
          // change database info into proper format
          const data = response.val();
          // iterate through data using for loop
          for (let key in data) {
            if (key === entryID) {
                setCurrentEntry({key: key, entry:data[key]})
            }
          }
        })
    }, [entryID]);

    return (
        <div className="wrapper selectedWrapper">
            <h2>{currentEntry.entry.title} - {currentEntry.entry.date}</h2>
            <p>{currentEntry.entry.content}</p>
            <Link to={"/"}>
                <button>Return Home</button>
            </Link>
        </div>
    )
}

export default SelectedEntry;