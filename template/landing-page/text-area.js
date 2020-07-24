/* eslint-disable react/prop-types */
import React from 'react'
class TextArea extends React.Component{
    render(){
        let data = this.props.items.text_area
        return(
            <section className="row text-area">
            <div className="col-lg-6">
                <div className="img-container">
                    {data.image?
                    <img src={ data.image.url+"?quality=85&width=425&height=282&fit=crop"} />
                :""}
                </div>
            </div>
            <div className="col-lg-6" dangerouslySetInnerHTML={{__html:data.text}}/>
        </section>
        )
    }
}
export default TextArea