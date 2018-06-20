import React from "react";
import Link from "gatsby-link";

class Col extends React.Component
{
  constructor(props)
  {
    super(props);
    this.config = {
      dp: 12,
      class_name: "",
    }
  }

  getClassNames()
  {
    let class_name = "";
    if(this.props.dp != null)
    {
      this.config.dp = this.props.dp;
    }
    class_name += ("col-dp-"+this.config.dp);
    this.config.class_name = class_name;
  }

  render()
  {
    this.getClassNames();
    let extra_class_name = this.props.className;
    if(extra_class_name === undefined) { extra_class_name = ""; }
    console.log("Class: " + extra_class_name);
    return (
      <div className={this.config.class_name + " " + extra_class_name}>
        {this.props.children}
      </div>
    );
  }
}

export default Col;