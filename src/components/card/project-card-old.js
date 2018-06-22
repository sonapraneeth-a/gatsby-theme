import React from "react";
import Link from "gatsby-link";
import SimpleCard from "./simple-card";

const slugify = require('slug');

class ProjectCardOld extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      reveal: false,
    }
  }

  revealProjectCard()
  {
    let current_reveal_state = this.state.reveal;
    this.setState({
      reveal: !current_reveal_state,
    })
  }

  render()
  {
    let reveal_style = {display: 'none', transform: 'translateY(0%)', transitionProperty: 'transform', transition: 'transform 5s ease-in-out'}
    //console.log(this.state.reveal);
    if(this.state.reveal === true)
    {
      reveal_style = {display: 'block', transform: 'translateY(-100%)'}
    }
    slugify.charmap['+'] = 'p';
    return (
      <SimpleCard>
        <div className="vertical-ribbon status-complete">
          <span>
            Completed
          </span>
        </div>
        <div className="blog-card-content">
          <Link to={this.props.slug} style={{textDecoration: 'none'}}>
            <h2 className="blog-title">{this.props.title}</h2>
          </Link>
          <span className="chip"><i className="fa fa-calendar-alt" aria-hidden="true"></i>&nbsp;<b>Published:</b> {this.props.published_date}</span>
          {this.props.institution != null &&
          <span className="chip"><i className="fa fa-university" aria-hidden="true"></i>&nbsp;{this.props.institution}</span>}
          <span style={{float: 'right', cursor: 'pointer', marginRight: '0.5rem'}} onClick={this.revealProjectCard.bind(this)}><i className="zmdi zmdi-more-vert zmdi-hc-2x"></i></span>
          <div>
            <p dangerouslySetInnerHTML={{ 
              __html: this.props.excerpt}} />
          </div>
        </div>
        <div className="blog-card-reveal" style={reveal_style}>
          <span style={{float: 'right', cursor: 'pointer'}} onClick={this.revealProjectCard.bind(this)}><i className="fa fa-times"></i></span>
          <table>
            <tbody>
              <tr>
                <td style={{textAlign: 'right', paddingRight: '1rem'}}><b>Tags</b></td>
                <td>
                <span>
                {
                  this.props.tags.map(function(tag_name, index) {
                    let tag = tag_name.toLowerCase();
                    return (
                      <span className="chip" key={tag_name+index}>
                        <i className="fa fa-tag" aria-hidden="true"></i>
                        &nbsp;<Link to={"/projects/tags/#"+slugify(tag)} style={{textDecoration: 'none'}}>{tag_name}</Link>
                      </span>
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
                    let category = category_name.toLowerCase();
                    return (
                      <span className="chip" key={category_name+index}>
                        <i className="zmdi zmdi-folder"></i>
                        &nbsp;<Link to={"/projects/categories/#"+slugify(category)} style={{textDecoration: 'none'}}>{category_name}</Link>
                      </span>
                    )
                  })
                }
                </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SimpleCard>
    );
  }
}

export default ProjectCardOld;

{/*<Link to={this.props.slug} style={{textDecoration: 'none'}}>
          <h2>{this.props.title}</h2>
        </Link>
        <div>
          <span className="chip"><i className="fa fa-calendar-alt" aria-hidden="true"></i>&nbsp;<b>Published:</b> {this.props.published_date}</span>
          {this.props.institution != null &&
          <span className="chip"><i className="fa fa-university" aria-hidden="true"></i>&nbsp;{this.props.institution}</span>
          }
        </div>
        <div>
          <p dangerouslySetInnerHTML={{ 
            __html: this.props.brief}} />
          </div>*/}