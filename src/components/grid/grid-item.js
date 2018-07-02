import React from "react";
import { Link } from "gatsby";

class GridItem extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div className="grid-item" key={this.props.id}>
        {this.props.children}
      </div>
    );
  }
}

export default GridItem;