//React JS
import React, { useContext, useEffect } from 'react'

//Auth Context
import {AuthContext} from './AppMb'

//Component Login
import Login from '../../components/app/authentication/Login'

//Antd Icons
import { UserOutlined} from '@ant-design/icons'

import { Button, Flex, InputItem } from 'antd-mobile'

import {Form, Button as BottonForm} from 'antd'  

//Endpoints
import {endpoints} from '../../api/commerce/api'

const UserContainer = () =>{

    const {dispatch, state} = useContext(AuthContext)

    const updateUser = (user, data)=>{
        const request = endpoints.updateUser(user, data)
        return request
    }
    
    useEffect(()=>{
        if(!state.authenticated){
            dispatch({
                type:'VISIBLE'
            })
        }        
    },[])

    return(
        <div style={styles.container}>
            {state.authenticated ?
                <div style={styles.boxUser}>
                    
                    <h2>@ {state.user.username} </h2>
                    <Form
                        initialValues={state.user}
                        onFinish={(values)=>{
                            updateUser(state.user.username, values)
                        }}
                    >
                        <Form.Item name ='email'>
                            <InputItem />
                        </Form.Item>
                        <Form.Item name ='first_name'>
                            <InputItem />
                        </Form.Item>
                        <Form.Item name ='last_name'>
                            <InputItem />
                        </Form.Item>
                        <Form.Item name ='phone_number' >
                            <InputItem type='number' />
                        </Form.Item>
                    
                        <BottonForm htmlType='submit' style={styles.btnForm}>Actualizar</BottonForm>
                        <Button type='warning' onClick={()=> { dispatch({type:'LOGOUT'})}} style={styles.closeSession} >Cerrar Sesión</Button>
                        </Form>                                                                      
                 </div>   
                
                
            :
                <Flex direction='column' justify='center' alignContent='center'>
                    <h1 style={{textAlign:'center', marginTop:'130px'}}>Debes estar autenticado para visualizar está sección!</h1>
                    <Button onClick={()=>dispatch({type:'VISIBLE'})} size='small' style={styles.button}>Identificate <UserOutlined style={styles.icon} /></Button>
                </Flex>
                
            }
        </div>
    )
}

const styles = {
    updateBtn:{
        marginTop:'10px',
        marginBottom:'10px',
        backgroundColor:'#d48806',
        color:'white'
    },
    closeSession:{

    },
    container: {
        marginTop: '70px',        
    },
    button: {
        margin:'100px',
        backgroundColor:'#d48806',
        color:'white',
        width:'160px',
        height:'50px',
        padding:'10px',
        fontSize:'20px',
        textAlign:'center',        
    },
    boxUser: {
        margin:'20px'
    },
    btnForm: {
        backgroundColor:'white', 
        color:'grey', 
        width:'100%', 
        paddingTop:'10px', 
        paddingBottom:'10px',
        fontSize:'18px',
        borderRadius:'5px', 
        border:'1px solid black',
        marginBottom:'10px'
    },
}

export default UserContainer