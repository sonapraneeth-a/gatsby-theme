import React from "react";
import Link from "gatsby-link";

class Sharing extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let url = this.props.url;
    let title = this.props.title;
    return (
      <div className="share-content">
        <a className="share facebook" href={"https://www.facebook.com/sharer/sharer.php?u="+url} target="_blank" title="Share on Facebook"><i className="fab fa-facebook-f"></i></a>
        <a className="share gplus" href={"https://plus.google.com/share?url="+url} target="_blank" title="Share on Google+"><i className="fab fa-google-plus-g"></i></a>
        <a className="share twitter" href={"https://twitter.com/intent/tweet?original_referer="+url+"&amp;text="+title+"&amp;via=sonapraneeth_a"} target="_blank" title="Share on Twitter"><i className="fab fa-twitter"></i></a>
        <a className="share linkedin" href={"https://www.linkedin.com/shareArticle?mini=true&amp;url="+url+"&amp;title="+title+"&amp;summary=&amp;source="+url} target="_blank" title="Share on LinkedIn"><i className="fab fa-linkedin-in"></i></a>
        <a className="share email" href={"mailto:?subject="+title+"&amp;body="} target="_blank" title="Send an email" data-proofer-ignore=""><i className="fa fa-envelope"></i></a>
        <a className="share print" href="javascript:window.print()" target="_blank" title="Print the article"><i className="fa fa-print"></i></a>
      </div>
    );
  }
}

export default Sharing;