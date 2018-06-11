import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import moment from "moment";
import moment_tz from "moment-timezone";

import SimpleChip from "../components/chip/simple-chip";
import LinkChip from "../components/chip/link-chip";
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";
import Sharing from "../components/sharing";
import Row from "../components/grid/row";
import Col from "../components/grid/col";

const slugify = require('slug');

//export default ({ data }) => {
class BlogPost extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    slugify.charmap['+'] = 'p';
    const post = this.props.data.blog_post;
    const tags = post.frontmatter.tags;
    const categories = post.frontmatter.categories;
    const next_post = this.props.pathContext.next_post;
    const prev_post = this.props.pathContext.prev_post;
    const base_url = this.props.data.site.siteMetadata.siteUrl;
    const twitter_username = this.props.data.site.siteMetadata.social.twitter.username;
    return (
      <article>
        <HeadMeta
          title={"Blog - " + post.frontmatter.title + " | " + this.props.data.site.siteMetadata.author}
          description={"This is the blog post titled " + post.frontmatter.title + " written by " + this.props.data.site.siteMetadata.author}
          keywords={"blog post, " + this.props.data.site.siteMetadata.author}
        />
        <SEO
          type="article"
          author={this.props.data.site.siteMetadata.author}
          tags={post.frontmatter.tags}
          published_date={moment.tz(post.frontmatter.published_date, 'Asia/Kolkata').format("DD MMMM YYYY, HH:mm:ss z", "en")}
          title={"Blog - " + post.frontmatter.title + " | " + this.props.data.site.siteMetadata.author}
          description={"This is the blog post titled " + post.frontmatter.title + " written by " + this.props.data.site.siteMetadata.author}
          url={this.props.data.site.siteMetadata.siteUrl}
          site_name={"Homepage of " + this.props.data.site.siteMetadata.author}
          twitter_username={this.props.data.site.siteMetadata.social.twitter.username}
        />
        <header>
          <h1 className="blog-title">
            {post.frontmatter.title}
          </h1>
          <SimpleChip
            icon={"calendar"}
            content={moment.tz(post.frontmatter.published_date, 'Asia/Kolkata').format("DD MMMM YYYY, HH:mm:ss z", "en")}
          />
          {
            tags.map(function(tag_name, index)
            {
              let tag = tag_name.toLowerCase();
              return (
                <LinkChip
                  url={"/blog/tags/#"+slugify(tag)}
                  key={"tag"+tag_name}
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
                  url={"/blog/categories/#"+slugify(category)}
                  key={"category"+category_name}
                  content={category_name}
                  icon={"folder-open"}
                />
              );
            })
          }
          <hr />
        </header>
        <section>
          <Row>
            <Col dp={4}>
              <div className="blog-toc">
                <h4 className="blog-toc-title">Table of Contents</h4>
                <div className="blog-toc-contents"
                  dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
                />
              </div>
            </Col>
            <Col dp={8}>
              <div
                className="blog-body"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </Col>
          </Row>
        </section>
        <Sharing
          url={base_url+post.fields.slug}
          title={post.frontmatter.title}
          twitter_username={twitter_username}
        />
        <div className="pager">
          {
            prev_post[0] == null &&
            <a className="post-page previous-post hidden">Previous</a>
          }
          { prev_post[0] != null &&
            <a className="post-page" href={prev_post[1]} style={{paddingLeft: '0'}}>
              <div style={{width: '12%', textAlign: 'center'}} class="previous-post">
                <i className="fa fa-arrow-left"></i>
              </div>
              <div style={{width: '88%'}}>
                <p style={{textAlign:'left', fontWeight: '700'}}>Previous</p>
                <p style={{textAlign:'left'}} className="previous-post-title">{prev_post[0]}</p>
              </div>
            </a>
          }
          {
            next_post[0] == null &&
            <a className="post-page next-post hidden">Next</a>
          }
          { next_post[0] != null &&
            <a className="post-page" href={next_post[1]} style={{paddingRight: '0'}}>
              <div style={{width: '88%'}}>
                <p style={{textAlign:'right', fontWeight: '700'}}>Next</p>
                <p style={{textAlign:'right'}} className="next-post-title">{next_post[0]}</p>
              </div>
              <div style={{width: '12%', textAlign: 'center'}} className="next-post">
                <i className="fa fa-arrow-right"></i>
              </div>
            </a>
          }
        </div>
      </article>
    )
  }
}

export default BlogPost;

export const query = graphql`
  query BlogPostQuery($slug: String!)
  {
    blog_post: markdownRemark
    (
      fields:
      {
        slug: { eq: $slug }
      }
      frontmatter:
      { type: { regex: "/blog-post/" } }
    )
    {
      html
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
      }
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
