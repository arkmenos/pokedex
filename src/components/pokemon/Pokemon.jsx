import {useSelector, useDispatch} from 'react-redux';
import { selectPokemonById } from '../../feature/pokemon/pokemon-slice'; 
import { setActivePokemon } from '../../feature/activepokemon/activepokemon-slice';
import { useGetSpeciessQuery } from '../../feature/pokemon/species-slice';
import { useGetDetailsQuery } from '../../feature/pokemon/details-slice';
import Stats from '../Stats/Stats';
import Details from '../Details/Details';
import './Pokemon.css'
import Evolution from '../Evolution/Evolution';
// import { useGetPokemonsQuery } from "../../feature/pokemon/pokemon-slice"


function Pokemon(){
    
    const activePokemon = useSelector((state) => state.activepokemon.value);
    const pokemon = useSelector(state=> selectPokemonById(state, activePokemon));
    const prevPokemon = useSelector(state => selectPokemonById(state, 
        activePokemon === 1 ? 1025 : activePokemon - 1));
    const nextPokemon = useSelector(state => selectPokemonById(state, 
        activePokemon === 1025 ? 1 : activePokemon + 1));
    
    const {
        data: species, isLoading,isSuccess, isError, error
    } = useGetSpeciessQuery(activePokemon);
    const {
        data: details,
    } = useGetDetailsQuery(activePokemon);
    const dispatch = useDispatch();


    if(pokemon){
        // if(species){
        //     console.log(species)
        // }

        return(
            <div className='pokemon-details'>
                <div className='name-and-img'>
                    <p className='name-and-number'>
                        <button className='buttons previous' 
                            onClick={()=>dispatch(setActivePokemon(prevPokemon.id))}>
                            &laquo; {prevPokemon.number} {prevPokemon.name}
                        </button>
                        &emsp;&emsp;{pokemon.name}  #{pokemon.number}&emsp;&emsp;
                        <button className='buttons next'
                            onClick={()=>dispatch(setActivePokemon(nextPokemon.id))}>
                             {nextPokemon.name} {nextPokemon.number} &raquo;
                        </button>
                    </p>
                    <div className='details-img-div'>
                        <img className='details-img' src={pokemon.ThumbnailImage}/>
                    </div>
                </div>
                <Stats />
                <Evolution/>
                <Details/>
            </div>
        )
    }
    
    else 
    {   
        // console.log(id)
        // console.log(pokemon)
        return null
    }
}

export default Pokemon;