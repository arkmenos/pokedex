import {useSelector} from 'react-redux';
import { useGetSpeciessQuery } from '../../feature/pokemon/species-slice';
import { useEffect, useState } from 'react';
import './Details.css'

function Speciesspecies(){
    const activePokemon = useSelector((state) => state.activepokemon.value);
    const { data: species } = useGetSpeciessQuery(activePokemon);
    const [details, setDetails] = useState();


    function setAllDetails(){
        const tempDetails = new Map();
        species && species.flavor_text_entries.forEach(entry => {
            if(entry.language.name === "en"){
                if(tempDetails.get(entry.flavor_text)){
                    const versions = [...tempDetails.get(entry.flavor_text), entry.version.name];
                    tempDetails. set(entry.flavor_text, versions);
                }
                else{
                    tempDetails.set(entry.flavor_text,[entry.version.name])                  
                }
            }
        })
        setDetails(tempDetails);
    }
   
    useEffect(() => {
        console.log("First")
        setAllDetails();
    },[species])

    return(
        <div style={{clear: "both"}}>
            <h3>Pokedex entries</h3>
            <table className='detail-table'>
                <tbody>
                    {/* {species && species.flavor_text_entries.filter(entry => entry.language.name === "en")
                        .map(entry => (
                            <tr key={entry.version.name}>
                                <th>{entry.version.name}</th><td>{entry.flavor_text}</td>
                            </tr>))
                    } */}
                    {details && [...details.keys()].map(key => (
                        <tr key={key+details.get(key)}>
                            <th className="detail-data" >
                            {details.get(key).map(item=> 
                                <span key={item}>{item}<br/></span>)}</th>
                            <td className="detail-data" key={details.get(key)}>{key}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Speciesspecies;