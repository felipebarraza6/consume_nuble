//React JS
import React, { useEffect, useState } from 'react'

//Antd Mobile
import { Card, ActivityIndicator, Flex, 
        Button } from 'antd-mobile'

//Endpoints
import { endpoints } from '../../../../rest_wp/core/endpoints'

//Antd Icons
import { EyeOutlined } from '@ant-design/icons'

//Components
import DetailSingleView from './DetailSingleNews'

import { WhiteSpace } from 'antd-mobile'

const ListNews = ({ isDetaileNews }) => {

    const initialState = {        
        lastsPosts: null,        
        viewDetail:false,
        singleNotice: null
    }

    const [state, setState] = useState(initialState)

    const getPosts =async() =>{
        const request = await endpoints.posts.getPosts()
        setState({
            lastsPosts: request.data
        })
    }

    useEffect(()=>{
                
        getPosts()
    }, [])
    
    return(<>
        <Flex >
            <Flex.Item >
                
                {state.viewDetail ? <>
                    <DetailSingleView notice={state.singleNotice} state={state} setState={setState} setGlobalState = {isDetaileNews} />
                </>:
                state.lastsPosts ? 
                    state.lastsPosts.map((obj)=>{
                        return(                            
                        <Card style={styles.cardNotice} key={obj.id}>
                            <Card.Header
                                title={obj.title.rendered}
                            />
                            <Card.Body style={{marginBottom:'10px'}}>
                                <img style={styles.cardNotice.image} src={obj.better_featured_image.source_url} alt='imagePst' />
                                <WhiteSpace />
                                {obj.content.rendered.slice(4, 100)}...
                            </Card.Body>
                            <Card.Footer 
                                content={<Button onClick={()=>{
                                            setState({...state,viewDetail:true,singleNotice: obj})
                                            isDetaileNews({
                                                isDetailNews: true
                                            })
                                        }
                                    }
                                size={'small'} 
                                inline 
                                style={styles.cardNotice.button}
                            ><EyeOutlined style={{fontSize:'15px'}} /> Leer noticia</Button>}
                                extra={<div style={styles.cardNotice.extra}>{obj.date.slice(0,10)}</div>}
                                style = {styles.cardNotice.footer}
                            />                    
                        </Card>)
                    }):
                    <ActivityIndicator toast text="Preparando..." />
                
                }
        
        </Flex.Item>
        </Flex>
        
        
    </>)
}

const styles = {
    cardNotice: {
        marginBottom:'10px',
        marginLeft:'5px',
        marginRight:'5px',
        image:{
            width:'100%'  
        },
        footer:{
            marginBottom:'10px'
        },
        extra:{
            marginTop:'8px',
            color:'black'            
            
        },
        button:{
            backgroundColor:'black', 
            color:'white', 
            width:'120px'
        }    
    }
}

export default ListNews