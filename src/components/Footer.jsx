import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <div className={ "media mt-1" } style={{ margin: "0 auto", width: '45%' }}>
        <div className="card mb-3 navbar-cards" style={{width: '100%', margin: "0 auto"}}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={ require("../images/bg/seaturtles.jpeg") } className="card-img" alt="..." style={{ objectFit: "cover", height: "170px", width: "100%" }} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Last piece of info</h5>
                <p className="card-text" style={{ fontSize: "13px" }}>Infomation might not be up to date and/or may not contain everything. Please contact me for full verfication.</p>
                <p className="card-text"><small className="text-muted">References available upon request.</small></p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Footer;
