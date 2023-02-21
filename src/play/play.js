import './play.css';
import { useState, useEffect } from 'react';
import { setDoc, collection, getDocs, getDoc, query, where, doc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from '../firebase';

function Play(){
    const [canClick, setCanClick] = useState(true);
    const [points, setPoints] = useState(0);
    const [lose, setLose] = useState(false);
    const [pokemonData, setPokemonData] = useState({});
    const [pokemon, setPokemon ] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [options, setOptions] = useState([]);
    const [pokeImageSrc, setPokeImageSrc] = useState('');
    const [data, setData] = useState([]);
    
    useEffect(() => { readData() }, []);
    useEffect(() => { getPokemonsData() }, []);

    const readData = async () => {
        await getDocs(collection(db, "leaderboard"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setData(newData);                
            })
    };

    async function writeData() {
        try{
            const docRef = await setDoc(doc(db, "leaderboard", auth.currentUser.email), {
                user: auth.currentUser.email,
                points: points
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    async function updatePoints() {
        try{
            if (auth.currentUser){
            const docRef = doc(db, "leaderboard", auth.currentUser.email);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                if (points > docSnap.data().points && points > 0){
                    writeData();
                }
            } else{
                if (points > 0){
                    writeData();
                }
            } 
        }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    function getPokemonsData(){
        fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=100000')
        .then((response) => response.json())  
        .then((apiData) => {
            setPokemonData(apiData);
            if (!hasLoaded){
               choosePokemon(apiData);
            }
        });
    }
    function choosePokemon(apiData){
        for (let i=0;i<4;i++){
            let rnd_num = Math.floor(Math.random() * 1008);
            if (i === 0){
                fetch('https://pokeapi.co/api/v2/pokemon/' + apiData.results[rnd_num].name)
                .then((response) => response.json())
                .then((pokeData) => {
                    setPokemon(pokeData);
                    console.log(pokeData);
                    setPokeImageSrc(pokeData.sprites.front_default);
                    setHasLoaded(true);
                    setCanClick(true);
                })
            }
            if ( options.length < 4 ){
                setOptions(options.push(apiData.results[rnd_num].name));
            }
            };
        setOptions(options.sort(() => {return Math.random() - 0.5}));
    }
    function replay(){
        setCanClick(true);
        let poke_img = document.getElementsByClassName('pokemon_img')[0];
        poke_img.classList.add('black_pokemon');
        setLose(false);
        setPoints(0);
        setOptions(options.length = 0);
        choosePokemon(pokemonData);
    }

    function checkAnswer(answer){
        setCanClick(false);   
        if (answer.option === pokemon.name){
            setPoints(points+1);
            let poke_img = document.getElementsByClassName('black_pokemon')[0];
            poke_img.classList.remove('black_pokemon');
            document.getElementById(answer.option).classList.add('bg-success')
            setTimeout(() => {
                let poke_img = document.getElementsByClassName('pokemon_img')[0];
                poke_img.classList.add('black_pokemon');
                setOptions(options.length = 0);
                choosePokemon(pokemonData);
            }, 1000)
        }
        else{
            setCanClick(false);
            updatePoints();            
            document.getElementById(answer.option).classList.add('bg-danger');
            document.getElementById(pokemon.name).classList.add('bg-success')
            setLose(true);
            let poke_img = document.getElementsByClassName('black_pokemon')[0];
            poke_img.classList.remove('black_pokemon');
        }
    }
    const optionsDiv = options.map((option) => {
        return(
        <div className='card col-5 m-2 p-2 btn btn-light' role="button" onClick={!canClick ? ()=>{}:() => {checkAnswer({ option })}} id={ option } key={ option }>
            <h2 className='card-text'>{ option }</h2>
        </div>
        )
    })
    
    if (hasLoaded){
        return(
            <div className="container my-4 bg-dark">
            { lose && <img src="./img/lose_img.png" alt="lose" className='lose_img'/>}
            <div className='row py-3'>
                <div className='card bg-white p-3 my-3 col-2 offset-5'>
                    <img src={pokeImageSrc} className="pokemon_img black_pokemon card-img-top" alt={pokemonData.name}/>
                </div>
                <div className='d-flex flex-wrap justify-content-around'>
                    { optionsDiv }
                </div>
            </div>
            <div className='text-primary m-3'>
                <h2>Score: <span className='text-warning'>{ points }</span></h2>
            </div>
            <button className="btn btn-primary play_again_btn m-3" onClick={replay}>Play Again</button>
            </div>
          );  
        }
           
}

export default Play;