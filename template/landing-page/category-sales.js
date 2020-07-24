/* eslint-disable react/prop-types */
import React from "react";
class CategorySales extends React.Component {
  render() {
    let data = this.props.items;
    return (
      <section id="category-sales" className="container landing-page-block">
        <div className="row">
          {data.category_sales.categories.map((column, idx) => {
            return (
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3" key={idx}>
                <a
                  className="category-sales-link hvr-float"
                  href={column.category[0].url}
                >
                  <img
                    className="img-responsive"
                    src={column.image.url + "?width=317&height=424&fit=crop"}
                  />
                  <p className="category-sales-name">{column.label}</p>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
export default CategorySales;
