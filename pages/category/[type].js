/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import Error from "next/error";
import Layout from "../../components/Layout";
import Stack from "../../sdk-plugins/index";
import ProductCard from "../../components/ProductCard";

class CategoryType extends React.Component {

  constructor(props) {
    super(props);
    this.state = { locale: undefined };
  }
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
      const header = await Stack.getEntryWithRef("menu","global_banner.dialog",locale);
      return {
        data: {
          category: check[0].title,
          header: header[0][0],
          statusCode: 200,
          result: result[0],
        },
      };
    } catch (err) {
      console.log("error", err);
      return { data: { statusCode: 404 } };
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
    document.body.setAttribute("data-contenttype", "category");

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
    let data = this.props.data;
    return this.props.data.statusCode === 200 ? (
      <Layout header={data.header} jsonCode={this.props.data.result}>
        <section id="products" className="container">
          <h2 className="theme--heading-font fancy text-center">
            {data.category}
          </h2>

          <div className="row">
            {data.result.length != 0 ? (
              <ProductCard productCard={data.result} locale={this.state.locale} />
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
