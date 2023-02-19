import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SinglePokemon({ pokemonURL}) {
    const [pokemonData, setPokemonData] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    
    useEffect(() => { getPokemonData() }, []);

    function getPokemonData(){
        fetch(pokemonURL)
        .then((response) => response.json())  
        .then((apiData) => {
            setPokemonData(apiData);
            setHasLoaded(true);
        });
    }

    if(hasLoaded){
        return(
            <>
            <div className="card col-3">
                <img src={pokemonData.sprites.other.home.front_default} className="card-img-top" alt={pokemonData.name}/>
                <div className="card-body">
                    <h5 className="card-title fs-2">{pokemonData.name.toUpperCase()}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{pokemonData.types[0].type.name.toUpperCase()}</h6>
                    <Link to={`/pokemon/${pokemonData.name}`} className="btn btn-success mt-4">More Data</Link>
                </div>
            </div>
            </>
          );  
    }
    
}

export default SinglePokemon;