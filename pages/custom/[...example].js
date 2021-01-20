/* eslint-disable react/prop-types */
/* eslint-disable no-prototype-builtins */
import React from "react";
import Stack from "../../sdk-plugins/index";
import Layout from "../../components/Layout";
import Error from "next/error";
import TextArea from "../../template/landing-page/text-area";
import Carousel from "../../components/Carousel";

class Example extends React.Component {
  static async getInitialProps(crx) {
    try {
      let locale, entryURL;
      if (crx.query.locale != undefined) {
        locale = crx.query.locale;
        entryURL = crx.asPath.split("?locale")[0];
      } else {
        locale = "en-us";
        entryURL = crx.asPath;
      }
      let result = await Stack.getEntrySpecificWithoutRef(
        "custom_pages",
        entryURL,
        locale
      );
      const header = await Stack.getEntryWithRef("menu","global_banner.dialog",locale);
      return {
        data: {
          result: result[0],
          header: header[0][0],
          statusCode: 200,
        },
      };
    } catch {
      return { data: { statusCode: 404 } };
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      result: undefined,
      content: [],
    };
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
    document.body.setAttribute("data-contenttype", "custom_pages");

    this.setState({ result: this.props.data.result });

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
    let result = this.state.result;
    function renderContent() {
      let send = [];
      if (result) {
        for (const idx in result.modular_blocks) {
          if (result.modular_blocks[idx].hasOwnProperty("text_area")) {
            let content = (
              <TextArea key={idx} items={result.modular_blocks[idx]} />
            );
            send.push(content);
          } else if (result.modular_blocks[idx].hasOwnProperty("carousel")) {
            let content = (
              <Carousel
                key={idx}
                carousel={result.modular_blocks[idx].carousel.items}
              />
            );
            send.push(content);
          }
        }
      }
      return send;
    }
    return this.props.data.statusCode === 200 ? (
      <Layout header={this.props.data.header} jsonCode={this.props.data.result}>
        <div className="container">
          <section id="modular-blocks">
            {this.state.result ? renderContent() : ""}
          </section>
        </div>
      </Layout>
    ) : (
      <Error statusCode={this.props.data.statusCode} />
    );
  }
}
export default Example;
