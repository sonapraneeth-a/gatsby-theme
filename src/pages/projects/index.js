import React from "react";
import Link from "gatsby-link";

import Grid from "../../components/grid";
import GridItem from "../../components/grid-item";
import InfoCard from "../../components/card/info-card";
import HeadMeta from "../../components/head-meta";

//export default ({ data }) => {
class ProjectIndex extends React.Component
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
          title={"Projects | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of projects undertaken by " + this.props.data.site.siteMetadata.author}
          keywords={"projects, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="far fa-file-code fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Projects</div>
        <Grid>
        { this.props.data.projects != null &&
          this.props.data.projects.edges.map(({ node }) =>
            <GridItem key={"project"+node.frontmatter.title}>
              <InfoCard
                card_type={"projects"}
                status={node.frontmatter.status}
                published_date={node.frontmatter.published_date}
                title={node.frontmatter.title}
                excerpt={node.frontmatter.brief}
                tags={node.frontmatter.tags}
                categories={node.frontmatter.categories}
                url={node.fields.slug}
                institution={node.frontmatter.institution}
              />
            </GridItem>
          )
        }
        </Grid>
      </div>
    );
  }
}

export default ProjectIndex;

export const query = graphql`
  query ProjectIndexQuery
  {
    projects: allMarkdownRemark
    (
      sort: {  fields: [fields___date], order: DESC}
      filter:
      {
        frontmatter:
        {
          type: {eq: "project"},
          publish: {eq: true}},
        }
    )
    {
      totalCount
      edges
      {
        node
        {
          frontmatter
          {
            title
            published_date
            tags
            categories
          }
          fields
          {
            slug
            date(formatString: "DD MMMM YYYY, h:mm:ss", locale: "en")
          }
          html
          excerpt
          timeToRead
        }
      }
    }
    site: site
    {
      siteMetadata
      {
        author
      }
    }
  }`;