import React from "react";
import { graphql } from "gatsby";

import "../../styles/fonts/req.scss";
import "../../styles/css/main.scss";
import "../../styles/prism/solarized.scss";
import "../../styles/prism/gatsby-highlight.scss";

import Container from "../grid/container";
import Navbar from "../navbar";
import Sidebar from "../sidebar";

class BaseLayout extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let data = this.props.data;
    let copyright = this.props.data.config.siteMetadata.copyright;
    return (
      <div>
        <Sidebar
          menu={data.config.siteMetadata.menu}
          version={data.config.siteMetadata.version}
          active={false}
          page_url={this.props.location.pathname}
        />
        <div className="content">
          <Navbar
            brand_name={data.config.siteMetadata.author}
            menu={data.config.siteMetadata.menu}
            page_url={this.props.location.pathname}
          />
          <Container>
            <div className="main-content">
              {this.props.children}
            </div>
          </Container>
          <footer className="footer">
            <center>
              <p
                dangerouslySetInnerHTML={{
                  __html: copyright}}
              />
            </center>
          </footer>
        </div>
      </div>
    );
  }
}

export default BaseLayout;


export const query = graphql`
  query SidebarQuery
  {
    config: site
    {
      siteMetadata
      {
        author
        title
        description
        copyright
        version
        menu
        {
          name
          icon
          url
          submenu
          {
            name
            icon
            url
          }
        }
      }
    }
  }
`;