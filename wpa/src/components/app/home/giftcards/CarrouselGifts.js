//React
import React, {useState, useEffect} from 'react'

//Antd
import { Carousel, WingBlank, ActivityIndicator } from 'antd-mobile'

//Woocommerce
import { Woocommerce } from '../../../../rest_wp/woo/config'

import {ActionSheetGifts} from './ActionSheetGifts'

const CarrouselGifts = () => {

    const initialState = {
        products: null,
        elementIndex: 0,        
    }

    const [state, setState] = useState(initialState)
    
    const getProducts = async() => {
        const request= await Woocommerce.get('products')
        setState({products:request.data})
    }

    useEffect(()=>{
        
        getProducts()        

    }, [])
    
    return(
        <WingBlank>                        
         {state.products ? 
             <Carousel
                style={styles.carousel}
                cellSpacing={5}
                slideWidth={0.6}                
                infinite
                dots={false}
                afterChange={index => setState({...state, elementIndex: index})}           
            >
                {state.products.map((obj, index)=>{                                        
                    return(
                        
                        <a key={obj.id} onClick={()=>{ActionSheetGifts(obj)}}>
                        <div style={styles.carousel.element}>
                            <img  src={obj.images[0].src} alt={obj.name} style={{width:'200px', height:'200px', marginTop: index === state.elementIndex ? '-10px':'0px'}} />
                            <div style={styles.carousel.textname}>{obj.name}</div>                                                    
                        </div>                        
                        </a> 
                                                   
                    )
                })}
            
            </Carousel>             
             : <div style={styles.activityContainer}><ActivityIndicator text="Cargando giftcards" /></div>
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
            fontStyle: 'oblique'
        }
    },
    activityContainer: {
        marginBottom: '20px',        
    }
}


export default CarrouselGifts