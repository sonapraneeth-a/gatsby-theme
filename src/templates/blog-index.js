import React from 'react'
import { Link } from "gatsby";
import moment from "moment";
import moment_tz from "moment-timezone";
import { graphql } from "gatsby";
import config from "../../data/config";

import BlogCard from "../components/card/blog-card";
import Grid from "../components/grid/grid";
import GridItem from "../components/grid/grid-item";
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";
import BaseLayout from "../components/layouts/base";
import Pagination from "../components/pagination";
import PageLayout from "../components/layouts/page";

//export default ({ pageContext, data }) => {
class BlogIndex extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    const { edges } = this.props.data.allMarkdownRemark;
    let { prevPage, currentPage, nextPage, totalNumberOfPages} = this.props.pageContext;
    let { minNumberOfPages, blogs} = this.props.pageContext;
    let dispPrevPage = prevPage >= 1 ? prevPage : '';
    //prevPage = prevPage > 1 ? prevPage : '';
    //nextPage = nextPage <= totalNumberOfPages ? nextPage : '';
    console.log(blogs);

    return (
      <PageLayout location={this.props.location} icon_name={"fa-pencil-alt"} title={"Blog"}>
        <HeadMeta
          title={"Blog | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of blogs written by " + this.props.data.site.siteMetadata.author}
          keywords={"blogs, " + this.props.data.site.siteMetadata.author}
        />
        <div>
          { edges != null &&
          edges.map(({ node }) => {
            const { title, tags, categories, published_date } = node.frontmatter;
            const {slug, date} = node.fields;
            //const excerptLength = node.html.indexOf("<!--more-->") > -1 ? node.html.indexOf("<!--more-->"): this.props.pageContext.excerptLength;
            return (
              <BlogCard
                card_type={"blog"}
                key={"blog-card-"+slug}
                url={slug}
                title={title}
                tags={tags}
                categories={categories}
                timeToRead={node.timeToRead}
                published_date={moment.tz(published_date, config.site.timezone).format("DD MMMM YYYY, HH:mm:ss z", "en")}
                excerpt={node.excerpt}
                banner_image={node.frontmatter.banner_image}
              />
            );
          })
          }
        </div>
        <Pagination
          base_url={"/blog/"}
          prev_page={prevPage}
          next_page={nextPage}
          last_page={totalNumberOfPages}
          pages={blogs}
          current_page={currentPage}
        />
      </PageLayout>
    )
  }
}

export default BlogIndex;

export const query = graphql`
  query BlogPostPageQuery($limit: Int, $skip: Int)
  {
    allMarkdownRemark: allMarkdownRemark
    (
      sort: {  fields: [fields___date], order: DESC},
      filter:
      {
        frontmatter:
        {
          type: { regex: "/blog-post/" },
          publish: {eq: true}
        }
      },
      limit: $limit,
      skip: $skip
    )
    {
      edges
      {
        node
        {
          fields
          {
            slug
            date(formatString: "DD MMMM YYYY, h:mm:ss", locale: "en")
          }
          frontmatter
          {
            title
            tags
            categories
            published_date
            banner_image
          }
          timeToRead
          excerpt
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
  }
`;
