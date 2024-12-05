import { useState } from 'react';
export default function Player({ initialName, symbol, isactive,onchangename }) {
    const[playername, setplayername] = useState(initialName);
    const [isediting, setisediting] = useState(false);

    function editclick() {
        setisediting((editing) => !editing);
        if(isediting){
            onchangename(symbol,playername);
        }
    }

    function handlechange(event){
        setplayername(event.target.value);
    }

    let editablename = <span className="player-name">{playername}</span>;
    if(isediting){
        editablename = <input type="text" required value={playername} onChange={handlechange} />
    }

    return (
        <li className={isactive ? 'active' : undefined}>
            <span className="player">
                {editablename}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editclick}>{isediting ? 'Save' : 'Edit'}</button>
        </li>
    );
}