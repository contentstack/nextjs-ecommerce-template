/* eslint-disable react/prop-types */
import React, { Component } from "react";
import GlobalBanner from "./GlobalBanner";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
class Layout extends Component {
  render() {
    return (
      <div className="mainContent">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Ecommerce Demo</title>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <link
            href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
            crossOrigin="anonymous"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css"
            rel="stylesheet"
            integrity="sha256-HB49n/BZjuqiCtQQf49OdZn63XuKFaxcIHWf0HNKte8="
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Header header={this.props.header} jsonCode={this.props.jsonCode}/>
        {this.props.header.global_banner.enabled?<GlobalBanner context={this.props.header.global_banner}/>:null}
        <main>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}
export default Layout;
