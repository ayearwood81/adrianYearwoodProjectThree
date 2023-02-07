import { useState, useEffect } from "react";
import firebase from "./firebase";
import {getDatabase, onValue, push, ref, remove} from "firebase/database"

const OldEntries = () => {

    const [oldEntries, setOldEntries] = useState([]);

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
    
    console.log(oldEntries);
    
    return (
        <div className="collapsible-menu">
            <input type="checkbox" id="menu"></input>
            <label htmlFor="menu">
                <button className="menu-button"><i className="fa-regular fa-square-caret-down"> Your List</i></button>
                <span className="list-number"></span>
                </label>
            <div className="menu-content">
                <ul>
                    {
                        oldEntries.map( (oldEntry) => {
                            return(
                                <li key={oldEntry.key}>
                                    <button>{`${oldEntry.entry.date}: ${oldEntry.entry.title}`}</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
	    </div>
    )
}

export default OldEntries;