import React from "react";
import Link from "gatsby-link";


class Admonition extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="admonition">
          <div className="admonition-title">{this.props.title}</div>
          <div className="admonition-content">{this.props.content}</div>
      </div>
    );
  }
}

export default Admonition;