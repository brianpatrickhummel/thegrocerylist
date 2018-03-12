import React from "react";
import { connect } from "react-redux";

const Search = ({ auth }) => {
  // let username = auth.primaryDisplayName;
  return auth && [<h2 key="header">{auth.primaryDisplayName}</h2>];
};

function mapStateToProps({ auth }) {
  console.log(`Search auth = ${JSON.stringify(auth)}`);
  return { auth };
}

export default connect(mapStateToProps)(Search);
