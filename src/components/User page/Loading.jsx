import React from "react";
import loading from '../../assets/img/loading.png'
import '../../assets/styles/Loading.scss'

const Loading = () => {
  return (
    <div className="loading">
      <img className="icon" src={loading} alt="loading" />
    </div>
  );
};

export default Loading;
