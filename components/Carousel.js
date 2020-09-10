/* eslint-disable react/prop-types */
import React from "react";
class Carousel extends React.Component {
  render() {

    function createCarousel(imgs, idx) {
      return (
        <div className={`item ${idx === 0 ? "active" : ""}`} key={idx}>
          <img
            src={imgs.image.url + "?height=450&width=1140&fit=crop"}
            alt={imgs.image.filename}
          />
          <div className="carousel-caption">
            <h3>{imgs.title}</h3>
            <p>{imgs.description}</p>
          </div>
        </div>
      );
    }
    
    return (
      <section id="carousel">
        <div className="row">
          <div className="col-lg-12">
            <div
              id="carouselBody"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                {this.props.carousel.map((item, id) => {
                  return (
                    <li
                      key={id}
                      data-target={"#" + id}
                      data-slide-to={id}
                      className={`${id === 0 ? "active" : ""}`}
                    ></li>
                  );
                })}
              </ol>
              {/* Wrapper for Slides */}
              <div className="carousel-inner" role="listbox">
                {this.props.carousel.map(createCarousel)}
              </div>

              {/* Controls  */}
              <a
                className="left carousel-control"
                role="button"
                href="#carouselBody"
                data-slide="prev"
              >
                <span
                  className="glyphicon glyphicon-chevron-left"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="right carousel-control"
                role="button"
                href="#carouselBody"
                data-slide="next"
              >
                <span
                  className="glyphicon glyphicon-chevron-right"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Carousel;
