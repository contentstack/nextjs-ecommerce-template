/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
import React from "react";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import Stack from "../sdk-plugins/index";
import ProductCard from "../components/ProductCard";
import Explainer from "../components/Explainer";

let locale;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locale: undefined };
  }

  static async getInitialProps(ctx) {
    try {
      if (ctx.query.locale == undefined) {
        locale = "en-us";
      } else {
        locale = ctx.query.locale;
      }

      const result = await Stack.getEntryWithRef(
        "homepage",
        "new_arrivals.products",
        locale
      );
      const header = await Stack.getEntryWithRef("menu","global_banner.dialog",locale);

      return {
        data: { result: result[0][0], header: header[0][0] },
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
    document.body.setAttribute("data-contenttype", "homepage");

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
    const threeColumn = (col, idx) => {
      return (
        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12" key={idx}>
          <div className="three-columns-detail">
            <h3 className="theme--heading-font">{col.title}</h3>
            <img src={col.image.url + "?width=75&height=75"} />
            <p>{col.description}</p>
          </div>
        </div>
      );
    };

    const newArrivals = (arrival, id) => {
      return (
        <div key={id} className="newArrivalsSection">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="theme--heading-font fancy text-center">
                {arrival.title}
              </h2>
            </div>
            <ProductCard
              productCard={arrival.products}
              locale={this.state.locale}
            />
          </div>
        </div>
      );
    };
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
