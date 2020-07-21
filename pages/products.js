import React from "react";
import Stack from "../sdk-plugins/index";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

class Products extends React.Component {
  static async getInitialProps({ query }) {
    try {
      let locale;
      if (query.locale == undefined) {
        locale = "en-us";
      } else {
        locale = query.locale;
      }

      const result = await Stack.getEntryWithRef(
        "product",
        ["categories", "related_products"],
        locale
      );
      const header = await Stack.getEntryWithoutRef("menu", locale);
      return {
        data: {
          result: result[0],
          header: header[0][0],
          current: query.page,
          locale: locale,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    let search = new URL(window.location.href).search;
    if (search.includes("locale")) {
      $("#selectpicker").val("fr-fr");
    } else {
      $("#selectpicker").val("en-us");
    }
  }
  render() {
    return (
      <Layout header={this.props.data.header} jsonCode={this.props.data.result}>
        <section className="container">
          <h2 className="theme--heading-font fancy text-center">Products</h2>

          <div className="row">
            {this.props.data.result.length ? (
              <div>
                <ProductCard productCard={this.props.data.result} />
              </div>
            ) : (
              <div className="col-lg-12">
                <div className="well">
                  Sorry, there aren't any products that match that criteria.
                </div>
              </div>
            )}
          </div>
        </section>
      </Layout>
    );
  }
}
export default Products;
