import React from "react";
import Link from "gatsby-link";
import SimpleCard from "./simple-card";

class BlogCard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      reveal: false,
    }
  }

  revealBlogCard()
  {
    let current_reveal_state = this.state.reveal;
    this.setState({
      reveal: !current_reveal_state,
    })
  }

  render()
  {
    let reveal_style = {display: 'none', transform: 'translateY(0%)', transitionProperty: 'transform', transition: 'transform 5s ease-in-out'}
    console.log(this.state.reveal)
    if(this.state.reveal === true)
    {
      reveal_style = {display: 'block', transform: 'translateY(-100%)'}
    }
    return (
      <SimpleCard>
        <div className="blog-card-content">
          <Link to={this.props.url} style={{textDecoration: 'none'}}>
            <h2 className="blog-title">{this.props.title}</h2>
          </Link>
          <span className="chip"><i className="fa fa-calendar-alt" aria-hidden="true"></i>&nbsp;<b>Published:</b> {this.props.published_date}</span>
          <span className="chip"><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp;~{this.props.timeToRead} min read</span>
          <span style={{float: 'right', cursor: 'pointer', marginRight: '0.5rem'}} onClick={this.revealBlogCard.bind(this)}><i className="zmdi zmdi-more-vert zmdi-hc-2x"></i></span>
          <div>
            <p dangerouslySetInnerHTML={{ 
              __html: this.props.excerpt}} />
          </div>
        </div>
        <div className="blog-card-reveal" style={reveal_style}>
          <span style={{float: 'right', cursor: 'pointer'}} onClick={this.revealBlogCard.bind(this)}><i className="zmdi zmdi-close zmdi-hc-2x"></i></span>
          <table>
            <tr>
              <td style={{textAlign: 'right', paddingRight: '1rem'}}><b>Tags</b></td>
              <td>
              <span>
              {
                this.props.tags.map(function(tag_name, index) {
                  return (
                    <span className="chip" key={tag_name+index}><i className="fa fa-tag" aria-hidden="true"></i>&nbsp;{tag_name}</span>
                  )
                })
              }
              </span>
              </td>
            </tr>
            <tr>
              <td style={{textAlign: 'right', paddingRight: '1rem'}}><b>Categories</b></td>
              <td>
              <span>
              {
                this.props.categories.map(function(category_name, index) {
                  return (
                    <span className="chip" key={category_name+index}><i className="zmdi zmdi-folder"></i>&nbsp;{category_name}</span>
                  )
                })
              }
              </span>
              </td>
            </tr>
          </table>
        </div>
      </SimpleCard>
    );
  }
}

export default BlogCard;