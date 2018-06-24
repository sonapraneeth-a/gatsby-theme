import React from "react"
import Link from "gatsby-link";

import SimpleCard from "../components/card/simple-card.js"
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";

class Index extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <div>
        <HeadMeta
          title={"404 Not found | " + this.props.data.site.siteMetadata.author}
          description={"This is the home page of " + this.props.data.site.siteMetadata.author}
          keywords={"home page, info, " + this.props.data.site.siteMetadata.author}
        />
        <SEO
          type="page"
          title={"404 Not found | " + this.props.data.site.siteMetadata.author}
          description={"This is the home page of " + this.props.data.site.siteMetadata.author}
          url={this.props.data.site.siteMetadata.siteUrl}
          site_name={"Homepage of " + this.props.data.site.siteMetadata.author}
          twitter_username={this.props.data.site.siteMetadata.social.twitter.username}
        />
        <div className="page-title"><i className="fa fa-exclamation fa-1" aria-hidden="true"></i>&nbsp;&nbsp;404 - Not found</div>
        <SimpleCard>
          You're headed into a wrong location. Please go back!!!
        </SimpleCard>
      </div>
    )
  }
}

export default Index;

export const query = graphql`
  query LostQuery
  {
    site: site
    {
      siteMetadata
      {
        author
        siteUrl
        social
        {
          twitter
          {
            username
          }
        }
      }
    }
  }`;