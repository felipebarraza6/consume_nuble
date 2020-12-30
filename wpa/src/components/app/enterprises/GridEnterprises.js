//React JS
import React, {useState, useEffect, useContext} from 'react'

//Antd Mobile
import {  Flex, ActivityIndicator, Modal, Button, InputItem, TextareaItem,
         WhiteSpace, List, Card, Badge} from 'antd-mobile'

import {Form, Button as BottonForm} from 'antd'   

//Endpoints
import {endpoints} from '../../../api/commerce/api'

//Antd Icons
import { StarFilled, DislikeFilled, LikeFilled, ArrowLeftOutlined,
    UserOutlined} from '@ant-design/icons'

import {ActionSheetEnterprise} from './ActionSheetEnterprise'

//Auth Context
import {AuthContext} from '../../../containers/app/AppMb'

const Item = List.Item;

const GridEnterprise = () =>{

    const {dispatch, state} = useContext(AuthContext)
    
    const [ratingValue, setRatingValue] = useState(1)

    const [stateContext, setState] = useState({
        enterprises:null,
        loading:true,
        calificate:false,
        enterprise:null,
        ratings:false,
        rating_list:null,
        view_profile_enterprise:false,
        profile: null
    })

    

    const getEnterprises = async() =>{
        const request = await endpoints.places.getPlaces(false, true)        
        setState({
            ...stateContext,
            enterprises: request.data.results,
            loading:false
        })
    }

    const postRating = async(data) => {
        const request = await endpoints.ratings.postRating(data)
        console.log({request})
        if(request){
            setState({
                ...stateContext,
                calificate:false
            })
        }
    }


    useEffect(()=>{
        getEnterprises()        
    },[])
   
    return(
        <React.Fragment>
            {console.log(state)}
            {!stateContext.loading ? <React.Fragment>
                <Modal
                    visible={stateContext.ratings}
                >
                <Flex direction={'column'} style={{marginTop:'20px'}}>
                    <Flex.Item>
                        <Button                             
                            onClick={()=>{
                                setState({
                                    ...stateContext,
                                    ratings:false,
                                    ratings_list: null
                                })
                            }}
                            style={styles.btnCancel}
                        >
                           <ArrowLeftOutlined /> Volver
                        </Button>                    
                    </Flex.Item>
                    </Flex>
                    <Flex>
                    <Flex.Item style={{marginTop:'20px'}}>
                        {stateContext.ratings_list &&
                            stateContext.ratings_list.map((obj)=>{
                                return(<React.Fragment>
                                   <Card key={obj.id} style={styles.comment}>
                                <Card.Header  
                                    title={`@${obj.user}`} 
                                    extra={<p style={styles.dateComment}>{obj.created.slice(0, 10)}</p>}
                                />
                                {obj.commentary &&
                                    <Card.Body>
                                    <p>
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
                                            <DislikeFilled />
                                        }
                                    </React.Fragment>} 
                                
                                />
                            </Card>
                                </React.Fragment>
                                    
                                    )
                                }
                            )                
                            
                        }
                    </Flex.Item>  
                </Flex>   
                </Modal>
                <Modal
                visible={stateContext.calificate}
            >
                <Flex direction={'column'} style={{marginTop:'30px'}}>
                    <Flex.Item>
                        <Button                             
                            onClick={()=>{
                                setState({
                                    ...stateContext,
                                    calificate:false
                                })
                            }}
                            style={styles.btnCancel}
                        >
                           <ArrowLeftOutlined /> Volver
                        </Button>                    
                    </Flex.Item>  
                
                    <Flex.Item style={{marginTop:'60px'}}>
                        {stateContext.enterprise &&
                            <React.Fragment>
                                <h3>Calificaras a <b>{stateContext.enterprise.name}</b></h3>
                                <List>
                                    <Form 
                                        onFinish={(values)=>{
                                            values = {
                                                ...values,
                                                'place': stateContext.enterprise.id,
                                                'rating': ratingValue
                                            }
                                            postRating(values)
                                        }}
                                        initialValues={{
                                            'rating':1,                                                                                      
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
                                            rules={[{ required: true, message: 'Ingresa tu reseña!' }]}
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
                                         {state.authenticated  ?
                                            <BottonForm htmlType='submit' style={styles.btnForm}>Enviar</BottonForm>:
                                            <BottonForm onClick = {()=> dispatch({
                                                type:'VISIBLE'
                                            })} style={styles.btnForm}>Identificate</BottonForm>
                                        }
                                        
                                     </Form.Item>                                     
                                     </Form>
                                </List>
                            </React.Fragment>
                        }
                        
                    </Flex.Item>              
                </Flex>
                   
            </Modal>

                                       
            <Flex wrap='wrap' style={styles.princpialFlex} justify='between'>            
                {stateContext.enterprises &&
                    <React.Fragment>
                        {stateContext.view_profile_enterprise ?
                            <>
                                {stateContext.profile &&
                                    <>
                                        <img
                                            src={stateContext.profile.principal_image}
                                            style ={styles.image}
                                        />
                                        <List renderHeader={() => <h1>{stateContext.profile.name}</h1>}>
                                            <p style={styles.textHistoy} align={'justify'}>{stateContext.profile.description}</p>

                                        </List>
                                        <Button style={styles.buttonProfile} size={'large'} onClick={()=>setState({...stateContext, view_profile_enterprise: false})}>Volver</Button>

                                    </>
                                }
                            </>
                            :
                            <>
                                {stateContext.enterprises.map((obj)=>{
                                    return(
                                        <img
                                            src={obj.banner_image}
                                            style={styles.logo}
                                            onClick={()=>{
                                                ActionSheetEnterprise(obj, setState, stateContext, obj)
                                            }}
                                            key={obj.id}
                                        />
                                    )
                                })}
                            </>

                        }

                    </React.Fragment>
                }            
            </Flex></React.Fragment> : <ActivityIndicator toast title='Preparando...' />}:

            
        </React.Fragment>
    )

}

const styles = {
    princpialFlex: {
        margin:'10px',
        marginBottom:'130px',
    },
    logo:{
        width:'45%',

    },
    title: {        
        textAlign:'center',
        marginBottom: '50px'
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
    },
    badge:{
        backgroundColor:'black',
        padding:'3px',
        paddingLeft:'8px',
        paddingRight:'8px',
        zIndex:0
    },
    comment: {
        marginTop:'20px',
        marginBottom: '20px',
        marginRight: '20px',
        marginLeft: '20px'
    },
    dateComment:{
        fontSize:'13px'
    },
    image:{
        width:'100%',
        borderRadius: '20px'
    },
    list:{
        flexBasis: 'initial',
            width: '100%'
    },
    buttonProfile:{
        width:'100%',
            marginTop:'30px',
            marginBottom:'30px'
    },
    textHistoy: {
        marginLeft:'10px',
            marginRight:'10px'
    }
}


export default GridEnterprise