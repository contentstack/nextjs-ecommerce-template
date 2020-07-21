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
  static async getInitialProps({ query }) {
    try {
      if (query.link === "weekend-sale") {
        let locale;
        if (query.locale != undefined) {
          locale = query.locale;
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
        const header = await Stack.getEntryWithoutRef("menu", locale);
        return {
          data: {
            result: result[0][0],
            header: header[0][0],
            statusCode: 200,
            locale: locale,
          },
        };
      } else {
        throw { statusCode: 404, errorMessage: "Page not found" };
      }
    } catch (error) {
      console.log(error);
      return { data: { statusCode: error.statusCode, query: query } };
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

            <div className="container">
              <div className="row">
                {result.offer.enabled ? (
                  <span className="ribbon5 theme--brand-trinary-color-background">
                    <button
                      type="button"
                      style={{
                        width: "100%",
                        background: "transparent",
                        borderColor: "transparent",
                        outline: "0",
                      }}
                      data-toggle="modal"
                      data-target="#dialog_offer"
                    >
                      <a
                        className="theme--brand-trinary-inverse-color"
                        id="ribbon_trigger"
                        href="#"
                      >
                        {result.offer.label}
                      </a>
                    </button>
                    <Dialog
                      targetId="dialog_offer"
                      offer={{
                        title: result.offer.dialog[0].title,
                        body: result.offer.dialog[0].body,
                      }}
                    />
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
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
