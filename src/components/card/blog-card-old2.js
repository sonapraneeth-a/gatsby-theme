import React from "react";
import Link from "gatsby-link";
import slugify from "slug";

import SimpleChip from "../chip/simple-chip";
import LinkChip from "../chip/link-chip";
import Row from "../grid/row";
import Col from "../grid/col";

class BlogCardOld2 extends React.Component
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
    if(this.state.reveal === true)
    {
      reveal_style = {display: 'block', transform: 'translateY(-100%)'}
    }
    slugify.charmap['+'] = 'p';
    let ribbon_class = "ribbon";
    if(this.props.status != null) { ribbon_class += (" status-" + this.props.status.toLowerCase()); }
    let tags = this.props.tags;
    let categories = this.props.categories;
    let card_type = this.props.card_type;
    return (
      <div className="blog-card">
        { this.props.banner_image == null &&
          <img className="blog-card-image" src="https://placeimg.com/320/240/nature" alt={"Banner image of blog: "+this.props.title}/>
        }
        { this.props.banner_image != null &&
          <img className="blog-card-image" src={this.props.banner_image} alt={"Banner image of blog: "+this.props.title}/>
        }
        <div className="blog-card-info">
          <div className="blog-card-content">
            <Row>
              <Col
                dp={11}
              >
                <h2 className="blog-card-title">{this.props.title}</h2>
              </Col>
              <Col
                dp={1}
              >
                <span className="blog-card-reveal-icon" onClick={this.revealBlogCard.bind(this)}>
                  <i className="zmdi zmdi-more-vert zmdi-hc-2x"></i>
                </span>
              </Col>
            </Row>
            { this.props.published_date != null &&
                <SimpleChip
                  icon={"calendar-alt"}
                  content={this.props.published_date}
                />
            }
            <div className="blog-card-details">
              {this.props.excerpt}
            </div>
          </div>
          { this.props.url != null &&
            <div className="blog-card-footer">
              <Link to={this.props.url} style={{textDecoration: 'none'}}>
                Continue Reading ...
              </Link>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default BlogCard2;