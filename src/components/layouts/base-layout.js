import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../../styles/css/main.scss";

import Container from "../grid/container";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Footer from "../footer";

class BaseLayout extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <StaticQuery
        query={graphql`
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
        `}
        render={data => {
          const {author, copyright, menu, version} = data.config.siteMetadata;
          /*console.log(this.props);
          console.log(this.props.location);*/
          return (
            <div>
              <Sidebar
                menu={menu}
                version={version}
                active={false}
                page_url={this.props.location.pathname}
              />
              <div className="content">
                <Navbar
                  brand_name={author}
                  menu={menu}
                  page_url={this.props.location.pathname}
                />
                <Container>
                  <div className="main-content">
                    {this.props.children}
                  </div>
                </Container>
                <Footer
                  author={author}
                >
                </Footer>
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default BaseLayout;
