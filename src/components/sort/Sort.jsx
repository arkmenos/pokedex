import { useState } from "react";
import './Sort.css'

function Sort(props){
    const [sortType, setSortTypes] = useState(props.setSortType)
    function handleClick(){
        props.setRandomPokemonCallback();
    }

    function handleSort(event){
        props.setSortTypeCallback(event.target.value);
        setSortTypes(event.target.value)
    }

    return(
        <div className="sort-area">
            <button className="random-button" onClick={()=>handleClick()}>Random Pokemon</button>
            <label className="sort-label">Sort by</label>
            <select className="sort-dropdown" defaultValue={"1"} >
                <option value="1" onClick={handleSort}>Lowest Number to Highest Number</option>
                <option value="2" onClick={handleSort}>Highest Number to Lowest Number</option>
                <option value="3" onClick={handleSort}>A - Z</option>
                <option value="4" onClick={handleSort}>Z - A</option>
            </select>
        </div>
    )
}

export default Sort;