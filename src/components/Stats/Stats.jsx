import {useSelector, useDispatch} from 'react-redux';
import { selectPokemonById } from '../../feature/pokemon/pokemon-slice';
import Type from '../Types/Type'
import './Stats.css'

function Stats(){
    const activePokemon = useSelector((state) => state.activepokemon.value);
    const pokemon = useSelector(state=> selectPokemonById(state, activePokemon));
    
    return(
        <div>
            <label>Height: </label><label  style={{"fontWeight":"bold"}}>{pokemon.height}</label>
            <label>   Weight: </label><label  style={{"fontWeight":"bold"}}>{pokemon.weight}</label><br/><br/>
            
            <label>Types: </label>
            <ul className='types'>
                {
                    pokemon && pokemon?.type.map(type =>(
                        <li key={type}><Type type={type[0].toLocaleUpperCase() + 
                            type.slice(1)}/></li>
                    ))
                }
            </ul>
            <label>Weakness: </label>
            <ul className='types'>
                {
                    pokemon && pokemon?.weakness.map(type =>(
                        <li key={type}><Type type={type}/></li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Stats;