/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Link from "next/link";
import DevTools from "./DevTools";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { locale: undefined };
  }
  componentDidMount() {
    let search = new URL(window.location.href).search;
    if (search.includes("fr-fr")) {
      this.setState({ locale: "fr-fr" });
    } else if (search.includes("es")) {
      this.setState({ locale: "es" });
    } else {
      this.setState({ locale: "en-us" });
    }
  }

  render() {
    const createMenu = (header) => {
      return header.menu_section.map((list, idx) => {
        if (list.column.length !== 0) {
          return (
            <div className="sd-menu-dropdown" key={idx}>
              <button className="sd-menu-dropdown-button">
                <span className="sd-menu-title theme--menu-font theme--menu-text-color">
                  {list.menu_title}
                </span>
              </button>
              <div className="sd-menu-dropdown-content theme--menu-content-background">
                <div className="sd-menu-row">
                  {list.column.map((col) => {
                    return col.group.map((group, idx) => {
                      return group.menu_item.length != 0 ? (
                        <div className="sd-menu-column" key={idx}>
                          <h3
                            className="theme--menu-font theme--menu-content-heading-color"
                            style={{ color: "#000", fontWeight: "bold" }}
                          >
                            {group.group_title}
                          </h3>
                          {group.menu_item.map((item, i) => {
                            return (
                              <Link
                                key={i}
                                className="sd-menu-column-link theme--menu-content-link-color"
                                style={{ color: "#000" }}
                                href={{
                                  pathname: item.custom_link,
                                  query: { locale: this.state.locale },
                                }}
                              >
                                {/* <a
                                > */}
                                {item.item_title}
                                {/* </a> */}
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <div
                          className="sd-menu-column sd-menu-terminal"
                          key={idx}
                        >
                          <Link
                            style={{ color: "#000" }}
                            className="sd-menu-column-link theme--menu-content-link-color"
                            href={{
                              pathname: group.custom_link,
                              query: { locale: this.state.locale },
                            }}
                          >
                            {/* <a */}
                            {/* // href={group.custom_link} */}
                            {/* // > */}
                            {group.group_title}
                            {/* </a> */}
                          </Link>
                        </div>
                      );
                    });
                  })}
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <Link
              key={idx}
              className="sd-menu-link"
              href={{
                pathname: list.custom_link,
                query: { locale: this.state.locale },
              }}
            >
              <span className="sd-menu-title theme--menu-font theme--menu-text-color" style={{ color: "#fff", cursor:"pointer"}}>
                {list.menu_title}
              </span>
            </Link>
          );
        }
      });
    };
    return this.props.header ? (
      <header>
        <div
          className="sd-menu-container theme--menu-background"
          style={{ background: "#000", color: "#fff" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="sd-menu theme--menu-background">
                  <Link
                    className="sd-menu-brand"
                    href={{
                      pathname: "/",
                      query: { locale: this.state.locale },
                    }}
                  >
                    {/* <a > */}
                    <img
                      src="/badger-35.png"
                      alt="logo"
                      width="35px"
                      height="35px"
                    />
                    {/* </a> */}
                  </Link>
                  {createMenu(this.props.header)}
                  <ul className="theme--menu-text-color" id="header-options">
                    <li>
                      <div className="lang-dropdown">
                        <i className="fa fa-globe" aria-hidden="true"></i>
                        <select id="selectpicker" data-width="fit">
                          <option value="en-us">English</option>
                          <option value="fr-fr">French</option>
                          <option value="es">Spanish</option>
                        </select>
                      </div>
                    </li>
                    <li>
                      <button id="cart">
                        <span className="item-count simpleCart_quantity"></span>
                        <i
                          className="fa fa-shopping-cart theme--menu-text-color"
                          aria-hidden="true"
                          style={{ color: "#fff" }}
                        ></i>
                      </button>
                    </li>
                    <li>
                      {this.props.jsonCode ? (
                        <DevTools jsonCode={this.props.jsonCode} />
                      ) : (
                        ""
                      )}
                    </li>
                    <div className="cart-container">
                      <div className="shopping-cart">
                        <div className="shopping-cart-header">
                          <div className="shopping-cart-total">
                            <span className="lighter-text">Total:</span>
                            <span className="simpleCart_total"></span>
                          </div>
                        </div>
                        <div className="simpleCart_items"></div>
                        <a
                          href="#"
                          className="simpleCart_checkout_button button"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    ) : (
      ""
    );
  }
}
export default Header;
