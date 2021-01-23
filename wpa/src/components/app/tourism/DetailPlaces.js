//React JS
import React, { useState, useEffect} from 'react'

//Antd Mobile
import { Card, Flex, Button, Badge } from 'antd-mobile'

//Components
import Gallery from '../../../components/app/tourism/Gallery'

//Antd Icons
import { LikeFilled, DislikeFilled, ArrowLeftOutlined } from '@ant-design/icons'

//Endpoints
import { endpoints } from '../../../api/commerce/api'

const DetailPlace = ({place, setGlobal, glogalState}) => {

    const [state, setState] = useState({
        is_ratings:false,
        ratings:null,
        quantiy:0
    })

    const getRatings = async(place) =>{
        const request = await endpoints.ratings.getRatings(place)                   
        setState({
            ...state,
            is_ratings: true,    
            ratings: request.data.results,
            quantiy: request.data.count        
        })    
        
    }

    const quantity = state.quantiy
    const is_ratings = state.is_ratings

    console.log(state)
    useEffect((state) => {  

        getRatings(place.id)

    },[])

    return(
        <React.Fragment>
            <Flex>
                <Flex.Item>
                    <Button
                        style={styles.button_back}
                        onClick = {()=>{
                            setGlobal({
                                ...glogalState,
                                detailPlace: false,
                                qualityPlace: false
                            })
                        }}
                    ><ArrowLeftOutlined style={{marginRight:'10px'}} />Lugares...</Button>
                    <h1 style={styles.title}>{place.name}</h1>
                    <img width='100%' height='100%'  src={place.banner_image} />
                    <p style={styles.description}>
                        {place.description}
                    </p>
                    <Gallery place={place} />
                    {state.quantiy > 0 ? 
                    <React.Fragment>
                        <h2 style={styles.title}>Comentarios sobre "{place.name}" </h2>
                        {state.ratings.map((obj)=>{
                            return(
                            <Card key={obj.id} style={styles.comment}>
                                <Card.Header  
                                    title={<p style={{color:'white'}}>@{obj.user}</p>} 
                                    extra={<p style={styles.dateComment}>{obj.created.slice(0, 10)}</p>}
                                />
                                {obj.commentary &&
                                    <Card.Body>
                                    <p style={{color:'white'}}>
                                        {obj.commentary}
                                    </p>
                                </Card.Body>
                                }                                
                                <Card.Footer extra={
                                        <Badge text={`Calificación: ${obj.rating}pts`} overflowCount={obj.rating} style={styles.badge} />
                                    }
                                    content={<React.Fragment>
                                        {obj.rating > 3 ?
                                            <LikeFilled style={styles.iconColor} />:
                                            <DislikeFilled style={styles.iconColor} />
                                        }
                                    </React.Fragment>} 
                                
                                />
                            </Card>)
                        })}
                    </React.Fragment>                        
                        
                        :
                        <h2 style={styles.title}>Aun no hay calificaciones...</h2>
                    }
                </Flex.Item>
            </Flex>
            
        </React.Fragment>
    )
}


const styles = {
    button_back: {
      backgroundColor:'#531dab',
      borderColor: '#531dab',
      color:'white',
    },
    title:{
        marginLeft:'20px'
    },
    description:{
        margin:'10px',
        textAlign:'justify',
        textIndent:'30px'
    },
    comment: {
        margin:'20px',
        backgroundColor: '#120338',
        color: 'white'
    },
    dateComment:{
        fontSize:'13px',
        color: 'white'
       
    },
    badge:{
        backgroundColor:'#9254de',
        padding:'3px',
        paddingLeft:'8px',
        paddingRight:'8px',
        zIndex:0,
        marginBottom:'20px'
    },
    iconColor:{
        color: 'white',
        fontSize:'20px'
    },
    commentTitle:{
        
    }
}

export default DetailPlace
