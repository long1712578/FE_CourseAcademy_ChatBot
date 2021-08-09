import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import "./contact.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Contact = () => {
  return (
    <div>
      <React.Fragment>
        <Header />
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a title="home" href="/">
                <i className="fas fa-home contact"></i>
              </a>
            </li>
            <li>
              <i className="fas fa-chevron-right"></i>&nbsp; Contact
            </li>
          </ul>
          <section className="contactDetails">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xs-12 col-lg-10 col-lg-offset-1 text-center">
                  <div className="row">
                    <div
                      className="col-xs-12 col-sm-3 contactPoint"
                      data-mh="matchHeight"
                      style={{ height: "261px" }}
                    >
                      <span className="icon icon-sm rounded-circle border">
                        <i className="fas fa-map-marker-alt"></i>
                      </span>
                      <h3>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            Write to us
                          </font>
                        </font>
                      </h3>
                      <p>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            1 Tran Hung Dao Street, 1 District, Ho Chi Minh
                            City, VN
                          </font>
                        </font>
                      </p>
                    </div>
                    <div
                      className="col-xs-12 col-sm-3 contactPoint"
                      data-mh="matchHeight"
                      style={{ height: "261px" }}
                    >
                      <span className="icon icon-sm rounded-circle border">
                        <i className="fas fa-phone-alt"></i>
                      </span>
                      <h3>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            Call us
                          </font>
                        </font>
                      </h3>
                      <p>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            +84 3 0000 0079{" "}
                          </font>
                        </font>
                        <br />
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            (8am to 5pm, Monday to Friday)
                          </font>
                        </font>
                      </p>
                    </div>
                    <div
                      className="col-xs-12 col-sm-3 contactPoint"
                      data-mh="matchHeight"
                      style={{ height: "261px" }}
                    >
                      <span className="icon icon-sm rounded-circle border">
                        {" "}
                        <i className="fas fa-comments"></i>
                      </span>
                      <h3>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            Live chat
                          </font>
                        </font>
                      </h3>
                      <p>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            The bottom right corner of the screen (8am to 5pm,
                            Monday to Friday){" "}
                          </font>
                        </font>
                      </p>
                    </div>
                    <div
                      className="col-xs-12 col-sm-3 contactPoint"
                      data-mh="matchHeight"
                      style={{ height: "261px" }}
                    >
                      <span className="icon icon-sm rounded-circle border">
                        {" "}
                        <i className="fas fa-envelope"></i>
                      </span>
                      <h3>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            Email us
                          </font>
                        </font>
                      </h3>
                      <p>
                        <font style={{ verticalAlign: "inherit" }}>
                          <font style={{ verticalAlign: "inherit" }}>
                            Please contact us via the following email
                            course@gmail.com.
                          </font>
                        </font>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="contactMap">
            <div className="row">
              <div className="col-12 noPadding">
                <div className="section-googlemap">
                  <div id="map" className="map-wrapper">
                    <div style={{ height: "100vh", width: "100%" }}>
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5385181438746!2d106.69526951480071!3d10.770004992325893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3fa91111c7%3A0xd95716f82d6a9326!2zMSDEkC4gVHLhuqduIEjGsG5nIMSQ4bqhbywgUGjGsOG7nW5nIE5ndXnhu4VuIFRow6FpIELDrG5oLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1627737739479!5m2!1svi!2s"
                       width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default Contact;
