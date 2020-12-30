//React JS
import React, { useState } from 'react'

//Antd Mobile
import { TabBar as ContainerNav } from 'antd-mobile'

//Antd Icons
import { HomeOutlined, CarOutlined, ShopOutlined, 
        HomeFilled, UserOutlined, CarFilled, 
        ShopFilled } from '@ant-design/icons'

//React Router
import { Link } from 'react-router-dom'


const Navigation = () =>{
    const initialState = {
        homeScreen: true,
        tourismScreen: false,
        shopScreen: false,
        profileScreen: false
    }

    const [state, setState] = useState(initialState)
    
    return( <ContainerNav
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"                   
            >
                <ContainerNav.Item
                    title='Home'
                    icon={<Link to='/' onClick={() => 
                        setState({
                                homeScreen:true,
                                tourismScreen: false,
                                shopScreen: false,
                                profileScreen: false
                            })
                        }>
                        {state.homeScreen ? <HomeFilled style={styles.icon} /> 
                        : <HomeOutlined style={styles.icon} />}
                    </Link>}   
                />
                <ContainerNav.Item
                    title='Turismo'
                    icon={<Link to='/tourism' onClick={() => 
                        setState({                                
                                homeScreen:false,
                                tourismScreen: true,
                                shopScreen: false,
                                profileScreen: false
                            })
                        }>
                        {state.tourismScreen ? <CarFilled style={styles.iconSelectTourism} /> 
                        : <CarOutlined style={styles.icon} />}
                    </Link>}   
                />
                <ContainerNav.Item
                    title='Empresas'
                    icon={<Link to='/shop' onClick={() => 
                        setState({                                
                                homeScreen:false,
                                tourismScreen: false,
                                shopScreen: true,
                                profileScreen: false
                            })
                        }>
                        {state.shopScreen ? <ShopFilled style={styles.iconSelectShop} /> 
                        : <ShopOutlined style={styles.icon} />}
                    </Link>}   
                />
                <ContainerNav.Item
                    title='Perfil'
                    icon={<Link to='/profile' onClick={() => 
                        setState({                                
                                homeScreen:false,
                                tourismScreen: false,
                                shopScreen: false,
                                profileScreen: true
                            })
                        }>
                        {state.profileScreen ? <UserOutlined style={styles.iconSelectProfile} /> 
                        : <UserOutlined style={styles.icon} />}
                    </Link>}   
                />
                
            </ContainerNav>             
    )
}

const styles = {
    icon: {
        color: 'black',
        fontSize: '26px',        
        marginTop:'4px'
    },
    iconSelectTourism: {
        fontSize: '26px',
        marginTop: '4px',
        color:'#389e0d'
    },
    iconSelectShop: {
        fontSize: '26px',
        marginTop: '4px',
        color:'#096dd9'
    },
    iconSelectProfile: {
        fontSize: '26px',
        marginTop: '4px',
        color: '#d48806'
    }
}

export default Navigation