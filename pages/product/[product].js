/* eslint-disable react/prop-types */
import React from "react";
import Error from "next/error";
import Link from "next/link";
import Layout from "../../components/Layout";
import Stack from "../../sdk-plugins/index";
import ProductCard from "../../components/ProductCard";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = { locale: undefined, data: {} };
  }

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
      const result = await Stack.getEntrySpecificWithRef(
        "product",
        entryURL,
        ["categories", "related_products"],
        locale
      );
      const header = await Stack.getEntryWithRef(
        "menu",
        "global_banner.dialog",
        locale
      );
      return {
        data: {
          result: result[0][0],
          header: header[0][0],
          query: locale,
          statusCode: 200,
        },
      };
    } catch (error) {
      console.log(error);
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
    document.body.setAttribute("data-contenttype", "product");

    this.setState({ data: this.props.data.result });

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
    let data = this.state.data;
    function productStar(length) {
      let arr = [0, 1, 2, 3, 4];

      return arr.map(function (star, idx) {
        if (star < length) {
          return <span className="fa fa-star" key={idx}></span>;
        } else {
          return <span className="fa fa-star-o" key={idx}></span>;
        }
      });
    }

    const renderContent = () => {
      if (data) {
        return (
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-container">
                  {data.categories ? (
                    <Link
                    href={{
                      pathname: data.categories[0].url,
                      query: { locale: this.state.locale },
                    }}
                  >
                    <a
                       className="breadcrumb-link"
                       
                    >
                       {data.categories[0].title}
                     </a>
                    </Link>
                  ) : (
                    ""
                  )}
                  <span className="breadcrumb-sep">/</span>
                  <span className="breadcrumb-current">Featured</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-7 col-xs-12">
                <div className="slider-container">
                  <div className="slider">
                    {data.featured_image
                      ? data.featured_image.map(function (image, id) {
                          if (id === 0)
                            return (
                              <img
                                id="slideMainContent"
                                src={image.url + "?width=450&height=450"}
                                alt={image.filename}
                                draggable="false"
                                key={id}
                              />
                            );
                        })
                      : ""}
                  </div>
                  <div className="slider-nav">
                    {data.featured_image
                      ? data.featured_image.map(function (image, id) {
                          return (
                            <img
                              onClick={(e) => {
                                $("#slideMainContent").attr(
                                  "src",
                                  e.target.src
                                );
                              }}
                              src={image.url + "?width=450&height=450"}
                              alt={image.filename}
                              draggable="false"
                              key={id}
                            />
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>

              <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
                <h1 className="theme--heading-font product-title">
                  {data.title}
                </h1>
                <h2 className="theme--heading-font product-price">
                  {data.price ? "$" + data.price : ""}
                </h2>

                <div className="product-stars">{productStar(data.ratings)}</div>
                {data.description ? (
                  <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
                ) : (
                  ""
                )}

                <div className="product-details">
                  <h3>Categories</h3>

                  {data.categories
                    ? data.categories.map(function (cat) {
                        return `${cat.title}`;
                      })
                    : ""}
                </div>

                <div className="input-group input-number-group">
                  <div className="input-group-button">
                    <span className="input-number-decrement">
                      <ion-icon name="remove-outline"></ion-icon>
                    </span>
                  </div>

                  <input
                    className="input-number"
                    type="number"
                    value="1"
                    readOnly
                    disabled
                  />

                  <div className="input-group-button">
                    <span className="input-number-increment">
                      <ion-icon name="add-outline"></ion-icon>
                    </span>
                  </div>
                </div>
                <div className="simpleCart_shelfItem">
                  {data.featured_image ? (
                    <img
                      style={{ display: "none" }}
                      className="item_thumb"
                      src={data.featured_image[0].url + "?width=70&height=70"}
                    />
                  ) : (
                    ""
                  )}

                  <h2 style={{ display: "none" }} className="item_name">
                    {data.title}
                  </h2>

                  <span style={{ display: "none" }} className="item_price">
                    {"$" + data.price}
                  </span>

                  <a href="" className="item_add_simplecart item_add add2cart">
                    <ion-icon name="cart-outline"></ion-icon>
                    <span className="add theme--heading-font">Add</span>
                  </a>
                </div>
              </div>
            </div>

            {data.related_products ? (
              <section id="related-products">
                <div className="row">
                  <div className="col-lg-12">
                    <hr />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <h2 className="theme--heading-font fancy text-center">
                      Similar Products
                    </h2>
                  </div>
                </div>

                <div className="row">
                  {data.related_products ? (
                    <ProductCard
                      productCard={data.related_products}
                      locale={this.state.locale}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </section>
            ) : (
              ""
            )}
          </div>
        );
      }
    };

    return this.props.data.statusCode === 200 ? (
      <Layout header={this.props.data.header} jsonCode={this.props.data.result}>
        {renderContent()}
      </Layout>
    ) : (
      <Error statusCode={this.props.data.statusCode} />
    );
  }
}
export default Product;
