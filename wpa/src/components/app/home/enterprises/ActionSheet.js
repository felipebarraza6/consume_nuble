import React from 'react'
//Antd
import { ActionSheet } from 'antd-mobile'
import { WhatsAppOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
export const ActionSheetEnterprise = (enterprise) => {

const BUTTONS = [
                  <WhatsAppOutlined style={styles.icons.whatsapp} />,
                  <FacebookOutlined style={styles.icons.facebook} />,
                  <InstagramOutlined style={styles.icons} />,
                  'Cancelar'
                ]

       ActionSheet.showActionSheetWithOptions({
       options:BUTTONS,
       cancelButtonIndex:  BUTTONS.length -1,
       title:enterprise.name,
       message: `${enterprise.description.slice(0, 200)}...`,
       maskClosable: true,
    },
       (index)=>{
          if(index===0){
            window.open(enterprise.whatsapp)
          }
         if(index===1){
            window.open((enterprise.facebook))
         }
         if(index===2){
            window.open((enterprise.instagram))
         }
    })
  }

const styles = {
  icons: {
    whatsapp: {
      fontSize: '30px',
      margin: '10px',
      color: 'green'
    },
    facebook: {
      fontSize: '30px',
      margin: '10px',
      color: '#3b5998'
    },
    fontSize:'30px',
    margin:'10px'
  }
}
