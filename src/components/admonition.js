import React from "react";
import { Link } from "gatsby";
import Markdown from "react-markdown";
import marked from "marked";

class Admonition extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let admonition_class = "admonition" + " " + this.props.type;
    return (
      <div className={admonition_class}>
          <div className="admonition-title">{this.props.title}</div>
          {/*<Markdown source={this.props.content} className="admonition-content"/>*/}
          {/* Reference: https://stackoverflow.com/questions/31875748/how-do-i-render-markdown-from-a-react-component */}
          { (this.props.markdown == false || this.props.markdown == null) &&
            <div
              className="admonition-content"
              dangerouslySetInnerHTML={{__html: marked(this.props.content || '')}}
            />
          }
          { (this.props.markdown == true || this.props.markdown != null) &&
            <div 
              className="admonition-content"
            >
              {this.props.children}
            </div>
          }
      </div>
    );
  }
}

export default Admonition;