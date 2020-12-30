//React JS
import React, {createContext, useReducer, useEffect} from 'react'

//Antd Mobile
import { WhiteSpace } from 'antd-mobile'

//Global CSS
import '../../css/app/index.css'
import 'antd-mobile/dist/antd-mobile.css'

//Navbar
import { NavHome, NavTourism, NavShop, NavProfile } from '../../components/app/core/NavHeader'
import Navigation from '../../components/app/core/Navigation'

//Containers
import HomeContainer from './HomeContainer'
import TourismContainer from './TourismContainer'
import ShopContainer  from './ShopContainer'
import UserContainer from './UserContainer'

//React Router
import {
    BrowserRouter as Router,
    Switch,
    Route,    
} from 'react-router-dom'

//Reducer
import { login_reducer } from '../../reducers/auth'

//Login
import Login from '../../components/app/authentication/Login'

export const AuthContext = createContext()

const initialState ={
    authenticated:false,
    user:null,
    token:null,
    login:false
}

const AppMb = () =>{
    
    const [state, dispatch] = useReducer(login_reducer, initialState)

    useEffect(()=>{
        const access_token = JSON.parse(localStorage.getItem('access_token') || null)
        const user = JSON.parse(localStorage.getItem('user') || null)
            
        if(user){
            dispatch({
                type: 'LOGIN',
                payload: {
                    access_token,
                    user          
                }
            })
        }
    },[])

    return(        
        <>
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
        <Login visible={state.login} />
        
        <div style={{overflow:'hidden'}}>           
            <Router>                                
                    <Switch>
                        <Route exact path="/">  
                            <NavHome />                                  
                            <WhiteSpace size="lg" />
                            <HomeContainer />                            
                        </Route>
                        <Route path="/tourism">
                            <NavTourism />     
                            <WhiteSpace size="lg" />
                            <TourismContainer />
                        </Route>
                        <Route path="/shop">
                            <NavShop />
                            <WhiteSpace size="lg" />
                            <ShopContainer />
                        </Route>
                        <Route path="/profile">
                            <NavProfile />     
                            <WhiteSpace size="lg" />
                            <UserContainer />
                        </Route>
                    </Switch>  
                    <div style={styles.positionFooter}>
                        <Navigation />
                    </div>                                                        
            </Router>                                   
        </div>
        </AuthContext.Provider>
    </>
    )
}

const styles = {    
    positionFooter:{
        position: 'fixed',        
        width: '100%', 
        bottom: '0',
        overflow: 'hidden'
    }
}

export default AppMb