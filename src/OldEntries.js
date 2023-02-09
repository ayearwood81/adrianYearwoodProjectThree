import { useState, useEffect, useRef } from "react";
import firebase from "./firebase";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";
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

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
    })

    const handleRemove = (oldEntry) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your entry has been deleted.',
                    'success',
                )
                const database = getDatabase(firebase);
                const dbRef = ref(database, `${oldEntry.key}`);
                remove(dbRef);
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your secrets are safe with me ;)',
                    'success'
                )
            }
        })
    }
    
    return (
        <div className="wrapper bottomWrapper">
            <div className="collapsibleMenu">
                <input ref={inputRef} type="checkbox" id="menu"></input>
                <label htmlFor="menu">
                    <button onClick={handleToggle} className="menuButton"><i className="fa-regular fa-square-caret-down"></i>Previous Entries</button>
                </label>
                <div className="menuContent">
                    <ul>
                        {
                            oldEntries.map( (oldEntry) => {
                                return(
                                    <li key={oldEntry.key}>
                                        <Link to={`/${oldEntry.key}`}>
                                            <button className="entryButton">{`${oldEntry.entry.title} - ${oldEntry.entry.date}`}</button>
                                        </Link>
                                        <button className="deleteButton" onClick={() => handleRemove(oldEntry)} ><i className="fa-solid fa-trash"/></button>
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