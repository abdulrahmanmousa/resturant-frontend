import React, { Component } from "react";
import MainContent from "../../components/restaurants/maincontent";
import Layout from "../../components/layout/layout";

export default class restaurants extends Component {
  render() {
    return (
      <div>
        <Layout>
          <MainContent />
        </Layout>
      </div>
    );
  }
}
