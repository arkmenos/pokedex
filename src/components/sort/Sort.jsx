import './Sort.css'

function Sort(props){

    return(
        <div className="sort-area" data-tap-disabled="true">
            <button className="random-button" onClick={()=>props.setRandomPokemonCallback()}>Show random list of Pokemon</button>
            <label className="sort-label">Sort by</label>
            <select id="sort-dropdown" className="sort-dropdown" defaultValue={"1"} 
                onChange= {e=> props.setSortTypeCallback(e.target.value)} >
                <option value="1">Lowest Number to Highest Number</option>
                <option value="2">Highest Number to Lowest Number</option>
                <option value="3">A - Z</option>
                <option value="4">Z - A</option>
            </select>
        </div>
    )
}

export default Sort;