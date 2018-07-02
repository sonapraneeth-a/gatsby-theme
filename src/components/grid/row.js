import React from "react";
import { Link } from "gatsby";

class Row extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}

export default Row;