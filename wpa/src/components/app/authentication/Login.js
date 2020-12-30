//React JS
import React, {useContext, useState} from 'react'

//Antd Mobile
import { Modal, InputItem, List, WhiteSpace, Button } from 'antd-mobile'
import {Form, Button as ButtonForm, notification}from 'antd'

//Antd Icons
import { UserOutlined, EllipsisOutlined, PhoneOutlined, FieldNumberOutlined } from '@ant-design/icons'
import Logo from '../../../assets/logo/center_black.png'

//Auth Context
import {AuthContext} from '../../../containers/app/AppMb'

//Endpoints
import {endpoints} from '../../../api/commerce/api'

const Login = ({visible}) =>{
    
    const {dispatch, state} = useContext(AuthContext)
    

    const [signup, setSignUp] = useState({
        visible: false,
        error: ''
    })

    const authProcess = async(data) => {
        const response = await endpoints.login(data)
        dispatch({
            type: 'LOGIN',
            payload: response
        })
    }

    const CreateUser = async(data) => {
        const request = endpoints.createUser(data)
        if(request){
            dispatch({
                type:'NOVISIBLE'
            })
        
        }
        
    }

    return(
        <React.Fragment>
            <Modal
            visible={visible}
            style={{
                overflow: 'scroll'
            }}

        >
            {!signup.visible ?


        
            <Form
                onFinish={(values)=>{
                    authProcess(values)
                }}

            >
                <img src={Logo} style={styles.logo} />
                <List style={styles.list}>
                <Form.Item name='user'> 
                    <InputItem placeholder='Usuario' type='text' >
                        <UserOutlined />
                    </InputItem>                    
                </Form.Item>
                <Form.Item name='password'>
                    <InputItem placeholder='Contraseña' type='password'>
                        <EllipsisOutlined />
                    </InputItem>                  
                </Form.Item>
                
                </List>
                <Form.Item>
                    
                    <ButtonForm htmlType="submit" style={styles.btn_login}>Aceptar</ButtonForm>            
                    <ButtonForm onClick={()=>dispatch({type:'NOVISIBLE'})} style={styles.btn_cancel}>Cancelar</ButtonForm>                 
                </Form.Item>                
                <Button type='ghost' inline style={{"margin":"20px"}} onClick={()=>setSignUp({...signup, visible:true})}>No tienes una cuenta? crea tu usuario</Button>
            </Form>
            

        :
        <Form
            onFinish={(values)=>{
                var password = values['password']
                var password_conf = values['password_confirmation']
                if(password == password_conf){                    
                    CreateUser(values)
                    setSignUp({
                        ...signup,
                        error:''
                    })
                }else{
                    setSignUp({
                        ...signup,
                        error:'Las contraseñas no coinciden!'
                    })
                }
                    
                
            }}
        >
            <List style={styles.list}>
            <Form.Item name='email' rules={[{ required: true, message:'Campo Obligatorio', type:'email', }]}> 
                <InputItem placeholder='Email' >
                    @
                </InputItem>                    
            </Form.Item>
            <Form.Item name='username' rules={[{ required: true, message:'Campo Obligatorio' }]}> 
                <InputItem placeholder='Usuario' type='text'  >
                    <UserOutlined />
                </InputItem>                    
            </Form.Item>
            <Form.Item name='phone_number' rules={[{ required: true, message:'Campo Obligatorio' }]} initialValue='+569'>
                <InputItem placeholder='Telefono' type='text' value='+569'>
                    <PhoneOutlined />
                </InputItem>                  
            </Form.Item>
            <Form.Item name='password' rules={[{ required: true, message:'Campo Obligatorio' }]}>
                <InputItem placeholder='Contraseña' type='password'>
                    <EllipsisOutlined />
                </InputItem>                  
            </Form.Item>
            <Form.Item name='password_confirmation' rules={[{ required: true, message:'Campo Obligatorio' }]}>
                <InputItem placeholder='Repetir contraseña' type='password'>
                    <EllipsisOutlined />
                </InputItem>                  
            </Form.Item>
            <Form.Item name='first_name' rules={[{ required: true, message:'Campo Obligatorio' }]}>
                <InputItem placeholder='Primer Nombre' type='text'>
                    <FieldNumberOutlined />
                </InputItem>                  
            </Form.Item>
            <Form.Item name='last_name' rules={[{ required: true, message:'Campo Obligatorio' }]}>
                <InputItem placeholder='Segundo Nombre' type='text'>
                    <FieldNumberOutlined />
                </InputItem>                  
            </Form.Item>
            <p style={{color:'red'}}>{signup.error}</p>
            
            
            </List>
            <Form.Item>
                
                <ButtonForm htmlType="submit" style={styles.btn_login}>Crear</ButtonForm>                
                <ButtonForm onClick={()=>dispatch({type:'NOVISIBLE'})} style={styles.btn_cancel}>Cancelar</ButtonForm>                 
                <WhiteSpace/>
                <Button type='ghost' inline style={{"margin":"20px"}} onClick={()=>setSignUp({...signup, visible:false})}>Ir a Iniciar Sesion</Button>       
            </Form.Item>                
        </Form>            

}
</Modal>
        
        </React.Fragment>
    )


}

const styles = {
    iconUser:{
        fontSize:'70px'
    },
    logo:{
        width:'200px'
    },
    list:{
        marginLeft:'40px',
        marginRight:'40px',
        marginBottom:'70px',
        marginTop:'30px'
    },
    btn_login:{
        backgroundColor: 'black',
        color:'white',
        borderRadius:'5px',
        border: '1px solid black',
        padding:'10px',
        marginRight:'10px'
    },
    btn_cancel:{
        backgroundColor: '#a8071a',
        color:'white',
        borderRadius:'5px',
        border: '1px solid #a8071a',
        padding:'10px'
    }
}


export default Login