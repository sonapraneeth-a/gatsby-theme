import React from "react";
import Link from "gatsby-link";
import { graphql } from "gatsby";

import ProfileCard from "../components/card/profile-card.js";
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";
import ProfileCardImage from "../assets/home/sonapraneeth-full.png";

class Index extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let github_username = this.props.data.site.siteMetadata.social.github.username;
    let linkedin_username = this.props.data.site.siteMetadata.social.linkedin.username;
    let twitter_username = this.props.data.site.siteMetadata.social.twitter.username;
    return (
      <div>
        <HeadMeta
          title={"Home page | " + this.props.data.site.siteMetadata.author}
          description={"This is the home page of " + this.props.data.site.siteMetadata.author}
          keywords={"home page, info, " + this.props.data.site.siteMetadata.author}
        />
        <SEO
          type="page"
          title={"Home page | " + this.props.data.site.siteMetadata.author}
          description={"This is the home page of " + this.props.data.site.siteMetadata.author}
          url={this.props.data.site.siteMetadata.siteUrl}
          site_name={"Homepage of " + this.props.data.site.siteMetadata.author}
          twitter_username={this.props.data.site.siteMetadata.social.twitter.username}
        />
        <div className="page-title"><i className="fa fa-home fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Home</div>
        <ProfileCard
          github_username={github_username}
          linkedin_username={linkedin_username}
          twitter_username={twitter_username}
          image="assets/home/sonapraneeth-full.png"
          content={<div><p>I'm currently working as a Software Developer in Cloud Database 
          Development Team in <a href="https://www.oracle.com/in/index.html" target="_blank" rel="noopener">Oracle India Private Limited</a>.</p>
          <p>I have completed my masters in <a href="https://www.cse.iitb.ac.in/" target="_blank" rel="noopener">Computer Science and Engineering</a> from <a href="http://iitb.ac.in/" target="_blank" rel="noopener">IIT Bombay</a> in July 2017. Prior to that, I have completed my bachelors in 
          <a href="http://iitj.ac.in/department/index.php?id=cse" target="_blank" rel="noopener"> Computer Science and Engineering</a> from <a href="http://iitj.ac.in/" target="_blank" rel="noopener">IIT Jodhpur</a> in April 2015.</p>
          <p>I like to work in areas involving Computer Vision, Image Processing and Machine Learning. You can have a look at my projects <Link to="/projects/">here</Link>.</p></div>}
        />
      </div>
    )
  }
}

export default Index;

export const query = graphql`
  query IndexQuery
  {
    site: site
    {
      siteMetadata
      {
        author
        siteUrl
        social
        {
          github
          {
            username
          }
          linkedin
          {
            username
          }
          twitter
          {
            username
          }
        }
      }
    }
  }`;