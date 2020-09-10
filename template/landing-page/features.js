/* eslint-disable react/prop-types */
import React from "react";
class CategoryFeatures extends React.Component {
  render() {
    let data = this.props.items.features;
    return (
      <section id="features" className="container landing-page-block">
        <hr className="top" />
        <header>
          <h2 className="theme--heading-font">{data.title}</h2>
          <p className="subtitle">{data.subtitle}</p>
        </header>
        <div className="row">
          {data.columns.map(function (column, idx) {
            return (
              <div
                className={`col-xs-12 col-sm-6 col-md-2 col-lg-2 ${
                  idx === 0 ? "col-md-offset-2 col-lg-offset-2" : ""
                }`}
                key={idx}
              >
                <span className="circle">
                  <ion-icon name={column.icon}></ion-icon>
                </span>
                <p className="feature-name">{column.title}</p>
                <p className="feature-details">{column.subtitle}</p>
              </div>
            );
          })}
        </div>
        <hr className="bottom" />
      </section>
    );
  }
}
export default CategoryFeatures;
