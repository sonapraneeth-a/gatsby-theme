import React from "react"
import { Link } from "gatsby";
import { graphql } from "gatsby";

import SimpleCard from "../components/card/simple-card.js"
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";
import PageLayout from "../components/layouts/page.js";
import BaseLayout from "../components/layouts/base.js";

class NotFound extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <BaseLayout location={this.props.location}>
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
        <SimpleCard>
          You have landed in a wrong location. Please <a href={this.props.history}>go back</a> (or) head to <a href={this.props.data.site.siteMetadata.siteUrl}>home</a>!!!
        </SimpleCard>
      </BaseLayout>
    )
  }
}

export default NotFound;

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
