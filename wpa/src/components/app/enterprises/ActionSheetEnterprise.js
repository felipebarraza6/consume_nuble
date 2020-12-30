//Antd
import { ActionSheet } from 'antd-mobile'

import { FacebookOutlined, InstagramOutlined, BarcodeOutlined, OrderedListOutlined,
        UnorderedListOutlined, WhatsAppOutlined, StarOutlined, BuildOutlined } from '@ant-design/icons'

//React JS
import React from 'react'

import {endpoints} from '../../../api/commerce/api'

export const ActionSheetEnterprise = (enterprise, setState, state, obj) => {


    var facebook_link = enterprise.facebook
    var instagram_link = enterprise.instagram
    var whatsapp_link = enterprise.whatsapp    
    var digital_menu_link = enterprise.digital_menu
    
    const BUTTONS = [
                        {title:'Perfil', icon: <BuildOutlined style={styles.iconShared} />},
                        {title:'Facebbok', icon: <FacebookOutlined style={styles.iconShared} />},
                        {title:'Instagram', icon: <InstagramOutlined style={styles.iconShared} />},                        
                        {title:'WhatsApp', icon: <WhatsAppOutlined style={styles.iconShared} />},                                                
                        {title:'Menu Digital', icon: <BarcodeOutlined style={styles.iconShared} />},                        
                        {title:'Calificar', icon: <StarOutlined style={styles.iconShared} />},
                        {title:'Reseñas', icon: <UnorderedListOutlined style={styles.iconShared} />}
                    ]

    ActionSheet.showShareActionSheetWithOptions({
        options:BUTTONS,
        
        title:`${enterprise.name} - ${enterprise.rating} pts.`,
        //message: `$ ${gift.price}`,
        maskClosable: true,
        cancelButtonText:'Volver',

    }, 
    (index)=>{
        if(index===0){
            setState({
                ...state,
                view_profile_enterprise: true,
                profile: enterprise
            })
        }
        if(index===1 && !facebook_link==''){
            window.open(facebook_link)            
        }
        if(index===2 && !instagram_link==''){
            window.open(instagram_link)
        }
        if(index===3 && !whatsapp_link==''){
            window.open(whatsapp_link)
        }
        if(index===4 && !digital_menu_link==''){
            window.open(digital_menu_link)
        }        
        if(index==5){
            setState({
                ...state,
                calificate:true,
                enterprise: obj

            })
        }
        if(index==6){
            const getRatings = async(place) =>{
                const request = await endpoints.ratings.getRatings(place)                   
                setState({
                    ...state,            
                    ratings_list: request.data.results,    
                    calificate:false,
                    ratings:true        
                })    
                
            }
            getRatings(enterprise.id)
        }
    })
}


const styles = {
    iconShared:{
        fontSize:'40px'
    }
}
