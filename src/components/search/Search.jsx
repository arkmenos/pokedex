import { setLoadMore } from "../../feature/loadmore/loadmore-slice";
import { setActiveIndex } from "../../feature/activeindex/activeindex-slice";
import { setPokeCards } from "../../feature/pokecards/pokecards-slice";
import { selectAllPokemons } from "../../feature/pokemon/pokemon-slice"; 
import { setSearchList } from "../../feature/searchlist/searchList-slice"
import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import './Search.css'


function Search(){
    const pokedex = useSelector((state) => selectAllPokemons(state))
    const [inputValue, setInputValue] = useState("");
    // const [dropDown, setDropDown] = useState(null);
    const dispatch = useDispatch();

    function filterNames(event){    
            setInputValue(event.target.value);
            const doc = document.querySelector(".dropdown-content");
            if(doc.childElementCount != 0 || event.target.value !=="")doc.style.display = "block"      
    }
   
    function handleSearch(){
        let tempCards = [];
        if(isNaN(parseInt(inputValue))){
            const filteredList = pokedex.filter(pokemon => 
                pokemon.name.toLocaleLowerCase()
                .includes(inputValue.toLocaleLowerCase()))
            if(filteredList.length > 0){
                tempCards = filteredList.map(item => item.id)
            }               
        }
        else{
            if(+inputValue > 0 && inputValue < 1026 &&
                pokedex.filter(pokemon => pokemon.id === parseInt(inputValue))){
                tempCards.push(+inputValue)
            }
        } 
        if(tempCards.length > 0){
            dispatch(setLoadMore(false));
            dispatch(setPokeCards(tempCards));
            dispatch(setSearchList(tempCards.map(id => {
                return pokedex.find(pokemon => pokemon.id === id)
            })))
            dispatch(setActiveIndex(0))
        }

        clearDropDown();
    }

    function dropDownSelection(name)
    {
        setInputValue(name);
        clearDropDown();
    }
    
    function handleKeyPress(event){
        if(event.key === 'Enter'){
            handleSearch();
        }
    }
    
    function clearDropDown(){
        const doc = document.querySelector(".dropdown-content");
        doc.style.display = "none"
    }

    useEffect(()=> {
        clearDropDown();
    },[])
    return (
        <div className="search-area">
            <div>
                <input className="search-input" type="text"
                    onChange={filterNames} onMouseDown={filterNames}
                    onKeyDown={handleKeyPress}
                     value={inputValue} />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            <div className="dropdown-content" style={{display:"block"}}>
                {
                    inputValue && pokedex && 
                        pokedex.filter(pokemon =>
                        pokemon.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
                        )
                        .slice(0,8)
                        .map(pokemon => (
                            <div key={pokemon.name}
                                onClick={() => dropDownSelection(pokemon.name)}>
                                {pokemon.name}
                            </div>
                        ))               
                }

            </div>
        </div>
    )
}

export default Search;