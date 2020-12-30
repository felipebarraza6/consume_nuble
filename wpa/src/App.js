import React, {useState, useEffect} from 'react'

//Contatiners
import AppMb from './containers/app/AppMb'



function App() {

  const[size, setSize] = useState()

  useEffect(()=>{
      setSize(window.innerWidth)
  }, [])

  return (
    <React.Fragment>
          {size < 600 ? <AppMb /> : 'ir a consumeñuble'}    
    </React.Fragment>
  )
}

export default App;
