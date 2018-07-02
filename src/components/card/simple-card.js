import React from "react";
import { Link } from "gatsby";


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
        <div className="card-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SimpleCard;