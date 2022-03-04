import React from 'react'
import './Title.css'

const Title = ({title1, title2}) =>{
    return(
        <div >
            <label className="title1">
                {title1}
            </label>
            <label className="title2">
                {title2}
            </label>
        </div>
    )
};

export default Title;