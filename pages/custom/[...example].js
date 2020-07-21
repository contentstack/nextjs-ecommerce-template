import React from "react";
import Stack from "../../sdk-plugins/index";
import Layout from "../../components/Layout";
import Error from "next/error";
import TextArea from "../../template/landing-page/text-area";
import Carousel from "../../components/Carousel";

class Example extends React.Component {
  static async getInitialProps({ query }) {
    try {
      let locale;
      if (query.locale == undefined) {
        locale = "en-us";
      } else {
        locale = query.locale;
      }

      const result = await Stack.getEntrySpecific(
        "custom_pages",
        query.example[1],
        locale
      );
      const header = await Stack.getEntryWithoutRef("menu", locale);
      return {
        data: {
          result: result,
          header: header[0][0],
          statusCode: 200,
          query: locale,
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
    if (search.includes("locale")) {
      $("#selectpicker").val("fr-fr");
    } else {
      $("#selectpicker").val("en-us");
    }
    this.setState({ result: this.props.data.result });
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
