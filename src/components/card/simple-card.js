import React from "react";
import Link from "gatsby-link";


class SimpleCard extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="card">
        {this.props.children}
      </div>
    );
  }
}

export default SimpleCard;