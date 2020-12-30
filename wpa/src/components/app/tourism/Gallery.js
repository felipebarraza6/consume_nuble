//React JS
import React, {useState} from 'react'

//Antd Mobile
import {  Flex, Button, WhiteSpace, Modal } from 'antd-mobile'

const Gallery = ({place}) =>{

    const [state, setState] = useState({
        img:null,
        visible:false,
        count: 0
    })

    const ModalImage = (img, visible, count) => {
        return(
            <Modal
                visible={visible}
                title={`Galeria - ${count} de 3`}                                
                >                    
                    <Flex style={styles.flexImg}>
                        <Flex.Item>
                    <img src={img} width='100%' />
                        <Button style={styles.bottonGallery} onClick = { () => {
                            setState({
                                img:null,
                                visible:false
                            })
                        }
                        }>
                            Volver
                        </Button>
                        </Flex.Item>
                    </Flex>                
            </Modal>
        )
    }



    return(
        <React.Fragment>
            <WhiteSpace />
            {ModalImage(state.img, state.visible, state.count)}
            <Flex justify='center'>
                <Flex.Item>                                                 
                    <img 
                    src={place.gallery_one}
                    width='100%'
                    onClick = {()=> {
                        setState({
                            img: place.gallery_one,
                            visible: true,
                            count: 1
                        })
                    }}
                    />                    
                </Flex.Item>
                <Flex.Item>
                    <img 
                    src={place.gallery_two}
                    width='100%'
                    onClick = {()=> {
                        setState({
                            img: place.gallery_two,
                            visible: true,
                            count: 2
                        })
                    }}
                    />   
                </Flex.Item>
                <Flex.Item>
                    <img 
                    src={place.gallery_three}
                    width='100%'
                    onClick = {()=> {
                        setState({
                            img: place.gallery_three,
                            visible: true,
                            count: 3
                        })
                    }}                    
                    />
                </Flex.Item>                        
            </Flex>
            <WhiteSpace />
        </React.Fragment>
    )
}

const styles = {
    flexImg:{
        marginTop:'20%'
    },
    bottonGallery:{
        marginTop:'20%',
        backgroundColor:'#389e0d',        
        color: 'white'
    }
}


export default Gallery