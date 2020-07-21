import React from "react";
import Error from "next/error";
import Layout from "../../components/Layout";
import Stack from "../../sdk-plugins/index";
import ProductCard from "../../components/ProductCard";

class CategoryType extends React.Component {
  static async getInitialProps({ query }) {
    try {
      let locale;
      if (query.locale == undefined) {
        locale = "en-us";
      } else {
        locale = query.locale;
      }

      let check = await Stack.getEntryWithoutRef("category", locale);
      check = check[0].filter((cat) => cat.url === "/category/" + query.type);
      if (check.length == 0) throw "Error 404";
      const result = await Stack.getEntryWithQuery(
        "product",
        query.type,
        locale
      );
      const header = await Stack.getEntryWithoutRef("menu", locale);
      return {
        data: {
          category: check[0].title,
          header: header[0][0],
          statusCode: 200,
          result: result[0],
          query: locale,
        },
      };
    } catch (err) {
      console.log("error", err);
      return { data: { statusCode: 404 } };
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
    let data = this.props.data;
    return this.props.data.statusCode === 200 ? (
      <Layout header={data.header} jsonCode={this.props.data.result}>
        <section id="products" className="container">
          <h2 className="theme--heading-font fancy text-center">
            {data.category}
          </h2>

          <div className="row">
            {data.result.length != 0 ? (
              <ProductCard productCard={data.result} />
            ) : (
              <div className="col-lg-12">
                <div className="well">
                  Sorry, there aren't any products matching that criteria.
                </div>
              </div>
            )}
          </div>
        </section>
      </Layout>
    ) : (
      <Error statusCode={this.props.data.statusCode} />
    );
  }
}
export default CategoryType;
