import React from "react";
class Explainer extends React.Component {
  render() {
      const data = this.props.data.explainer_banner
    return (
      <div className={`row explainer-container ${data.full_width?"full-width":"" }`}>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div
            className="explainer"
            style={{ backgroundImage: `url(${data.image.url}?height=250&width=1140&fit=crop)` }}
          >
            <h3 className="theme--heading-font">{ data.title }</h3>
            <p>{ data.description }</p>
            <a className="explainer-button" href={ data.button.href }>
              { data.button.title }
            </a>
          </div>
        </div>
      </div>
    );
  }
}
export default Explainer;
