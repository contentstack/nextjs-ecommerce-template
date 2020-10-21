/* eslint-disable react/prop-types */
import React from "react";
import Dialog from "./Dialog";
class GlobalBanner extends React.Component {
  render() {
    return (
      <div>
        <article className="global-banner">
          <button
            type="button"
            style={{
              width: "100%",
              background: "transparent",
              borderColor: "transparent",
              outline: "0",
            }}
            data-toggle="modal"
            data-target="#dialog_devtools"
          >
            <a id="dialog_global_banner_trigger" href="#">
              {this.props.context.label}
            </a>
          </button>
        </article>
        <Dialog
          targetId="dialog_devtools"
          offer={{
            title: this.props.context.dialog[0].title,
            body:this.props.context.dialog[0].body }}
        />
      </div>
    );
  }
}
export default GlobalBanner;
