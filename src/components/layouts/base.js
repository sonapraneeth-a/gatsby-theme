import React from "react";
import { StaticQuery, graphql } from "gatsby";

import "../../styles/css/main.scss";

import config from "../../../data/config";

import Container from "../grid/container";
import Navbar from "../navbar";
import Sidebar from "../sidebar";
import Footer from "../footer";

class BaseLayout extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      reveal_status: false,
    };
  }

  updateRevealStatus()
  {
    let current_reveal_status = this.state.reveal_status;
    current_reveal_status = current_reveal_status !== true;
    this.setState({
      reveal_status: current_reveal_status,
    });
  }

  onClose()
  {
    this.setState({
      reveal_status: false,
    });
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
          let content_class_name = "content";
          let sidebar_toggle_class_name = "sidebar-toggle";
          if(config.ui.sidebar_reveal === "push")
          {
            if(this.state.reveal_status === true)
            {
              content_class_name += " off";
              sidebar_toggle_class_name += " off";
            }
          }
          return (
            <div>
              <label className={sidebar_toggle_class_name} onClick={() => this.updateRevealStatus()}>
                <i className="fa fa-bars" aria-hidden={"true"}></i>
              </label>
              <Sidebar
                menu={menu}
                version={version}
                active={this.state.reveal_status}
                page_url={this.props.location.pathname}
                onClose={this.onClose.bind(this)}
              />
              <div className={content_class_name}>
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
                  hidden={this.state.reveal_status}
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
