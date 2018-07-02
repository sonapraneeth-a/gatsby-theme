import React from "react";
import { Link } from "gatsby";
import Markdown from "react-markdown";
import marked from "marked";

class Blockquote extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let blockquote_class = "blockquote" + " " + this.props.type;
    return (
      <div className={blockquote_class}>
          {/*<Markdown source={this.props.content} className="blockquote-content"/>*/}
          {/* Reference: https://stackoverflow.com/questions/31875748/how-do-i-render-markdown-from-a-react-component */}
          { (this.props.markdown == false || this.props.markdown == null) &&
            <div
              className="blockquote-content"
              dangerouslySetInnerHTML={{__html: marked(this.props.content || '')}}
            />
          }
          { (this.props.markdown == true || this.props.markdown != null) &&
            <div 
              className="blockquote-content-mk"
            >
              {this.props.children}
            </div>
          }
      </div>
    );
  }
}

export default Blockquote;