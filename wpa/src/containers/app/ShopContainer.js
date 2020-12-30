//React JS
import React from 'react'

//Components
import GridEnterprise from '../../components/app/enterprises/GridEnterprises'


const ShopContainer = () =>{


    return(
        <div style={styles.container}>
            <GridEnterprise />
        </div>
    )
}

const styles = {
    container: {
        marginTop: '70px',
    }
}

export default ShopContainer