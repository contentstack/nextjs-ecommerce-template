import React from "react";
class Dialog extends React.Component {
  render() {
    return (
      this.props.hasOwnProperty('offer')?
      <div
        className="modal fade"
        id={this.props.targetId}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={this.props.targetId + "_label"}
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
              <h4 className="modal-title" id={this.props.targetId + "_label"}>
                {this.props.offer.title}
              </h4>
            </div>
            <div className="modal-body" dangerouslySetInnerHTML={{__html:this.props.offer.body}}></div>
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
      :""
    );
  }
}
export default Dialog;
