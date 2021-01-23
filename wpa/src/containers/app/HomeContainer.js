//React
import React, { useState } from 'react'

//Components
import ListNews from '../../components/app/home/news/ListNews'
import CarrouselGifts from '../../components/app/home/giftcards/CarrouselGifts'
import Carousel from '../../components/app/home/enterprises/Carrousel'

const HomeContainer = () =>{    

    const initialState = {
        isDetailNews: false            
    }

    const [globalState, setGlobalState] = useState(initialState)
    

    return(
        <React.Fragment>        
        <div style={styles.container}>      
        {!globalState.isDetailNews &&
          <Carousel/>
        }
        <ListNews isDetaileNews = {setGlobalState} />
        {!globalState.isDetailNews &&
          <CarrouselGifts />
        }              
        </div>
        </React.Fragment>
    )
}


const styles = {
    container: {
        marginTop: '70px',
        marginBottom: '70px',
        overflow:'hidden'
    }
}

export default HomeContainer
