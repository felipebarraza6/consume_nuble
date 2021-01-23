// Reactgt
import React, {useState, useEffect} from 'react'

//Antd
import { Carousel, WingBlank, ActivityIndicator } from 'antd-mobile'

import { endpoints } from '../../../../api/commerce/api'
import {ActionSheetEnterprise} from './ActionSheet'

const CarouselEnterprises = () => {
  
  const initialState = {
     enterprises: null,
     elementIndex: 0,
  }

  const [state, setState] = useState(initialState)

  const getEnterprisesData =async()=> {
      const request = await endpoints.places.getPlaces(false, true)  
      setState({
        ...state,
        enterprises: request.data.results
      })
  }

  useEffect(()=> {
    getEnterprisesData()
  }, [])
  

  return(
      <WingBlank>
        {state.enterprises ? 
          <Carousel
            style={styles.carousel}
            cellSpacing={5}
            slideWidth={0.7}
            infinite
            arrows={true}
            dots={false}
            afterChange={index => setState({...state, elementIndex: index})}
          >
            {state.enterprises.map((obj, index)=>{
             return(
               <React.Fragment>
                <div style={styles.carousel.element}>
               <img style={{width:'210px', height:'210px'}}  src={obj.banner_image} alt={obj.name} key={obj.id} onClick = {()=> ActionSheetEnterprise(obj) }  />
   </div>
               </React.Fragment>
             )
            })}
          </Carousel>:
          <div style={styles.activityContainer}><ActivityIndicator text="Cargando empresas..." /></div>
        }
      </WingBlank>
  )

}



const styles = {
  carousel:{
      marginBottom: '20px',
      element: {
        marginTop: '15px'
      },
      textname: {
        marginLeft: '20%',
        fontStyle: 'oblique',
      }
  },
  activityContainer: {
    marginBottom: '20px'
  }
}

export default CarouselEnterprises
