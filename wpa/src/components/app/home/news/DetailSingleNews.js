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
            <Card style={styles.cardNotice}>
            <Card.Header
                title={notice.title.rendered}                
            />
            <Card.Body>                
                <img src={notice.better_featured_image.source_url} style={styles.cardNotice.image} alt='post' />                
                <div style={styles.cardNotice.spaceDate}> Publicada el {notice.date.slice(0,10)} a las {notice.date.slice(11)} Hrs</div>
                <ShareButtons quote={notice.title.rendered} url={notice.link} notice={notice}/>
                <div style={styles.cardNotice.textNotice} dangerouslySetInnerHTML={{ __html: notice.content.rendered }}></div>
            </Card.Body>
            </Card>            
            <ShareButtons quote={notice.title.rendered} url={notice.link} notice={notice}/>
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