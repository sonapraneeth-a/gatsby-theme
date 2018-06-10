import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import moment from "moment";

import "../styles/fonts/req.scss";
import "../styles/css/main.scss";
import "../styles/prism/solarized.scss";
import "../styles/prism/gatsby-highlight.scss";

import Container from "../components/container";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

// export default ({ children, data }) => (
class BaseLayout extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let data = this.props.data;
    console.log(this.props.data);
    console.log(data);
    let copyright = this.props.data.config.siteMetadata.copyright;
    console.log("Path: " +this.props.match.path);
    console.log("Location: " +this.props.location.pathname);
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
            <div style={{margin: '6rem 0'}}>
              {this.props.children()}
            </div>
          </Container>
          <footer className="footer sticky-bottom">
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