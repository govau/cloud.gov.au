import * as React from "react";
import './DevEnvironment.css';



interface Props { }

const DevEnvTwo: React.StatelessComponent<Props> = () => (
  <div className="denv-bg-lightcyan">

    <div className="denv-content">
      <h1 className="au-display-xxxl">Supercharge your software developers</h1>
      <p>The Cloud Development Environment gives your development team the tools they need to harness cloud computing within government.</p>
      <p>Reduce time wasted creating and maintaining development environments with access to the Cloud Development Environment.</p>
      <p></p>
    </div>

    <div className="denv-button-section">
      <button className="denv-button" type="button" onClick={(e) => {e.preventDefault(); window.location.href = 'https://lp.apps.y.cld.gov.au/';}}>
        Find out more
      </button>
    </div>

    

  </div>
);

export default DevEnvTwo;
