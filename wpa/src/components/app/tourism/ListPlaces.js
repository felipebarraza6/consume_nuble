//React JS
import React, {useState, useEffect, useContext} from 'react'

//Antd Mobile
import { Card, ActivityIndicator, Flex, 
        Button, WhiteSpace, Badge, Tag,
        Modal, List, InputItem, TextareaItem } from 'antd-mobile'

//Antd
import {Form, Button as BottonForm} from 'antd'        

//Endpoints
import { endpoints } from '../../../api/commerce/api'

//Antd Icons
import { StarFilled, StarOutlined, CompassOutlined, ArrowLeftOutlined,
         UserOutlined} from '@ant-design/icons'

//Chilean Flag
import chileanLogo from '../../../assets/logo/chile.png'

//Auth Context
import {AuthContext} from '../../../containers/app/AppMb'


const ListPlace = ({setGlobal, stateGlobal}) => {
    
    const {dispatch, state} = useContext(AuthContext)

    const [statePlaces, setStatePlaces] = useState({
        places: null,
        loading:true,
        califitacion:false
    })    

    const [ratingValue, setRatingValue] = useState(1)

    const getPlaces = async() =>{
        const request = await endpoints.places.getPlaces(true, false)
        setStatePlaces({
            ...statePlaces,
            places: request.data.results,    
            loading: false,
            place:null        
        })            
    }

    const postRating = async(data) => {
        const request = await endpoints.ratings.postRating(data)
        console.log({request})
        if(request){
            setStatePlaces({
                ...statePlaces,
                califitacion:false
            })
        }
    }

    useEffect(() => {        

        getPlaces()

    },[])    
    return(
        <React.Fragment>
            <Modal
                visible={statePlaces.califitacion}
            >
                <Flex direction={'column'} style={{marginTop:'20px'}}>
                    <Flex.Item>
                        <Button                             
                            onClick={()=>{
                                setStatePlaces({
                                    ...statePlaces,
                                    califitacion:false
                                })
                            }}
                            style={styles.btnCancel}
                        >
                           <ArrowLeftOutlined /> Voler
                        </Button>                    
                    </Flex.Item>
                    <Flex.Item style={{marginTop:'60px'}}>
                        {statePlaces.place &&
                            <React.Fragment>
                                <h3>Calificaras a <b>{statePlaces.place.name}</b></h3>
                                <List>
                                    <Form 
                                        onFinish={(values)=>{
                                            values = {
                                                ...values,
                                                'place': statePlaces.place.id,
                                                'rating': ratingValue
                                            }
                                            postRating(values)
                                        }}
                                        initialValues={{
                                            'rating':1
                                        }}
                                    >
                                        <h1 style={{'textAlign':'center', fontSize:'35px'}}>{ratingValue}<StarFilled style={{color:'#fadb14', fontSize:'20px', marginLeft:'10px'}} /> </h1>
                                        {ratingValue == 5 ? 
                                            <Button disabled >+</Button>:
                                            <Button  onClick={()=>setRatingValue(ratingValue+1)}>+</Button>
                                        }
                                        <WhiteSpace />
                                        {ratingValue == 1 ?
                                            <Button  disabled>-</Button>:
                                            <Button  onClick={()=>setRatingValue(ratingValue-1)}>-</Button>           

                                        }                   
                                       
                                        <Form.Item name='commentary'
                                            rules={[{ required: true, message: 'Ingresa tu comentario!' }]}
                                        >
                                            <TextareaItem
                                            rows='4'
                                            placeholder='Deja un comentario...'                                        
                                            maxLength={500}
                                            />
                                        </Form.Item>                                                                      
                                     <WhiteSpace size={'xl'} />
                                     <WhiteSpace size={'xl'} />
                                     <Form.Item>
                                        <BottonForm htmlType='submit' style={styles.btnForm}>Enviar</BottonForm>
                                     </Form.Item>                                     
                                     </Form>
                                </List>
                            </React.Fragment>
                        }
                        
                    </Flex.Item>
                </Flex>                
            </Modal>
        <Flex>                   
            {statePlaces.loading ?
            <ActivityIndicator toast text='Preparando...' />:                            
            <Flex.Item>                
                {statePlaces.places.map((obj)=>{                    
                    return(
                    <React.Fragment key={obj.id}>
                        <Card style={styles.card}>
                            <Card.Header 
                                title = {obj.name}
                                extra = {
                                    <Tag small={true}>
                                        {obj.region}
                                        <img src={chileanLogo} style={styles.chileanIcon} />
                                    </Tag>
                                }
                            />
                            <Card.Body style={styles.card.body}>
                                <img style={styles.imageBanner} src={obj.banner_image} alt='banner' /> 
                            </Card.Body>
                            <Card.Footer 
                                content={<Badge text={`${obj.rating}pts`} overflowCount={obj.rating} style={styles.badge} />}
                                extra={
                                    <React.Fragment>
                                        <Flex justify='end'>
                                            {state.authenticated ? 
                                                <Button  size='small' style={styles.button}
                                                onClick={()=>{
                                                    setStatePlaces({
                                                        ...statePlaces,
                                                        califitacion:true,
                                                        place:obj
                                                    })
                                                }}
                                            >
                                                Calificar <StarOutlined style={styles.icon} />
                                            </Button>:<Button 
                                                            onClick={()=>dispatch({type:'VISIBLE'})}
                                                            size='small' style={styles.button}>Identificate <UserOutlined style={styles.icon} /></Button>
                                        
                                            }
                                            
                                            <Button  size='small' style={styles.buttonPlace}
                                                onClick={() => 
                                                    setGlobal({
                                                        ...stateGlobal,
                                                        detailPlace: true,
                                                        place: obj
                                                    })
                                                }
                                            >
                                                Ver Lugar <CompassOutlined style={styles.icon} />
                                            </Button>
                                        </Flex>                                        
                                    </React.Fragment>
                                }
                            />                            
                        </Card>                            
                        <WhiteSpace />
                    </React.Fragment>                    
                    )
                })}
            </Flex.Item>    
            }            
        </Flex>
        </React.Fragment>    
    )
}


const styles = {
    buttonPlace: {
        backgroundColor:'#389e0d',
        color:'white',
        width:'110px',                
    },
    button: {
        backgroundColor:'#389e0d',
        color:'white',
        width:'140px',
        textAlign:'center',
        marginRight:'5px'        
    },  
    badge:{
        backgroundColor:'#389e0d',
        padding:'3px',
        paddingLeft:'8px',
        paddingRight:'8px',
        zIndex:0
    },
    imageBanner:{
        width: '100%'
    },
    plusButton:{
        color:'red'
    },
    icon: {
        fontSize:'15px'
    },
    chileanIcon:{
        width:'10px',
        marginLeft:'10px'
    },
    title:{
        textAlign:'center'
    },
    card:{
        paddingBottom:'13px',
        body:{
            margin:0,
            padding:'1px', 
            marginBottom:'10px'
        }
    },
    btnCancel:{        
        paddingLeft:'10px',
        paddingRight: '10px',
        backgroundColor:'#ff4d4f',
        color:'white'

    },
    btnForm: {
        backgroundColor:'#389e0d', 
        color:'white', 
        width:'100%', 
        padding:'10px', 
        borderRadius:'5px', 
        border:'0px '
    }  
}

export default ListPlace