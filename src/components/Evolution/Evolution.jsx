import { selectPokemonById, selectAllPokemons } from '../../feature/pokemon/pokemon-slice';
import { setActivePokemon } from "../../feature/activepokemon/activepokemon-slice"
import {useSelector, useDispatch} from 'react-redux';
import './Evolution.css';
import { useEffect, useState } from 'react';

function Evolution(){
    const activePokemon = useSelector((state) => state.activepokemon.value);
    const pokemon = useSelector(state=> selectPokemonById(state, activePokemon));
    const pokedex = useSelector((state) => selectAllPokemons(state));
    const dispatch = useDispatch();
    const [initialForm, setInitialForm] = useState();
    const [firstEvolutions, setFirstEvolutions] = useState([]);
    const [secondEvolutions, setSecondEvolutions] = useState([]);
    const [firstEvoWidth, setFirstEvoWidth] = useState("20%");
    const [initialFormTop, setInitialFormTop] = useState("15px");


    function setEvolutions(){
        if(pokemon){
            setInitialForm(+pokemon.evolution.chain.species.url.split('/')[6]);
            if(pokemon.evolution.chain.evolves_to){
                const firstEvos = [];
                const secondEvos = [];
                pokemon.evolution.chain.evolves_to.forEach( evo => {
                    firstEvos.push(+evo.species.url.split('/')[6])
                    if(evo.evolves_to){
                        evo.evolves_to.forEach(evo2 => {
                            secondEvos.push(evo2.species.url.split('/')[6])
                        })
                    }
                })
                setFirstEvolutions(firstEvos);
                setSecondEvolutions(secondEvos);

                if(secondEvos.length === 0){
                    setFirstEvoWidth("75%");
                    if(firstEvos.length >= 2)
                    {
                        if(firstEvos.length === 3){
                            setInitialFormTop("15px")
                        }
                        else setInitialFormTop("152px")
                    }else{
                        setInitialFormTop("15px")
                        setFirstEvoWidth("20%")
                    }
                }
                else if(secondEvos.length >= 2)
                {
                    setInitialFormTop("152px")
                }
                else{
                    setInitialFormTop("15px")
                }
            }
        }
    }
    
    useEffect(() => {
        setEvolutions();
    },[activePokemon])

    return (
        <section className='evolution-section'>
            <div className='evolutions'>
                <h3 className='evo-text'>Evolutions</h3>
                {firstEvolutions.length === 0 && <p className='evo-text'>This pokemon does not evolve</p>}
                <ul className='evo-lists'>
                    <li className='initial' style={{top:initialFormTop}}>
                        <img className="evo-img" src={pokedex && initialForm && 
                        pokedex.find(pk => pk.id === initialForm).ThumbnailImage}
                        // onClick={()=>dispatch(setActivePokemon(initialForm))}
                        /></li>
                    <li>
                        <ul className='first-section' style={{width:firstEvoWidth}}>
                            {firstEvolutions.length > 0 && 
                                firstEvolutions.map(id =>
                                    <li className='first-evo' key={id}><img className="evo-img" 
                                        src={pokedex.find(pk => pk.id === id).ThumbnailImage}
                                        // onClick={()=>dispatch(setActivePokemon(id))}
                                        /></li>                            
                                )                                
                            }
                        </ul>
                    </li>
                    <li>

                        {secondEvolutions.length > 0 && 
                            <ul className='second-section'>
                                {secondEvolutions.map(id2 =>
                                    <li className='second-evo' key={id2}><img className="evo-img"
                                        src={pokedex.at(id2-1).ThumbnailImage}
                                        // onClick={()=>dispatch(setActivePokemon(id2))}
                                        /></li>                            
                                )}
                            </ul>
                        }
                    </li>
                </ul>       
            </div>
        </section>
    )
}

export default Evolution;