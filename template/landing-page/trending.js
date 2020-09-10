/* eslint-disable react/prop-types */

import React from "react";
class CategoryTrends extends React.Component {
  render() {
    return (
      <section id="trends" className="container landing-page-block">
        <div className="row">
            {this.props.items.trending.categories.map(function(column, idx){
            return <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" key={idx}>

            <div
              className={`trend ${column.style==='Horizontal'?'horizontal':'vertical'}`}
              style={{ backgroundSize:'cover',backgroundImage: `url(${column.image.url}?quality=75)` }}
            >
              <div className="trend-detail">
                <h5 className="theme--heading-font">{ column.label }</h5>
                <p className="trend-name theme--heading-font">
                  { column.lead }
                </p>
                <p className="trend-about">{ column.description }</p>
                <a className="trend-discover" href={ column.category[0].url }>
                  Discover
                </a>
              </div>
            </div>
          </div>
           })}
        </div>
      </section>
    );
  }
}
export default CategoryTrends;
