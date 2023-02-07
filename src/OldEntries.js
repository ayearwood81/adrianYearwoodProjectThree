import { useState, useEffect, useRef } from "react";
import firebase from "./firebase";
import {getDatabase, onValue, ref, remove} from "firebase/database"

const OldEntries = () => {

    const [oldEntries, setOldEntries] = useState([]);
    const inputRef = useRef();

    useEffect( () => {
        // create variable to hold database details
        const database = getDatabase(firebase);
        // create variable that makes a reference to database
        const dbRef = ref(database);
        // get database info on load or on change
        // use event listener on database
        onValue(dbRef, (response) => {
          // change database info into proper format
          const data = response.val();
          // empty array to store all user entries
          const userData = []; 
          // iterate through data using for loop
          for (let key in data) {
            userData.push(
              {key: key, entry: data[key]}
            )
          }
          // set state to match no-longer-empty array
          setOldEntries(userData);
        })
    }, []);
    
    const handleToggle = () => {
        if (inputRef.current.checked) {
            inputRef.current.checked = false;
        } else {
            inputRef.current.checked = true;
        }
    }

    const handleEntryClick = (entryID) => {
        console.log("entry clicked", entryID);
        if (window.confirm("Reread this entry?")) {
            console.log("chose to reread");
        } else if (window.confirm("Delete this entry?")) {
            const database = getDatabase(firebase);
            const dbRef = ref(database, `${entryID}`);
            remove(dbRef);
        } 
    }
    
    return (
        <div className="wrapper">
            <div className="collapsibleMenu">
                <input ref={inputRef} type="checkbox" id="menu"></input>
                <label htmlFor="menu">
                    <button onClick={handleToggle} className="menuButton"><i className="fa-regular fa-square-caret-down"></i>Previous Entries</button>
                    <span className="listNumber">{`(${oldEntries.length})`}</span>
                </label>
                <div className="menuContent">
                    <ul>
                        {
                            oldEntries.map( (oldEntry) => {
                                return(
                                    <li key={oldEntry.key}>
                                        <button onClick={() => handleEntryClick(oldEntry.key)}>{`${oldEntry.entry.date}: ${oldEntry.entry.title}`}</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default OldEntries;