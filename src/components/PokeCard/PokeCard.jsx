import {useSelector, useDispatch} from 'react-redux';
import { selectPokemonById } from '../../feature/pokemon/pokemon-slice';
import { setActiveIndex } from '../../feature/activeindex/activeindex-slice';
import { setActivePokemon } from '../../feature/activepokemon/activepokemon-slice';
import './PokeCard.css'

function PokeCard({id}){
    const pokemon = useSelector(state=> selectPokemonById(state, id))
    const dispatch = useDispatch();

    function handleClick(id){
        dispatch(setActiveIndex(1));
        dispatch(setActivePokemon(id))
    }
    if(pokemon){
            return(
                <div className="pokecard">
                    <div>
                        <img className="pokeimage"src={pokemon.ThumbnailImage}
                            onClick={()=>handleClick(pokemon.id)}/>
                    </div>
                    <div className='pokenamearea'>
                        <p className='pokenumber'>#{pokemon.number}</p>
                        <p className='pokename'>{pokemon.name}</p>
                    </div>
            </div>
        )    
    }
}

export default PokeCard;