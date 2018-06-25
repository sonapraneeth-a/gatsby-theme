import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import moment from "moment";
import moment_tz from "moment-timezone";
import rehypeReact from "rehype-react";
import slugify from "slug";

import SimpleChip from "../components/chip/simple-chip";
import LinkChip from "../components/chip/link-chip";
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";
import Row from "../components/grid/row";
import Col from "../components/grid/col";
import Admonition from "../components/admonition";

import "katex/dist/katex.min.css";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "admonition": Admonition },
}).Compiler

//export default ({ data }) => {
class ProjectPost extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    slugify.charmap['+'] = 'p';
    const post = this.props.data.project_post;
    const tags = post.frontmatter.tags;
    const categories = post.frontmatter.categories;
    return (
      <article>
        <HeadMeta
          title={"Project - " + post.frontmatter.title + " | " + this.props.data.site.siteMetadata.author}
          description={"This is the project post titled " + post.frontmatter.title + " written by " + this.props.data.site.siteMetadata.author}
          keywords={"project post, " + this.props.data.site.siteMetadata.author}
        />
        <SEO
          type="article"
          author={this.props.data.site.siteMetadata.author}
          tags={post.frontmatter.tags}
          published_date={post.frontmatter.published_date}
          title={"Project - " + post.frontmatter.title + " | " + this.props.data.site.siteMetadata.author}
          description={"This is the project post titled " + post.frontmatter.title + " written by " + this.props.data.site.siteMetadata.author}
          url={this.props.data.site.siteMetadata.siteUrl}
          site_name={"Homepage of " + this.props.data.site.siteMetadata.author}
          twitter_username={this.props.data.site.siteMetadata.social.twitter.username}
        />
        <header>
          <h1 className="blog-title">
            {post.frontmatter.title}
          </h1>
          <SimpleChip
            icon={"calendar-alt"}
            content={post.frontmatter.published_date}
          />
          {
            tags.map(function(tag_name, index)
            {
              let tag = tag_name.toLowerCase();
              return (
                <LinkChip
                  url={"/projects/tags/#"+slugify(tag)}
                  key={"tag"+tag_name}
                  //content={tag_name.charAt(0).toUpperCase() + tag_name.slice(1).toLowerCase()}
                  content={tag_name}
                  icon={"tag"}
                />
              );
            })
          }
          {
            categories.map(function(category_name, index)
            {
              let category = category_name.toLowerCase();
              return (
                <LinkChip
                  url={"/projects/categories/#"+slugify(category)}
                  key={"category"+category_name}
                  //content={category_name.charAt(0).toUpperCase() + category_name.slice(1).toLowerCase()}
                  content={category_name}
                  icon={"folder-open"}
                />
              );
            })
          }
          <SimpleChip
            icon={"stopwatch"}
            content={post.timeToRead + " min"}
          />
          <hr />
        </header>
        <section>
        { post.frontmatter.toc == true &&
          <Row>
            <Col dp={3} className="blog-toc-sticky">
              <div className="blog-toc">
                { (post.frontmatter.toc_label != "" || post.frontmatter.toc_label != null) &&
                  <h4 className="blog-toc-title">{post.frontmatter.toc_label}</h4>
                }
                { (post.frontmatter.toc_label != "" || post.frontmatter.toc_label != null) &&
                  <h4 className="blog-toc-title">Table of contents</h4>
                }
                <div className="blog-toc-contents"
                  dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
                />
              </div>
            </Col>
            <Col dp={9}>
              <div className="blog-body">{renderAst(post.htmlAst)}</div>
            </Col>
          </Row>
        }
        { (post.frontmatter.toc == false || post.frontmatter.toc == null) &&
          <Row>
            <Col dp={12}>
              <div className="blog-body">{renderAst(post.htmlAst)}</div>
            </Col>
          </Row>
        }
        </section>
      </article>
    )
  }
}

export default ProjectPost;

export const query = graphql`
  query ProjectPostQuery($slug: String!)
  {
    project_post: markdownRemark
    (
      fields: { slug: { eq: $slug } }
      frontmatter: { type: { regex: "/project/" } }
    )
    {
      htmlAst
      fields
      {
        slug
      }
      frontmatter 
      {
        published_date
        title
        tags
        categories
        brief
        publish
        status
        toc
        toc_label
      }
      timeToRead
      tableOfContents
    }
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
  }
`;
