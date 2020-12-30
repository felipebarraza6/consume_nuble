//Woocommerce obj

import { Woocommerce } from './config'

export const getProducts = () => {
  Woocommerce.get('products').then((re)=>{return(re)})
}

