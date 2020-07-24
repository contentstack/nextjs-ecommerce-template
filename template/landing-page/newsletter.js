/* eslint-disable react/prop-types */
import React from "react";
class NewsLetter extends React.Component {
  render() {
    let result = this.props.items.form;
    return (
      <section id="newsletter" className="container landing-page-block">
        <div className="row">
          <div className="col-lg-12">
            <div className="newsletter-container">
              <div className="newsletter-heading">
                <ion-icon name={result.icon}></ion-icon>
                <div className="newsletter-heading-text">
                  <h4 className="theme--heading-font">{result.form_title}</h4>
                  <p>{result.subtitle}</p>
                </div>
              </div>
              <div className="newsletter-form">
                <input
                  type="text"
                  placeholder="Please enter your email address"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default NewsLetter;
