/* eslint-disable react/prop-types */
import React from "react";
import Error from "next/error";
import Stack from "../../sdk-plugins/index";
import Layout from "../../components/Layout";
import Link from "next/link";
import moment from 'moment';
const capitalize = (str, lower = false) => (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

class AllLandingPage extends React.Component {
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

      const result = await Stack.getEntryWithoutRef("landing_pages", locale);
      const header = await Stack.getEntryWithRef("menu","global_banner.dialog",locale);
      return {
        data: {
          result: result[0],
          header: header[0][0],
          statusCode: 200,
        },
      };
    } catch (error) {
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

          {this.props.data.result.map((card, idx) => {
            return (
              <div
                className="listing-page-card col-lg-3 col-md-4 col-sm-6 col-xs-12"
                key={idx}
              >
                <Link href={{ pathname: card.url, query: this.state.locale }}>
                  <a className="listing-page-card-details">
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
                        {capitalize(card._owner.first_name)} {capitalize(card._owner.last_name)}
                      </p>
                      <p className="listing-page-card-updated">
                        <ion-icon name="time-outline"></ion-icon>{" "}
                        {`Updated ${moment(card.publish_details.time).fromNow()}`}
                      </p>
                    </footer>
                  </a>
                </Link>
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
