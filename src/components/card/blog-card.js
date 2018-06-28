import React from "react";
import Link from "gatsby-link";
import slugify from "slug";
import Markdown from "react-markdown";
import marked from "marked";

import SimpleChip from "../chip/simple-chip";
import LinkChip from "../chip/link-chip";
import Row from "../grid/row";
import Col from "../grid/col";

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
    /*//let footer_position = "absolute";
    //let info_width = "75%";
    let info_class = "blog-card-info";
    let footer_class = "blog-card-footer";
    if(this.props.banner_image == null || this.props.banner_image == "")
    {
      //footer_position = "relative";
      //info_width = "100%";
      info_class += "-no-image";
      footer_class += "-no-image";
    }*/
    let info_class = "blog-card-info";
    let footer_class = "blog-card-footer";
    return (
      <div className="blog-card">
        { (this.props.banner_image == null && this.props.banner_image == "") &&
          <img
            className="blog-card-image"
            src="/static/assets/blog/default_banner_image.jpg"
            alt={"Banner image of blog: "+this.props.title}
          />
        }
        { (this.props.banner_image != null && this.props.banner_image != "") &&
          <img
            className="blog-card-image"
            src={this.props.banner_image}
            alt={"Banner image of blog: "+this.props.title}
          />
        }
        <div className={info_class}>
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
            { this.props.institution != null &&
              <SimpleChip
                icon={"university"}
                content={this.props.institution}
              />
            }
            { this.props.timeToRead != null &&
              <SimpleChip
                icon={"stopwatch"}
                content={this.props.timeToRead + " min"}
              />
            }
            <div className="blog-card-details">
              <div dangerouslySetInnerHTML={{__html: marked(this.props.excerpt + ' ...' || '')}} />
            </div>
          </div>
          <div className="blog-card-reveal" style={reveal_style}>
            <Row>
              <Col dp={12}>
                <span style={{float: 'left', cursor: 'pointer'}} onClick={this.revealBlogCard.bind(this)}>
                  <i className="fa fa-times"></i>
                </span>
              </Col>
            </Row>
            {
              <table>
                <tbody>
                  { tags != null &&
                    <tr>
                      <td style={{textAlign: 'right', paddingRight: '1rem'}}><b>Tags</b></td>
                      <td>
                      {
                        tags.map(function(tag_name, index)
                        {
                          let tag = tag_name.toLowerCase();
                          return (
                            <LinkChip
                              url={"/"+card_type+"/tags/#"+slugify(tag)}
                              key={"tag"+tag_name}
                              content={tag_name}
                              icon={"tag"}
                            />
                          )
                        })
                      }
                      </td>
                    </tr>
                  }
                  { categories != null &&
                    <tr>
                      <td style={{textAlign: 'right', paddingRight: '1rem'}}><b>Categories</b></td>
                      <td>
                      {
                        categories.map(function(category_name, index) {
                          let category = category_name.toLowerCase();
                          return (
                            <LinkChip
                              url={"/"+card_type+"/categories/#"+slugify(category)}
                              key={"category"+category_name}
                              content={category_name}
                              icon={"folder-open"}
                            />
                          )
                        })
                      }
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            }
          </div>
          { this.props.url != null &&
            <div className={footer_class}>
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

export default BlogCard;