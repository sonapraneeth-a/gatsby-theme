import React from "react";
import Link from "gatsby-link";

import SimpleChip from "../chip/simple-chip";
import LinkChip from "../chip/link-chip";

const slugify = require('slug');

class InfoCard extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      reveal: false,
    }
  }

  revealInfoCard()
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
      <div className="card">
        {
          this.props.status != null &&
          <div className={ribbon_class}>
            <span>
              {this.props.status}
            </span>
          </div>
        }
        {
          this.props.banner_image == null &&
          <div className="card-image">
            <img src="https://placeimg.com/320/240/nature" alt="Project banner image"></img>
          </div>
        }
        <div className="card-content">
          <h2 className="card-title">{this.props.title}</h2>
          {
            this.props.published_date != null &&
              <SimpleChip
                icon={"calendar"}
                content={this.props.published_date}
              />
          }
          {
            this.props.institution != null &&
            <SimpleChip
              icon={"university"}
              content={this.props.institution}
            />
          }
          <span style={{float: 'right', cursor: 'pointer', marginRight: '0.5rem'}} onClick={this.revealInfoCard.bind(this)}><i className="zmdi zmdi-more-vert zmdi-hc-2x"></i></span>
          <div className="card-details">
            <p dangerouslySetInnerHTML={{ 
              __html: this.props.excerpt}} />
          </div>
        </div>
        <div className="card-reveal" style={reveal_style}>
          <span style={{float: 'right', cursor: 'pointer'}} onClick={this.revealInfoCard.bind(this)}><i className="zmdi zmdi-close zmdi-hc-2x"></i></span>
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
        {
          this.props.url != null &&
          <div className="card-footer">
            <center>
              <Link to={this.props.url} style={{textDecoration: 'none'}}>
                Details
              </Link>
            </center>
          </div>
        }
      </div>
    );
  }
}

export default InfoCard;
