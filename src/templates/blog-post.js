import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";
import moment from "moment";
import moment_tz from "moment-timezone";
import rehypeReact from "rehype-react";
import slugify from "slug";
import { graphql } from "gatsby";
import config from "../../data/config";
import _ from "lodash";

import SimpleChip from "../components/chip/simple-chip";
import LinkChip from "../components/chip/link-chip";
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";
import Sharing from "../components/sharing";
import Row from "../components/grid/row";
import Col from "../components/grid/col";
import Admonition from "../components/admonition";
import Blockquote from "../components/blockquote";
import Text from "../components/text";
import BaseLayout from "../components/layouts/base-layout";
import Pager from "../components/pager";

import "katex/dist/katex.min.css";

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { 
    "admonition": Admonition,
    "quote": Blockquote,
    "text": Text
  },
}).Compiler

//export default ({ data }) => {
class BlogPost extends React.Component
{
  constructor(props)
  {
    super(props);
    const show_toc = this.props.data.blog_post.frontmatter.toc;
    this.state = {
      show_toc: show_toc,
    };
    //console.log("Const: " + this.state.show_toc);
  }

  toggle_toc()
  {
    //console.log("Calling toggle_toc");
    let current_show_toc = this.state.show_toc;
    this.setState({
      show_toc: !current_show_toc,
    });
  }

  render()
  {
    slugify.charmap['+'] = 'p';
    const post = this.props.data.blog_post;
    const post_helper = this.props.data.post_time;
    const tags = post.frontmatter.tags;
    const categories = post.frontmatter.categories;
    const timeToRead = post.timeToRead;
    const next_post = this.props.pageContext.next_post;
    const prev_post = this.props.pageContext.prev_post;
    console.log("Prev Post: " + prev_post[0]);
    console.log("Next Post: " + next_post[0]);
    const base_url = this.props.data.site.siteMetadata.siteUrl;
    const twitter_username = this.props.data.site.siteMetadata.social.twitter.username;
    const show_toc = this.state.show_toc;
    //console.log("Render: " + show_toc);
    let modifiedTime = "";
    _.each(post_helper.edges, edge => {
      modifiedTime = edge.node.modifiedTime;
      //console.log("MT: " + edge.node.modifiedTime);
    });
    //console.log("RP: " + this.props.pageContext.relativePath);
    return (
      <BaseLayout location={this.props.location}>
        <article>
          <HeadMeta
            title={"Blog | " + post.frontmatter.title + " | " + this.props.data.site.siteMetadata.author}
            description={"This is the blog post titled " + post.frontmatter.title + " written by " + this.props.data.site.siteMetadata.author}
            keywords={"blog post, " + this.props.data.site.siteMetadata.author}
          />
          <SEO
            type="article"
            author={this.props.data.site.siteMetadata.author}
            tags={post.frontmatter.tags}
            published_date={moment.tz(post.frontmatter.published_date, config.site.timezone).format("DD MMMM YYYY, HH:mm:ss z", "en")}
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
              icon={"calendar-alt"}
              title={"Published"}
              content={moment.tz(post.frontmatter.published_date, config.site.timezone).format("DD MMMM YYYY, HH:mm z", "en")}
            />
            <SimpleChip
              icon={"calendar-alt"}
              title={"Modified"}
              content={moment.tz(modifiedTime, config.site.timezone).format("DD MMMM YYYY, HH:mm z", "en")}
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
            {
              <SimpleChip
                icon={"stopwatch"}
                content={timeToRead + " min"}
              />
            }
            <hr />
          </header>
          <section>
          { show_toc === true &&
            <div id="show-hide-toc" onClick={() => this.toggle_toc()} className="show-hide-toc">Hide TOC</div>
          }
          { show_toc === false &&
          <div id="show-hide-toc" onClick={() => this.toggle_toc()} className="show-hide-toc">Show TOC</div>
          }
          { show_toc === true &&
            <Row>
              <Col dp={3} className="blog-toc-sticky" style={{paddingLeft: "0"}}>
                <div className="blog-toc">
                  { (post.frontmatter.toc_label != "" || post.frontmatter.toc_label != null) &&
                    <h4 className="blog-toc-title">
                      {
                        (post.frontmatter.toc_icon !== "" || post.frontmatter.toc_icon !== null) &&
                        <i className={`fa fa-${post.frontmatter.toc_icon}`} aria-hidden={"true"}></i>
                      }
                      {
                        (post.frontmatter.toc_icon === "" || post.frontmatter.toc_icon === null) &&
                        <i className={`fa fa-table`} aria-hidden={"true"}></i>
                      }
                      &nbsp;&nbsp;{post.frontmatter.toc_label}
                    </h4>
                  }
                  { (post.frontmatter.toc_label == "" || post.frontmatter.toc_label == null) &&
                    <h4 className="blog-toc-title">
                      {
                        (post.frontmatter.toc_icon !== "" || post.frontmatter.toc_icon !== null) &&
                        <i className={`fa fa-${post.frontmatter.toc_icon}`} aria-hidden={"true"}></i>
                      }
                      {
                        (post.frontmatter.toc_icon === "" || post.frontmatter.toc_icon === null) &&
                        <i className={`fa fa-table`} aria-hidden={"true"}></i>
                      }
                      &nbsp;&nbsp;Table of contents
                    </h4>
                  }
                  <div className="blog-toc-contents"
                    dangerouslySetInnerHTML={{ __html: post.tableOfContents }}
                  />
                </div>
              </Col>
              <Col dp={9}>
                <div className="blog-body">{renderAst(post.htmlAst)}</div>
                <Pager
                  prev_post_title={prev_post[0]}
                  prev_post_url={prev_post[1]}
                  next_post_title={next_post[0]}
                  next_post_url={next_post[1]}
                />
              </Col>
            </Row>
          }
          { (show_toc === false || show_toc == null) &&
            <Row>
              <Col dp={12} style={{paddingLeft: "0"}}>
                <div className="blog-body">{renderAst(post.htmlAst)}</div>
                <Pager
                  prev_post_title={prev_post[0]}
                  prev_post_url={prev_post[1]}
                  next_post_title={next_post[0]}
                  next_post_url={next_post[1]}
                />
              </Col>
            </Row>
          }
          </section>
          <Sharing
            url={base_url+post.fields.slug}
            title={post.frontmatter.title}
            twitter_username={twitter_username}
          />
        </article>
      </BaseLayout>
    )
  }
}

export default BlogPost;

export const query = graphql`
  query BlogPostQuery($slug: String!, $relativePath: String!)
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
        toc
        toc_icon
        toc_label
      }
      timeToRead
      tableOfContents
    }
    post_time: allFile
    (
      filter: 
      {
        relativePath: { eq: $relativePath}
      }
    )
    {
      edges
      {
        node
        {
          modifiedTime
        }
      }
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
