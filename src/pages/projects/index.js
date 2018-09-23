import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

import Grid from "../../components/grid/grid";
import GridItem from "../../components/grid/grid-item";
import ProjectCard from "../../components/card/project-card";
import HeadMeta from "../../components/head/head-meta";
import BaseLayout from "../../components/layouts/base";
import PageLayout from "../../components/layouts/page";

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
      <PageLayout location={this.props.location} icon_name={"fa-file-code"} title={"Projects"}>
        <HeadMeta
          title={"Projects | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of projects undertaken by " + this.props.data.site.siteMetadata.author}
          keywords={"projects, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="fa fa-file-code fa-1" aria-hidden={"true"}></i>&nbsp;&nbsp;Projects</div>
        <Grid>
        { this.props.data.projects != null &&
          this.props.data.projects.edges.map(({ node }) =>
            <GridItem key={"project"+node.frontmatter.title}>
              <ProjectCard
                card_type={"projects"}
                status={node.frontmatter.status}
                published_date={node.frontmatter.published_date}
                title={node.frontmatter.title}
                excerpt={node.frontmatter.brief}
                tags={node.frontmatter.tags}
                categories={node.frontmatter.categories}
                url={node.fields.slug}
                institution={node.frontmatter.institution}
                timeToRead={node.timeToRead}
                source_link={node.frontmatter.source_link}
              />
            </GridItem>
          )
        }
        </Grid>
      </PageLayout>
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
          type: {regex: "/project/"},
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
            publish
            institution
            brief
            status
            source_link
            github_link
            report_link
            slides_link
            banner_image
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
