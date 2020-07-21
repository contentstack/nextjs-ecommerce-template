import React from "react";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import Stack from "../sdk-plugins/index";
import ProductCard from "../components/ProductCard";
import Explainer from "../components/Explainer";
class Home extends React.Component {
  static async getInitialProps({ query }) {
    try {
      let locale;
      if (query.locale == undefined) {
        locale = "en-us";
      } else {
        locale = query.locale;
      }

      const result = await Stack.getEntryWithRef(
        "homepage",
        "new_arrivals.products",
        locale
      );
      const header = await Stack.getEntryWithoutRef("menu", locale);
      return {
        data: { result: result[0][0], header: header[0][0], query: locale },
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
    function threeColumn(col, idx) {
      return (
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" key={idx}>
          <div className="three-columns-detail">
            <h3 className="theme--heading-font">{col.title}</h3>
            <img src={col.image.url + "?width=75&height=75"} />
            <p>{col.description}</p>
          </div>
        </div>
      );
    }

    function newArrivals(arrival, id) {
      return (
        <div key={id} className="newArrivalsSection">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="theme--heading-font fancy text-center">
                {arrival.title}
              </h2>
            </div>
            <ProductCard productCard={arrival.products} />
          </div>
        </div>
      );
    }
    return (
      <Layout header={this.props.data.header} jsonCode={this.props.data.result}>
        <div className="container">
          <Carousel carousel={this.props.data.result.carousel.items} />
          <section id="modular-blocks">
            {this.props.data.result.modular_blocks.map(function (row, idx) {
              if (row.hasOwnProperty("three_columns_of_details")) {
                return (
                  <div className="row" key={idx}>
                    <article className="three-columns-container">
                      {row.three_columns_of_details.columns.map(threeColumn)}
                    </article>
                  </div>
                );
              } else {
                return <Explainer data={row} key={idx} />;
              }
            })}
          </section>
          <section id="arrivals">
            <div className="row">
              <div className="col-lg-12">
                <hr />
              </div>
            </div>
            {this.props.data.result.new_arrivals.map(newArrivals)}
          </section>
        </div>
      </Layout>
    );
  }
}
export default Home;
