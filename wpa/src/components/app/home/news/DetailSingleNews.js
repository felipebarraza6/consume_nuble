import React,{ useEffect} from 'react'

import { Button, Card } from 'antd-mobile'

//Antd Icons
import { RollbackOutlined } from '@ant-design/icons'

//Components
import ShareButtons from '../../core/ShareButtons'

const DetailSingleNews = ({notice, state, setState, setGlobalState }) =>{

    useEffect(()=>{        
        window.scrollTo(0,0)
    }, [])
    
    return(
        <React.Fragment>           
            <Button 
                icon={<RollbackOutlined />} 
                onClick={()=>{
                      setState({...state, viewDetail:false})
                      setGlobalState({
                        isDetaileNews:false
                      })
                  }}
                    >
                    Noticias
            </Button>


            <Card style={styles.cardNotice}>
            <Card.Header
                title={notice.title}                
            />
            <Card.Body>                
                <img src={notice.principal_image} style={styles.cardNotice.image} alt='post' />                
                <div style={styles.cardNotice.spaceDate}> Publicada el {notice.created.slice(0,10)} a las {notice.created.slice(11, 19)} Hrs</div>
                  <div style={styles.cardNotice.textNotice}>
                    {notice.description}
                  </div>
            </Card.Body>
            </Card>            
            <Button icon={<RollbackOutlined />} onClick={()=>{
                setState({...state, viewDetail:false})
                setGlobalState({
                    isDetaileNews:false
                })
            }}>Noticias</Button>
        </React.Fragment>
        
    )
}


const styles = {
    cardNotice:{
        image:{
            width:'100%'
        },
        textNotice:{
            textAlign:'justify',
            textIndent: '40px',
            fontSize: '15px'
        },
        spaceDate:{
            marginBottom:'10px',
            fontSize:'12px',
            textAlign:'right',
            paddingRight:'5px'
        },        
    }
}

export default DetailSingleNews
