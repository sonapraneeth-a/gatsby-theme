import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";

class HeadMeta extends React.Component
{
  constructor(props)
  {
    super(props);
    this.config = {
      author: "",
      description: "",
      keywords: "",
    }
  }

  setMetaProps()
  {
    if(this.props.title != null) { this.config.title = this.props.title; }
    if(this.props.author != null) { this.config.author = this.props.author; }
    if(this.props.description != null) { this.config.description = this.props.description; }
    if(this.props.keywords != null) { this.config.keywords = this.props.keywords; }
  }

  render()
  {
    this.setMetaProps();
    return (
      <div>
        <Helmet
          title={this.config.title}
          meta={[
            { name: "author", content: this.config.author },
            { name: "description", content: this.config.description },
            { name: "keywords", content: this.config.keywords },
            { name: "generator", content: "Custom Gatsby Meta" },
            { name: "application-name", content: "Gatsby webpage" },
          ]}
        />
      </div>
    );
  }
}

export default HeadMeta;