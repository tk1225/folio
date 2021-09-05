import React from 'react'
import { 
    FacebookShareButton, 
    FacebookIcon,
    TwitterShareButton, 
    TwitterIcon
} from 'react-share'

const config = {
    via: 'kara_d',
    size: 32
}

export const ShareBt=(props)=>{
const style = {
        position:"fixed",
        left:20,
        bottom:80,
        zIndex:1,
        
      };
const {url,title}=props

return (
    <div className="social-buttons" style={style}>
        
            <FacebookShareButton url={url}>
                <FacebookIcon size={config.size} round  />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title} via={config.via}>
                <TwitterIcon size={config.size} round  />
            </TwitterShareButton>
        
    </div>
    )

}