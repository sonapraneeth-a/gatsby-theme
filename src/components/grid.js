import React from "react";
import Link from "gatsby-link";

class Grid extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="grid">
        {this.props.children}
      </div>
    );
  }
}

export default Grid;