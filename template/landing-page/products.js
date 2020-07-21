import React from "react";
class CategoryProducts extends React.Component {
  render() {
    let result = this.props.items.products;
    return (
      <section id="products" className="container landing-page-block">
        <header>
          <h2 className="theme--heading-font">{result.title}</h2>
          <p className="subtitle">{result.subtitle}</p>
        </header>
        <div className="row">
          {result.reference.map(function (column, idx) {
            return (
              <div
                className={`${
                  result.column_count === 4
                    ? "col-xs-6 col-sm-6 col-md-3 col-lg-3"
                    : "col-xs-12 col-sm-12 col-md-6 col-lg-6"
                } product`}
                key={idx}
              >
                <a className="product-link" href={column.categories[0].url}>
                  <header>
                    <span className="chip hot">hot</span>
                    <img
                      className="img-responsive"
                      src={
                        column.featured_image[0].url +
                        "?width=249&height=249&fit=crop"
                      }
                    />
                  </header>
                  <footer>
                    <h5>{column.categories[0].title}</h5>
                    <p className="product-name">{column.title}</p>
                    <p className="product-price">
                      <span className="now">{"$" + column.price}</span>
                      <span className="was">$120.00</span>
                    </p>
                  </footer>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}
export default CategoryProducts;
