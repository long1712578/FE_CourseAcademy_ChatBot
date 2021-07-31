import React from "react";
import Header from "../../component/header";
import Footer from "../../component/footer";
import "./contact.css";

const Contact = () => {
  return (
    <div>
      <React.Fragment>
        <Header />
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a title="home" href="/">
                <i class="fas fa-home contact"></i>
              </a>
            </li>
            <li>
              <i class="fas fa-chevron-right"></i>&nbsp; Contact
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
                      <i className="fas fa-map-marker-alt"></i>
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
                            1 Tran Hung Dao Street, 1 District, Ho Chi Minh City, VN
                          </font>
                        </font>
                      </p>
                    </div>
                    <div
                      className="col-xs-12 col-sm-3 contactPoint"
                      data-mh="matchHeight"
                      style={{ height: "261px" }}
                    >
                      <i className="fas fa-phone-alt"></i>
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
                      <i className="fas fa-comments"></i>
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
                          The bottom right corner of the screen (8am to 5pm, Monday to Friday){" "}
                          </font>
                        </font>
                      </p>
                    </div>
                    <div
                      className="col-xs-12 col-sm-3 contactPoint"
                      data-mh="matchHeight"
                      style={{ height: "261px" }}
                    >
                      <i className="fas fa-envelope"></i>
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
                          Please contact us via the following email course@gmail.com.
                          </font>
                        </font>
                      </p>
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
