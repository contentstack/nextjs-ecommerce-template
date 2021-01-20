/* eslint-disable react/prop-types */
import React from "react";
import Error from "next/error";
import Stack from "../../sdk-plugins/index";
import Layout from "../../components/Layout";
import Dialog from "../../components/Dialog";
import TextArea from "../../template/landing-page/text-area";
import CategorySales from "../../template/landing-page/category-sales";
import CategoryTrends from "../../template/landing-page/trending";
import CategoryFeatures from "../../template/landing-page/features";
import NewsLetter from "../../template/landing-page/newsletter";
import StaffVideo from "../../template/landing-page/staff-videos";
import CategoryProducts from "../../template/landing-page/products";

class LandingPage extends React.Component {
  static async getInitialProps(crx) {
    try {
      let locale;
      if (crx.query.locale != undefined) {
        locale = crx.query.locale;
      } else {
        locale = "en-us";
      }
      const result = await Stack.getEntryWithRef(
        "landing_pages",
        [
          "offer.dialog",
          "modular_blocks.products.reference",
          "modular_blocks.products.reference.categories",
          "modular_blocks.category_sales.categories.category",
          "modular_blocks.trending.categories.category",
        ],
        locale
      );
      const header = await Stack.getEntryWithRef("menu","global_banner.dialog",locale);
      return {
        data: {
          result: result[0][0],
          header: header[0][0],
          statusCode: 200,
          locale: locale,
        },
      };
    } catch (error) {
      console.log(error);
      return { data: { statusCode: error.statusCode } };
    }
  }

  componentDidMount() {
    let search = new URL(window.location.href).search;
    if (search.includes("fr-fr")) {
      $("#selectpicker").val("fr-fr");
      document.body.setAttribute("data-locale", "fr-fr");
    } else if (search.includes("es")) {
      $("#selectpicker").val("es");
      document.body.setAttribute("data-locale", "es");
    } else {
      $("#selectpicker").val("en-us");
      document.body.setAttribute("data-locale", "en-us");
    }
    document.body.setAttribute("data-pageref", this.props.data.result.uid);
    document.body.setAttribute("data-contenttype", "landing_pages");

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
    const result = this.props.data.result;
    return this.props.data.statusCode === 200 ? (
      <Layout header={this.props.data.header} jsonCode={this.props.data.result}>
        <div id="landing-page">
          <header
            id="page-header"
            style={{
              backgroundSize: "cover",
              backgroundImage: ` url(${result.background_image.url}?quality=85)`,
            }}
          >
            <div className="page-header-bground theme--brand-primary-color-background"></div>

            <section id="member-header" className="container">
              <div className="row">
                <div className="col-lg-6 member-header-content member-header-shadow">
                  <div className="member-header-social">
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-twitter"></ion-icon>
                  </div>
                </div>
                <div className="col-lg-6 member-header-content">
                  <hr />
                  <h2
                    dangerouslySetInnerHTML={{ __html: result.c2a.heading }}
                  ></h2>
                  <footer>
                    <p>{result.c2a.text}</p>
                    <form id="frmTrack">
                      <input
                        type="hidden"
                        name="userId"
                        value="{{ data.userId }}"
                      />
                      <button type="submit" className="signup">
                        {result.c2a.button.title}
                      </button>
                    </form>
                  </footer>
                </div>
              </div>
            </section>
            <CategorySales items={result.modular_blocks[0]} />
          </header>

          <div
            className="modular-blocks"
            style={{ background: "linear-gradient(#ECE5CE, #D5C796)" }}
          >
            {result.modular_blocks.map(function (item, idx) {
              if (item.hasOwnProperty("trending")) {
                return <CategoryTrends key={idx} items={item} />;
              } else if (item.hasOwnProperty("features")) {
                return <CategoryFeatures key={idx} items={item} />;
              } else if (item.hasOwnProperty("staff_videos")) {
                return <StaffVideo key={idx} items={item} />;
              } else if (item.hasOwnProperty("products")) {
                return <CategoryProducts key={idx} items={item} />;
              } else if (item.hasOwnProperty("form")) {
                return <NewsLetter key={idx} items={item} />;
              } else if (item.hasOwnProperty("text_area")) {
                return (
                  <section
                    key={idx}
                    id="global-widgets"
                    className="container landing-page-block"
                  >
                    <TextArea items={item} />
                  </section>
                );
              }
            })}
          </div>
        </div>
      </Layout>
    ) : (
      <Error statusCode={this.props.data.statusCode} />
    );
  }
}
export default LandingPage;
