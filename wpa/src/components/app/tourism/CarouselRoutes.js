 //React
import React, { useEffect, useState } from 'react'

//Endpoints
import {endpoints} from './../../../api/commerce/api'

//Antd
import {Button , Flex, WhiteSpace, Tag, Tabs, List} from 'antd-mobile'
import { Typography  } from 'antd'
import { WhatsAppOutlined} from '@ant-design/icons'

const {Title} = Typography
const Item = List.Item
const CarouselRoutes = () => {
  
    const initialState = {
        routes: null,
        route_select: null,
        is_retrieve: false,
        days: null
    } 
     
    const [state, setState] = useState(initialState)
    const days = state.days
    async function get_routes () {
        const request = await endpoints.listRoute()
        let data = request.data.results
        if (request.status == 200){
            setState({
                ...state,
                routes: data
            })
                   }
        return request
    }

    useEffect(()=>{
        get_routes()
    }, [])

    const renderContent = tab =>
    (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#fff' }}>
      <List> 
      {tab.elements.map((obj)=> {
            return(
                  <Item  wrap >{obj.description}</Item>
            )

      })}
      </List>
    </div>)
    
    console.log(state)
    return (
        <React.Fragment>
          {state.routes && 
          <React.Fragment>
          <Flex justify="center" style={styles.flexContainer} >
              {state.routes.map((obj)=>{
                  return(
                    <React.Fragment>
                      <img src={obj.image_principal} 
                          key={obj.id} width='15%' height='15%'  
                          onClick = {
                              () => {
                                setState({
                                    ...state,
                                    route_select: obj,
                                    days:obj.days 
                                })
                                
                              
                              }
                          }
                      />
                    </React.Fragment>
                  )

              })}
          </Flex>
          {state.route_select ? 
              <Flex style={styles.daysContainer}>
                  <Flex.Item>
                      <Title level={4} style={styles.titleRoute} >{state.route_select.name} - Itinerario</Title>
                      <Title level={5} style={styles.titleRoute}  >DIAS </Title>
                      <Button style={styles.Close}  onClick={()=>{
                          setState({
                              ...state,
                              route_select: null
                          })
                      }}>CERRAR</Button>
                      <Tabs
                          tabs = {days}
                          style={{color:'black'}}
                          tabDirection={"horizontal"}
                      >
                      {renderContent}
                      </Tabs>
                      <Button style={styles.Close} onClick={()=>{ window.open(state.route_select.whats_app)}}  icon={<WhatsAppOutlined style={{color:'#120338', fontSize:'20px'}}  />}>Contacto</Button>
                  </Flex.Item>
              </Flex>:''
          }
          </React.Fragment>
      }
        </React.Fragment>
    )

}


const styles = {
  routeText: {
    color:'#722ed1',

  },
  flexContainer: {
    marginBottom: '20px'
  },
  daysContainer: {
    backgroundColor:'#722ed1',
    paddingLeft:'15px',
    paddingRight:'15px',
    paddingBottom:'20px'
  },
  tag:{
    margin:'15px'
  },
  titleRoute:{
      color:'white'
  },
  Close:{
    borderRadius: '0px 0px 0px 0px',
  }

}

export default CarouselRoutes
