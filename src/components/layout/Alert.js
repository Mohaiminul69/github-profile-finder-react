import React, { Component } from "react";

const Alert = ({ alert }) => {
  return (
    alert !== null && (
      <div className={`alert alert-${alert.className}`}>
        <i className="fas fa-info-circle mr-2">{alert.msg}</i>
      </div>
    )
  );
};

export default Alert;
