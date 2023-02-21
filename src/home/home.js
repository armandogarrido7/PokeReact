import FirestoreDB from "../firestore/firestore";
function Home(){
    return (
        <>
        <div>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png' alt='pokemon_logo' className="img-fluid"/>
            <img src='https://www.freeiconspng.com/thumbs/pikachu-transparent/pikachu-transparent-hd-1.png' alt='pikachu'/>
        </div>
        <FirestoreDB/>
        </>
    );
}

export default Home;