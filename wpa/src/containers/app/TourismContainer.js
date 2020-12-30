//React JS
import React, { useState } from 'react'

//Components
import ListPlace from '../../components/app/tourism/ListPlaces'
import DetailPlace from '../../components/app/tourism/DetailPlaces'

const TourismContainer = () =>{
    
    const [globalState, setGobalState] = useState({
        detailPlace: false,        
        place:null
    })
    
    return(
        
        <div style={styles.container}>
        
           {globalState.detailPlace  ?
                <DetailPlace place={globalState.place} setGlobal={setGobalState} glogalState={globalState} />:<ListPlace stateGlobal={globalState} setGlobal={setGobalState} />
           }
        </div>        
        
    )
}

const styles = {
    container: {
        marginTop: '70px',
        marginBottom: '70px',
        overflow:'hidden'
    }
}

export default TourismContainer