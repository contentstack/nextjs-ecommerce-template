import React from "react";
class ProductCard extends React.Component {
  render() {
    const card = this.props.productCard;
    function createCard(item, id) {
      return (
        <div
          className="product-card col-lg-3 col-md-4 col-sm-6 col-xs-12"
          key={id}
        >
          <div className="product-card-image-container">
            <a href={item.url}>
              <img src={item.featured_image[0].url + "?width=225&height=225"} />
            </a>
          </div>
          <div className="product-card-details">
            <h4>{item.title}</h4>
            <h5>{'$'+item.price}</h5>
          </div>
          {addToCart(item)}
        </div>
      );
    }
    function addToCart(item) {
      return (
        <div className="simpleCart_shelfItem">
          <img
            style={{ display: "none" }}
            className="item_thumb"
            src={item.featured_image[0].url + "?width=70&height=70"}
          />

          <h2 style={{ display: "none" }} className="item_name">
            {item.title}
          </h2>

          <span style={{ display: "none" }} className="item_price">
            {"$" + item.price}
          </span>

          <a href="#" className="item_add_simplecart item_add add2cart">
            <ion-icon name="cart-outline"></ion-icon>
            <span className="add theme--heading-font">Add</span>
          </a>
        </div>
      );
    }
    return <div className="row">{card.map(createCard)}</div>;
  }
}
export default ProductCard;
