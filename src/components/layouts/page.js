import React from "react";
import { Link } from "gatsby";


class Page extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let font_name = "fa fa-1 " + this.props.icon_name;
    return (
      <div className="page">
        <div className="page-title"><i className={font_name} aria-hidden={"true"}></i>&nbsp;&nbsp;{this.props.title}</div>
        <div className="page-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Page;