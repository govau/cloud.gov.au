import * as React from "react";
import './DevEnvironment.css';



interface Props { }

const DevEnvTwo: React.StatelessComponent<Props> = () => (
  <div className="denv-bg-lightcyan">

    <div className="denv-content">
      <h2 className="au-display-xxl">Cloud Development Environment</h2>
      <p>A new feature to cloud.gov.au that gives developers the tools to run code anywhere in the world.</p>
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
