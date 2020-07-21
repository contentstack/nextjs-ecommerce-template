import React from "react";
class StaffVideo extends React.Component {
  render() {
    let result = this.props.items.staff_videos;
    return (
      <section id="reviews" className="container landing-page-block">
        <header>
          <h2 className="theme--heading-font">{result.label}</h2>
          <p className="subtitle">{result.lead}</p>
        </header>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 reviewer">
            <img
              className="reviewer-avatar"
              src="/images/landing/portrait.png"
            />
            <div className="revier-details">
              <p className="reviewer-name">John Hinkley</p>
              <p className="reviewer-stats">50 Videos | 200 Blog Posts</p>
              <p className="reviewer-social">
                <ion-icon name="logo-facebook"></ion-icon>
                <ion-icon name="logo-twitter"></ion-icon>
              </p>
            </div>
          </div>

          {result.videos.map(function (video, idx) {
           return <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={idx}>
              <iframe
                title="vimeo-player"
                src={"https://player.vimeo.com/video/"+ video.video}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>;
          })}
        </div>
      </section>
    );
  }
}
export default StaffVideo;
