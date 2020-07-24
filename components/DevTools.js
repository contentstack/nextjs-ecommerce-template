/* eslint-disable react/prop-types */
import React from "react";

let text =
  '{\n  "id": 0,\n  ' +
  '"script": """\n   function add(x, y) {\n      return x + y;\n   }\n   add(1, 2);\n   """' +
  ',\n   "descr": "add two numbers"\n}';

class DevTools extends React.Component {
  componentDidMount() {
    $("#dialog_devtools_box_json").jsonViewer(this.props.jsonCode, {
      collapsed: true,
    });
  }

  render() {
    return this.props.jsonCode ? (
      <div>
        <button
          id="dialog_devtools_trigger"
          type="button"
          style={{
            width: "100%",
            background: "transparent",
            borderColor: "transparent",
            outline: "0",
          }}
          data-toggle="modal"
          data-target="#dialog_devtools_box"
        >
          <i
            className="fa fa-wrench theme--menu-text-color"
            aria-hidden="true"
          ></i>
        </button>
        <div
          className="modal fade"
          id="dialog_devtools_box"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="dialog_devtools_box_label"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="dialog_devtools_box_label">
                  Developer Tools
                </h4>
              </div>
              <div className="modal-body">
                <pre
                  id="dialog_devtools_box_json"
                  style={{ height: "500px" }}
                ></pre>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
export default DevTools;
