import React from "react";

interface LoaderProps {
  centered?: boolean;
}
const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <div className={props.centered ? "loader loader__centered" : "loader"}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
