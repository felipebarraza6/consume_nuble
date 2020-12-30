//Antd
import { ActionSheet } from 'antd-mobile'


export const ActionSheetGifts = (gift) => {
    
    const BUTTONS = ['Comprar', 'Cancelar']

    ActionSheet.showActionSheetWithOptions({
        options:BUTTONS,
        cancelButtonIndex:  BUTTONS.length -1,
        title:gift.name,
        message: `$ ${gift.price}`,
      maskClosable: true,
    }, 
    (index)=>{
        if(index===0){
            window.open(gift.permalink)
        }        
    })
}

