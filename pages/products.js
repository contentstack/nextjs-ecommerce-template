/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Stack from "../sdk-plugins/index";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = { locale: undefined };
  }
  static async getInitialProps(crx) {
    try {
      let locale;
      if (crx.query.locale == undefined) {
        locale = "en-us";
      } else {
        locale = crx.query.locale;
      }

      const result = await Stack.getEntryWithRef(
        "product",
        ["categories", "related_products"],
        locale
      );
      const header = await Stack.getEntryWithRef("menu","global_banner.dialog",locale);
      return {
        data: {
          result: result[0],
          header: header[0][0],
          locale: locale,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
  componentDidMount() {
    let search = new URL(window.location.href).search;
    if (search.includes("fr-fr")) {
      $("#selectpicker").val("fr-fr");
      this.setState({ locale: "fr-fr" });
      document.body.setAttribute("data-locale", "fr-fr");
    } else if (search.includes("es")) {
      $("#selectpicker").val("es");
      this.setState({ locale: "es" });
      document.body.setAttribute("data-locale", "es");
    } else {
      $("#selectpicker").val("en-us");
      this.setState({ locale: "en-us" });
      document.body.setAttribute("data-locale", "en-us");
    }
    document.body.setAttribute("data-pageref", this.props.data.result.uid);
    document.body.setAttribute("data-contenttype", "product");
    
    $('#selectpicker').on('change', function (e){
      let url = new URL(window.location.href)
      let newUrl;
      if (e.target.value === 'en-us') {
          newUrl = url.origin+ url.pathname;
      }
      else{
          newUrl = url.origin+url.pathname+`?locale=${e.target.value}`
      }
      window.location.assign(newUrl)
  })
  }
  render() {
    return (
      <Layout header={this.props.data.header} jsonCode={this.props.data.result}>
        <section className="container">
          <h2 className="theme--heading-font fancy text-center">Products</h2>

          <div className="row">
            {this.props.data.result.length ? (
              <div>
                <ProductCard
                  productCard={this.props.data.result}
                  locale={this.state.locale}
                />
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
