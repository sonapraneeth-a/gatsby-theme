import React from "react";
import Link from "gatsby-link";


class ProfileCard extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let github_username = this.props.github_username;
    let linkedin_username = this.props.linkedin_username;
    let twitter_username = this.props.twitter_username;
    let footer_position = "absolute";
    let info_width = "75%";
    if(this.props.image == null || this.props.image == "")
    {
      footer_position = "relative";
      info_width = "100%";
    }
    return (
      <div className="profile-card">
        { this.props.image != null &&
          <img className="profile-card-image" src={this.props.image}/>
        }
        <div className="profile-card-info" style={{width: info_width}}>
          <div className="profile-card-content">
            {this.props.content}
          </div>
          <div className="profile-card-footer" style={{position: footer_position}}>
            <p style={{margin: 0}}>
              <strong>Follow me:</strong>
              { this.props.linkedin_username != null &&
                <a href={"https://www.linkedin.com/in/"+linkedin_username} target="_blank"><i className="fab fa-linkedin-in" style={{color: 'hsl(201, 100%, 35%)', padding: '0.2rem 0.5rem'}}></i></a>
              }
              { this.props.twitter_username != null &&
                <a href={"https://twitter.com/"+twitter_username} target="_blank"><i className="fab fa-twitter" style={{color: 'hsl(203, 89%, 53%)', padding: '0.2rem 0.5rem'}}></i></a>
              }
              { this.props.github_username != null &&
                <a href={"https://github.com/"+github_username} target="_blank"><i className="fab fa-github" style={{color: 'hsl(214, 50%, 50%)', padding: '0.2rem 0.5rem'}}></i></a>
              }
              <Link to="/feed.xml"><i className="fa fa-rss" style={{color: 'hsl(19, 89%, 54%)', padding: '0.2rem 0.5rem'}}></i></Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;