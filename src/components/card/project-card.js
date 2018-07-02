import React from "react";
import { Link } from "gatsby";
import slugify from "slug";

import SimpleChip from "../chip/simple-chip";
import LinkChip from "../chip/link-chip";
import Row from "../grid/row";
import Col from "../grid/col";
import DefaultProjectCardImage from "../../assets/projects/default_banner_image.jpg";

class ProjectCard extends React.Component
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
    let footer_number_count = 0;
    if(this.props.url != null && this.props.url != "") { footer_number_count += 1; }
    if(this.props.source_link != null && this.props.source_link != "") { footer_number_count += 1; }
    if(this.props.report_link != null && this.props.report_link != "") { footer_number_count += 1; }
    let footer_number = footer_number_count == 0 ? 12 : 12/footer_number_count;
    console.log(this.props.url);
    console.log(this.props.source_link);
    console.log(footer_number);
    return (
      <div className="card">
        { this.props.status != null &&
          <div className={ribbon_class}>
            <span>
              {this.props.status}
            </span>
          </div>
        }
        { this.props.banner_image == null &&
          <div className="card-image">
            <img 
              src="assets/projects/default_banner_image.jpg"
              alt={"Banner image of project: "+this.props.title}
            />
          </div>
        }
        { this.props.banner_image != null &&
          <div className="card-image">
            <img
              src={this.props.banner_image}
              alt={"Banner image of project: "+this.props.title}
            />
          </div>
        }
        <div className="card-content">
          <Row>
            <Col
              dp={11}
            >
              <h2 className="card-title">{this.props.title}</h2>
            </Col>
            <Col
              dp={1}
            >
              <span className="card-reveal-icon" onClick={this.revealProjectCard.bind(this)}>
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
          <div className="card-details">
            <p dangerouslySetInnerHTML={{ 
              __html: this.props.excerpt}} />
          </div>
        </div>
        <div className="card-reveal" style={reveal_style}>
          <Row>
            <Col dp={12}>
              <span style={{float: 'left', cursor: 'pointer'}} onClick={this.revealProjectCard.bind(this)}>
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
          <div className="card-footer">
            <Row>
              { (this.props.url != null && this.props.url != "") &&
                <Col
                  dp={footer_number}
                  className="align-center"
                >
                  <Link to={this.props.url} style={{textDecoration: 'none'}}>
                    <span>
                      <i className="fa fa-info-circle" aria-hidden="true"></i>&nbsp;Details
                    </span>
                  </Link>
                </Col>
              }
              { (this.props.source_link != null && this.props.source_link != "") &&
                <Col
                  dp={footer_number}
                  className="align-center"
                >
                  <a href={this.props.source_link} style={{textDecoration: 'none'}}>
                    <span>
                      <i className="fa fa-code" aria-hidden="true"></i>&nbsp;Source
                    </span>
                  </a>
                </Col>
              }
              { (this.props.report_link != null && this.props.report_link != "") &&
                <Col
                  dp={footer_number}
                  className="align-center"
                >
                  <a href={this.props.report_link} style={{textDecoration: 'none'}}>
                    <span>
                      <i className="fa fa-file-alt" aria-hidden="true"></i>&nbsp;Report
                    </span>
                  </a>
                </Col>
              }
            </Row>
          </div>
      </div>
    );
  }
}

export default ProjectCard;
