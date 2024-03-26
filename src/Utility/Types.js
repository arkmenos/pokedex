const Types = (function () { 
    const days = { 
        NORMAL: "grey", 
        FIGHTING: "orange", 
        FLYING: "skyblue", 
        POISON: "purple", 
        GROUND: "burlywood", 
        ROCK: "brown", 
        BUG: "green",
        GHOST: "purple", 
        STEEL: "steelblue", 
        FIRE: "red", 
        WATER: "blue", 
        GRASS: "green", 
        ELECTRIC: "yellow", 
        PSYCHIC: "purple",
        ICE: "lightblue", 
        DRAGON: "gold", 
        DARK: "lighslategray", 
        FAIRY: "pink", 
        UNKNOWN: "white", 
        SHADOW: "gray"
    }; 
    return { 
        get: function (name) { 
            return days[name.toLocaleUpperCase()]; 
        } 
    }; 
})(); 

export default Types;