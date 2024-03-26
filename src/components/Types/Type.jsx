import Types from "../../Utility/Types";
import './Type.css'

function Type(props){
    return <p className="type" style={{background:Types.get(props.type)}}>{props.type}</p>
}

export default Type;