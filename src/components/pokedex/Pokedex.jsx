import { useGetPokemonsQuery, selectAllPokemons } from "../../feature/pokemon/pokemon-slice"
import { useSelector, useDispatch } from 'react-redux';
import Tabs from "../Tabs/Tabs";
import Pokemon from "../pokemon/Pokemon";
import './Pokedex.css'
import PokeCard from "../PokeCard/PokeCard";
import { setActivePokemon } from "../../feature/activepokemon/activepokemon-slice";
import { setPokeCards, appendPokeCards } from "../../feature/pokecards/pokecards-slice"
import { setLoadMore } from "../../feature/loadmore/loadmore-slice"
import { useEffect, useState } from "react";
import { createIds } from "../../Utility/Utility";
import Search from "../search/Search";
import Sort from "../sort/Sort";
import { clearSearchList, setSearchList } from "../../feature/searchlist/searchList-slice";

function Pokedex(){
    const {
        data: pokedex
    } = useGetPokemonsQuery();
    const pokedex2 = useSelector((state) => selectAllPokemons(state))
    const dispatch = useDispatch();
    const pokeCards = useSelector((state)=> state.pokecards.value);
    const loadMore = useSelector((state) => state.loadmore.value);
    const searchList = useSelector((state) => state.searchlist.value);
    const [sortType, setSortType] = useState(1);
    const [random, setRandom] = useState(false);
    
    function loadMorePokemon(reset = false,random=false){        
        
        let start = 1;     
        if(!reset) start = pokeCards.length > 1 ?
           pokeCards.length + 1 : 1
        let ids = createIds(start, random, pokeCards)
        if(!random){
            if(pokedex2.length > 0){               
                let realIds;
                realIds = ids.map(id => pokedex2[id-1].id);
              
                ids = [...realIds]
            }          
        }
        if(reset) dispatch(setPokeCards([...ids]))
        else dispatch(appendPokeCards([...ids]))
    }

    function reset(){
        dispatch(setLoadMore(true));
        dispatch(clearSearchList());
        setRandom(false)
        loadMorePokemon(true, false)
        setSortType(1)
        pokedex2.sort((a,b) => a.id - b.id)
    }
    function setRandomPokemon(){
        setRandom(true)
        loadMorePokemon(true,true)
        dispatch(setLoadMore(true))
    }

    function handleSorting(type){
        setSortType(type);
        const tempSearchList = [...searchList];
        switch(type){
            case "1":
                if(loadMore) pokedex2.sort((a,b) => a.id - b.id)
                else tempSearchList.sort((a,b) => a.id - b.id)
                break;
            case "2":
                if(loadMore) pokedex2.sort((a,b) => b.id - a.id)              
                else tempSearchList.sort((a,b) => b.id - a.id)
                break;
            case "3":
                if(loadMore) pokedex2.sort((a,b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1)                    
                else tempSearchList.sort((a,b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase())
                break;
            case "4":
                if(loadMore) pokedex2.sort((a,b) => b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase()  ? 1 : -1)                   
                else tempSearchList.sort((a,b) => b.name.toLocaleLowerCase() > a.name.toLocaleLowerCase())      
                break;
            default:
                console.log('invalid type selected')
        }
        if(loadMore) loadMorePokemon(true,false,type)
        else dispatch(setPokeCards(tempSearchList.map(pokemon => {
            return pokemon.id
        })))


    }

    useEffect(() => {
        loadMorePokemon(true, false);
    }, [])

    return(
        <div>
            <h1 className="app-title">Pokedex</h1>
            <Search />
            <Tabs 
                    tabs={[
                        {name: "Encyclopedia", content:
                            <div>
                                <Sort setRandomPokemonCallback={setRandomPokemon} 
                                    setSort={setSortType}  setSortTypeCallback={handleSorting} />
                                <ul className="pokecards">
                                    {pokeCards.map(pkId => 
                                        <li key={pkId} onClick={()=>dispatch(setActivePokemon(pkId))}>
                                            <PokeCard key={pkId} id={pkId}/>
                                        </li>)   }
                                </ul>
                                <div className="loadmore" >
                                    {loadMore &&
                                        <button className="button" 
                                        onClick={() => loadMorePokemon(false, random)}>Show more Pokemon</button>}
                                        {random &&
                                        <button className="button" 
                                        onClick={() => reset()}>Reset Pokemon List</button>                                                           
                                    }
                                </div>
                            </div>
                        },
                        {name: "Pokemon", content: <Pokemon/>}
                    ]}
                />                
        </div>
    )
}

export default Pokedex;