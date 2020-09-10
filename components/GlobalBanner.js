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
              To Our Community: Please read this important update.
            </a>
          </button>
        </article>
        <Dialog
          targetId="dialog_devtools"
          offer={{
            title: "An Important Update",
            body:
              "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
          }}
        />
      </div>
    );
  }
}
export default GlobalBanner;
