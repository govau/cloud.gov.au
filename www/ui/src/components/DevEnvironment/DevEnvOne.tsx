import * as React from "react";
import './DevEnvironment.css';



interface Props { }

const DevEnvOne: React.StatelessComponent<Props> = () => (
  <div className="denv-bg-teal">

       <img className="denv-image" width="100%" src={require('./Coding.png')} />


  </div>
);

export default DevEnvOne;
