import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";

function FirestoreDB(){

    const [data, setData] = useState([]);
    useEffect(() => { readData() }, []);

    const readData = async () => {
        await getDocs(collection(db, "leaderboard"))
            .then((querySnapshot)=>{    
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setData(newData.sort(( a, b ) => {
                    if ( a.points > b.points ){
                      return -1;
                    }
                    if ( a.points < b.points ){
                      return 1;
                    }
                    return 0;
                  }));            
            })
    };

    return <>
        <h1>LeaderBoard of Who's that Pokemon?</h1>
        <div className="container">
            <ul className="list-group">
                {(data.sort((user) => {return user.points})).map((item) => (
                    <li key={item.user} className="list-group-item bg-info">{item.user} - {item.points} points</li>
                ))}
            </ul>
        </div>
        
    </>
}

export default FirestoreDB;

