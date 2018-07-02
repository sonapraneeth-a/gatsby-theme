import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { graphql } from "gatsby";

// Components
import SimpleCard from "../../components/card/simple-card";
import LinkChip from "../../components/chip/link-chip";
import HeadMeta from "../../components/head/head-meta";

// Imports
const _ = require('lodash')
const slugify = require('slug')

/**
 * 
 */
class BlogCategoryPage extends React.Component
{
  /**
   * Constructor for BlogTagPage
   * @param {*} props 
   */
  constructor(props)
  {
    super(props);
    this.blog_category_info = 
    {
      blog_categories: [],        // Gets the list of unique categories in all blog posts
      blogs: [],                  // Store the information about each blog post (title, categories, slug, date)
      category_info: new Array(), // Store the information about each category (List of indices of blog posts containing the category in the order in which the blogs are ordered)
    }
  }
  
  /**
   * Generates the information necessary for each category
   */
  generateBlogCategoryInfo()
  {
    this.blog_category_info.blog_categories = [];
    this.blog_category_info.blogs = [];
    this.blog_category_info.category_info = [];
    if(this.props.data.categories != null)
    {
      // Iterate through each post, putting all found categories into `categories`
      _.each(this.props.data.categories.edges, edge => {
        //if (_.get(edge, "node.frontmatter.categories")) {
        let categories = [];
        // Get the categories for the blog post. Convert the first letter of the category name to capitals for 
        // proper sorting
        edge.node.frontmatter.categories.map( function(category, index)
        {
          //let category_name = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
          //categories = categories.concat(category_name);
          categories = categories.concat(category);
        });
        // Concatenate the categories for this blog posts to the list of the categories collected till now
        this.blog_category_info.blog_categories = this.blog_category_info.blog_categories.concat(categories);
        // Collect the blog information for each blog post in order
        this.blog_category_info.blogs.push([edge.node.frontmatter.title, categories,
                                            edge.node.fields.slug, edge.node.fields.date]);
        //}
      });
      // Eliminate duplicate categories
      this.blog_category_info.blog_categories = _.sortBy(_.uniq(this.blog_category_info.blog_categories));
      // Slugify characters
      slugify.charmap['+'] = 'p';
      // Generate the list of blogs for each category
      for(var index_i = 0; index_i < this.blog_category_info.blog_categories.length; index_i++)
      {
        this.blog_category_info.category_info.push(new Array());
        for(var index_j = 0; index_j < this.blog_category_info.blogs.length; index_j++)
        {
          // If the blog has this particular category, then append the blog index to category_info array
          if(this.blog_category_info.blogs[index_j][1].indexOf(this.blog_category_info.blog_categories[index_i]) > -1)
          {
            this.blog_category_info.category_info[index_i].push(index_j);
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
    // Generate the information for all the categories 
    this.generateBlogCategoryInfo();
    let blog_categories = this.blog_category_info.blog_categories;
    let category_info = this.blog_category_info.category_info;
    let blogs = this.blog_category_info.blogs;
    return (
      <div>
        <HeadMeta
          title={"Blogs - Categories | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of all the categories for the blogs undertaken by " + this.props.data.site.siteMetadata.author}
          keywords={"blogs, categories, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="fa fa-folder-open fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Blog - Categories</div>
        <div style={{display: 'inline-flex', flexWrap: 'wrap'}}>
        {/* Generates the list of categories and their counts in all the blog posts */}
        {
          blog_categories.map( function(name, index_i)
          {
            let category_slug = slugify(blog_categories[index_i].toLowerCase());
            return (
              <Link to={"/blog/categories/#"+category_slug} key={"/blog/categories/#"+category_slug} style={{textDecoration: 'none'}} className="chip" >
                <span key={name+index_i} className="chip-content">
                  <i className="fa fa-folder-open" aria-hidden="true"></i>&nbsp;{blog_categories[index_i]}
                </span>
                <span className="chip-count">
                  {category_info[index_i].length}
                </span>
              </Link>
            );
          })
        }
        </div>
        <div>
        {
          blog_categories.map( function(name, index_i)
          {
            let category_slug = slugify(blog_categories[index_i].toLowerCase());
            return (
              <ul key={"blog_category_list"+index_i} style={{listStyleType: 'none', paddingLeft: '0'}}>
                <li key={blog_categories[index_i]} style={{marginBottom: '0.5rem'}}>
                  {
                    <Link to={"/blog/categories/#"+category_slug} style={{textDecoration: 'none'}}>
                      <h2>{name}</h2>
                    </Link>
                  }
                  <ul style={{listStyleType: 'none', paddingLeft: '1rem'}}>
                  {
                    category_info[index_i].map( function(category_name, index_j)
                    {
                      return (
                      <li key={category_name} style={{marginBottom: '0.5rem'}}>
                        <SimpleCard>
                          <div className="card-content">
                            <Link to={blogs[category_name][2]} style={{textDecoration: 'none'}}>
                              <span>{blogs[category_name][0]}</span>
                            </Link><span style={{float: 'right'}}>{blogs[category_name][3]}</span>
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

export default BlogCategoryPage;

export const query = graphql`
  query BlogCategoriesQuery
  {
    categories: allMarkdownRemark
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
            categories
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