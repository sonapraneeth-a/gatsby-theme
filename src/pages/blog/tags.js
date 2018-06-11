import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import _ from 'lodash';
import slugify from 'slug';

// Components
import SimpleCard from "../../components/card/simple-card";
import HeadMeta from "../../components/head/head-meta";
import LinkChip from "../../components/chip/link-chip";

/**
 * 
 */
class BlogTagPage extends React.Component
{
  /**
   * Constructor for BlogTagPage
   * @param {*} props 
   */
  constructor(props)
  {
    super(props);
    this.blog_tag_info = 
    {
      blog_tags: [],         // Gets the list of unique tags in all blog posts
      blogs: [],             // Store the information about each blog post (title, tags, slug, date)
      tag_info: new Array(), // Store the information about each tag (List of indices of blog posts containing the tag in the order in which the blogs are ordered)
    }
  }
  
  /**
   * Generates the information necessary for each tag
   */
  generateBlogTagInfo()
  {
    this.blog_tag_info.blog_tags = [];
    this.blog_tag_info.blogs = [];
    this.blog_tag_info.tag_info = [];
    if(this.props.data.tags != null)
    {
      // Iterate through each post, putting all found tags into `tags`
      _.each(this.props.data.tags.edges, edge => {
        //if (_.get(edge, "node.frontmatter.tags")) {
        let tags = [];
        // Get the tags for the blog post. Convert the first letter of the tag name to capitals for 
        // proper sorting
        edge.node.frontmatter.tags.map( function(tag, index)
        {
          let tag_name = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
          tags = tags.concat(tag_name);
        });
        // Concatenate the tags for this blog posts to the list of the tags collected till now
        this.blog_tag_info.blog_tags = this.blog_tag_info.blog_tags.concat(tags);
        // Collect the blog information for each blog post in order
        this.blog_tag_info.blogs.push([edge.node.frontmatter.title, tags,
                                      edge.node.fields.slug, edge.node.fields.date]);
        //}
      });
      // Eliminate duplicate tags
      this.blog_tag_info.blog_tags = _.sortBy(_.uniq(this.blog_tag_info.blog_tags));
      // Slugify characters
      slugify.charmap['+'] = 'p';
      // Generate the list of blogs for each tag
      for(var index_i = 0; index_i < this.blog_tag_info.blog_tags.length; index_i++)
      {
        
        this.blog_tag_info.tag_info.push(new Array());
        for(var index_j = 0; index_j < this.blog_tag_info.blogs.length; index_j++)
        {
          // If the blog has this particular tag, then append the blog index to tag_info array
          if(this.blog_tag_info.blogs[index_j][1].indexOf(this.blog_tag_info.blog_tags[index_i]) > -1)
          {
            this.blog_tag_info.tag_info[index_i].push(index_j);
          }
        }
      }
    }
  }

  /**
   * Render the BlogTagPage
   */
  render()
  {
    // Generate the information for all the tags 
    this.generateBlogTagInfo();
    let blog_tags = this.blog_tag_info.blog_tags;
    let tag_info = this.blog_tag_info.tag_info;
    let blogs = this.blog_tag_info.blogs;
    return (
      <div>
        <HeadMeta
          title={"Blog - Tags | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of all the tags for the blogs written by " + this.props.data.site.siteMetadata.author}
          keywords={"blogs, tags, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="fa fa-tag fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Projects - Tags</div>
        <div style={{display: 'inline-flex', flexWrap: 'wrap'}}>
        {/* Generates the list of tags and their counts in all the blog posts */}
        {
          blog_tags.map( function(name, index_i)
          {
            let tag_slug = slugify(blog_tags[index_i].toLowerCase());
            return (
              <LinkChip
                url={"/blog/tags/#"+tag_slug}
                key={"tag"+name}
                content={blog_tags[index_i]}
                count={tag_info[index_i].length}
                icon={"folder-open"}
              />
            );
          })
        }
        </div>
        <div>
        {
          blog_tags.map( function(name, index_i)
          {
            let tag_slug = slugify(blog_tags[index_i].toLowerCase());
            return (
              <ul key={"blog_tag_list"+index_i} style={{listStyleType: 'none', paddingLeft: '0'}}>
                <li key={blog_tags[index_i]}>
                  {
                    <Link to={"/blog/tags/#"+tag_slug} style={{textDecoration: 'none'}}>
                      <h2>{name}</h2>
                    </Link>
                  }
                  <ul style={{listStyleType: 'none', paddingLeft: '1rem'}}>
                  {
                    tag_info[index_i].map( function(tag_name, index_j)
                    {
                      return (
                        <li key={tag_name} style={{marginBottom: '0.5rem'}}>
                          <SimpleCard>
                            <div className="card-content">
                              <Link to={blogs[tag_name][2]} style={{textDecoration: 'none'}}>
                                <span>{blogs[tag_name][0]}</span>
                              </Link><span style={{float: 'right'}}>{blogs[tag_name][3]}</span>
                            </div>
                          </SimpleCard>
                        </li>
                      );
                    })
                  }
                  </ul>
                </li>
              </ul>
            );
          })
        }
        </div>
      </div>
    )
  }
}

export default BlogTagPage;

export const query = graphql`
  query BlogTagsQuery
  {
    tags: allMarkdownRemark
    (
      sort: {  fields: [fields___date], order: DESC}
      filter:
      {
        frontmatter:
        {
          type: {regex: "/blog-post/"},
          publish: {eq: true}
        }
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
            tags
            publish
          }
          fields
          {
            slug
            date(formatString: "MMMM YYYY", locale: "en")
          }
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
  }`;