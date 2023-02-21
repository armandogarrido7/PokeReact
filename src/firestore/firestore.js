import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useState, useEffect } from "react";
import './firestore.css';
function FirestoreDB(){

    const [hasLoaded, setHasLoaded] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => { readData() }, []);

    const readData = async () => {
        await getDocs(collection(db, "leaderboard"))
            .then((querySnapshot)=>{    
                setHasLoaded(true);
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

    if(hasLoaded) {
        return <>
        <h1>LeaderBoard of Who's that Pokemon?</h1>
        <div className="container">
            <table className="table m-auto">
                <tbody>
                <tr>
                    <td></td>
                    <td className="card p-2 m-2 d-flex flex-column align-items-center">
                        <img src='https://images.wikidexcdn.net/mwuploads/wikidex/e/eb/latest/20230115164446/Master_Ball_EP.png' alt="master_ball" className="pokeball_img"/>
                        <h5 className="gold_medal p-2 rounded">{data[0].user} - {data[0].points} points</h5>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td className="card p-2 m-2 d-flex flex-column align-items-center">
                        <img src='https://images.wikidexcdn.net/mwuploads/wikidex/9/9f/latest/20230115164434/Ultra_Ball_EP.png' alt="ultra_ball" className="pokeball_img"/>
                        <h5 className="silver_medal p-2 rounded">{data[1].user} - {data[1].points} points</h5>
                    </td>
                    <td></td>
                    <td className="card p-2 m-2 d-flex flex-column align-items-center">
                        <img src='https://images.wikidexcdn.net/mwuploads/wikidex/3/3f/latest/20230115164421/Super_Ball_EP.png' alt="super_ball" className="pokeball_img"/> 
                        <h5 className="bronze_medal p-2 rounded">{data[2].user} - {data[2].points} points</h5>
                    </td>
                </tr>
            
                {(data.slice(3, data.length)).map((item) => (
                    <tr key={item.user}>
                        <td></td>
                        <td key={item.user} className="card p-2 m-2 d-flex flex-row align-items-center">
                            <img src='https://images.wikidexcdn.net/mwuploads/wikidex/6/6a/latest/20230115164405/Pok%C3%A9_Ball_EP.png' alt="pokeball" className="pokeball_img_small"/>
                            <h6 className="bg-info p-2 rounded">{item.user} - {item.points} points</h6>
                        </td>
                    </tr>
                    
                ))}
            </tbody>
            </table>
        </div>
        
    </>
    }
}

export default FirestoreDB;

