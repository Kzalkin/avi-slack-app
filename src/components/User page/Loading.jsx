import React from "react";
import loading from '../../assets/img/loading.png'

const Loading = () => {
  return (
    <div className="loading">
      {/* <i className="fa-solid fa-spinner icon"/> */}
      <img className="icon" src={loading} alt="loading" />
      {/* <i className="fa-solid fa-loader icon"/> */}
      {/* <i className="fa-solid fa-arrow-rotate-right icon"/> */}
    </div>
  );
};

export default Loading;
