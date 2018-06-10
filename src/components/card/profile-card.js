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
    return (
      <div className="profile-card">
        <img className="profile-card-image" src="/assets/home/sonapraneeth-full.png"/>
        <div className="profile-card-info">
          <div className="profile-card-content">
            {this.props.content}
          </div>
          <div className="profile-card-footer">
            <p>
              <strong>Follow me:</strong>
              { this.props.linkedin_username != null &&
                <a href={"https://www.linkedin.com/in/"+linkedin_username} target="_blank"><i className="icon fa fa-linkedin" style={{color: 'hsl(201, 100%, 35%)'}}></i></a>
              }
              { this.props.twitter_username != null &&
                <a href={"https://twitter.com/"+twitter_username} target="_blank"><i className="icon fa fa-twitter" style={{color: 'hsl(203, 89%, 53%)'}}></i></a>
              }
              { this.props.github_username != null &&
                <a href={"https://github.com/"+github_username} target="_blank"><i className="icon fa fa-github" style={{color: 'hsl(214, 50%, 50%)'}}></i></a>
              }
              <Link to="/feed.xml"><i className="icon fa fa-rss"></i></Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;