import React from 'react'

import {    
    FacebookShareButton,
    FacebookIcon,
    EmailShareButton,
    EmailIcon,
    TwitterShareButton,
    TwitterIcon,
    PinterestShareButton,
    PinterestIcon
  } from "react-share"

const ShareButtons = ({quote, url, notice}) => {    

      return (
        <div style={styles.links}>
            <FacebookShareButton 
                quote={quote} 
                url={url} 
                style={styles.links.marginIcon}>
                <FacebookIcon round size={styles.iconSocial} />                        
            </FacebookShareButton>
            <EmailShareButton 
                subject={quote} 
                body={url} 
                style={styles.links.marginIcon}>
                <EmailIcon round size={styles.iconSocial} />
            </EmailShareButton>
            <TwitterShareButton 
                title={quote} 
                url={url} 
                style={styles.links.marginIcon}>
                <TwitterIcon round size={styles.iconSocial} />
            </TwitterShareButton>
            <PinterestShareButton 
                description={quote} 
                url={url} 
                media={notice.better_featured_image.source_url} 
                style={styles.links.marginIcon}>
                <PinterestIcon round size={styles.iconSocial} />
            </PinterestShareButton>   
        </div>
    )
}


const styles = {
    links:{        
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',            
        marginIcon:{
            margin:'5px 15px'
        }
    },
    iconSocial: '30px'    
}


export default ShareButtons