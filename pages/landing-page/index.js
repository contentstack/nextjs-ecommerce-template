import React from "react";
import Error from "next/error";
import Stack from "../../sdk-plugins/index";
import Layout from "../../components/Layout";
class AllLandingPage extends React.Component {
  static async getInitialProps({ query }) {
    try {
      let locale;
      if (query.locale == undefined) {
        locale = "en-us";
      } else {
        locale = query.locale;
      }

      const result = await Stack.getEntryWithoutRef("landing_pages", locale);
      const header = await Stack.getEntryWithoutRef("menu", locale);
      return {
        data: {
          result: result[0],
          header: header[0][0],
          statusCode: 200,
          query: locale,
        },
      };
    } catch (error) {
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
    return this.props.data.statusCode === 200 ? (
      <Layout header={this.props.data.header} jsonCode={this.props.data.result}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="theme--heading-font fancy text-center">
                All Custom Pages
              </h2>
            </div>
          </div>

          {this.props.data.result.map(function (card, idx) {
            return (
              <div
                className="listing-page-card col-lg-3 col-md-4 col-sm-6 col-xs-12"
                key={idx}
              >
                <a href={card.url} className="listing-page-card-details">
                  <h4>{card.title}</h4>
                  <p>
                    Example using:
                    <span className="listing-page-card-using">
                      {card.tweet_text}
                    </span>
                    .
                  </p>
                  <footer>
                    <p className="listing-page-card-author">
                      <ion-icon name="person-outline"></ion-icon>
                      {card._owner.first_name} {card._owner.last_name}
                    </p>
                    <p className="listing-page-card-updated">
                      <ion-icon name="time-outline"></ion-icon>{" "}
                      {`${new Date(card.publish_details.time)}`}
                    </p>
                  </footer>
                </a>
              </div>
            );
          })}
        </div>
      </Layout>
    ) : (
      <Error statusCode={this.props.data.statusCode} />
    );
  }
}
export default AllLandingPage;
