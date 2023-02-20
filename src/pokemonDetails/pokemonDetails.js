import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './pokemonDetails.css';

function PokemonDetails(){
    const name = useParams().pokemonName;
    const [pokemonData, setPokemonData] = useState({});
    const [hasLoaded, setHasLoaded] = useState(false);
    const [pokemonStats, setPokemonStats] = useState([]);
    
    useEffect(() => { getPokemonData() }, []);

    function getPokemonData(){
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())  
        .then((apiData) => {
            setPokemonData(apiData);
            setHasLoaded(true);
            setPokemonStats(apiData.stats);
        });
    }

    if(hasLoaded) return(
        <div className="bg-dark p-2">
        <div className="card bg-light p-5 w-50 mx-auto my-5 fluid-container">
            <h1 className="text-center">{ name.toLocaleUpperCase() }</h1>
            <img
            className="mx-auto pokemon_img"
            src={pokemonData.sprites.other.home.front_default}
            alt={pokemonData.name}
            />
            <div className="card-body row">
                <h4>TYPE: <span className="text-primary-emphasis">{pokemonData.types[0].type.name.toUpperCase()}</span></h4>
                <h5 className="col-6">HEIGHT: <span className="text-primary-emphasis">{pokemonData.height} m</span></h5>
                <h5 className="col-6">WEIGHT: <span className="text-primary-emphasis">{pokemonData.weight} kg</span></h5>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th colSpan={2}><h3>Base Stats</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                    {pokemonStats.map((stat) => {
                        return (
                            <tr key={stat.stat.name}>
                                <th>{stat.stat.name.toLocaleUpperCase()}</th>
                                <th className="text-primary-emphasis">{stat.base_stat}</th>
                            </tr>
                        )
                    })}
                    </tbody>
                    </table>
                    <h3>Sprites</h3>
                    <div className="fluid-container">
                        <img src={pokemonData.sprites.front_default} alt="pokemon_front_default" className="sprite"/>
                        <img src={pokemonData.sprites.back_default} alt="pokemon_back_default" className="sprite"/>
                        <img src={pokemonData.sprites.front_shiny} alt="pokemon_front_shiny" className="sprite"/>
                        <img src={pokemonData.sprites.back_shiny} alt="pokemon_back_shiny" className="sprite"/>
                    </div>
                    <Link to="/pokemons" className="btn btn-primary">Back to Pokemons List</Link>

            </div>
        </div>
        </div>
    );
}

export default PokemonDetails;