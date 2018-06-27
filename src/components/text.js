import React from "react";
import Link from "gatsby-link";
import Markdown from "react-markdown";
import marked from "marked";

class Text extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let text_class = this.props.type;
    {/*return (
      <div style={{display: "inline-block"}}>
        { (this.props.markdown == false || this.props.markdown == null) &&
          <span
            className={text_class}
            dangerouslySetInnerHTML={{__html: marked(this.props.content || '')}}
          />
        }
        { (this.props.markdown == true || this.props.markdown != null) &&
          <span className={text_class}>{this.props.children}</span>
        }
      </div>
    );*/}
    if(this.props.markdown == true || this.props.markdown != null)
    {
      return (
        <span className={text_class}>{this.props.children}</span>
      );
    }
    else
    {
      return (
        <span
          className={text_class}
          dangerouslySetInnerHTML={{__html: marked(this.props.content || '')}}
        />
      );
    }
  }
}

export default Text;