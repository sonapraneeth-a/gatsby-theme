import React from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import Link from "gatsby-link";

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
class BlogArchivePage extends React.Component
{
  /**
   * Constructor for BlogArchivePage
   * @param {*} props 
   */
  constructor(props)
  {
    super(props);
    this.blog_year_info = 
    {
      blog_years: [],        // Gets the list of unique years in all blog posts
      blogs: [],                  // Store the information about each blog post (title, years, slug, date)
      year_info: new Array(), // Store the information about each year (List of indices of blog posts containing the year in the order in which the blogs are ordered)
    }
  }
  
  /**
   * Generates the information necessary for each year
   */
  generateBlogYearInfo()
  {
    this.blog_year_info.blog_years = [];
    this.blog_year_info.blogs = [];
    this.blog_year_info.year_info = [];
    if(this.props.data.archives != null)
    {
      // Iterate through each post, putting all found years into `years`
      _.each(this.props.data.archives.edges, edge => {
        // Concatenate the years for this blog posts to the list of the years collected till now
        this.blog_year_info.blog_years = this.blog_year_info.blog_years.concat(edge.node.fields.year);
        // Collect the blog information for each blog post in order
        this.blog_year_info.blogs.push([edge.node.frontmatter.title, edge.node.fields.year,
                                        edge.node.fields.slug, edge.node.fields.date]);
      });
      // Eliminate duplicate years
      this.blog_year_info.blog_years = _.sortBy(_.uniq(this.blog_year_info.blog_years));
      // Slugify characters
      slugify.charmap['+'] = 'p';
      // Generate the list of blogs for each year
      for(var index_i = 0; index_i < this.blog_year_info.blog_years.length; index_i++)
      {
        
        this.blog_year_info.year_info.push(new Array());
        for(var index_j = 0; index_j < this.blog_year_info.blogs.length; index_j++)
        {
          // If the blog has this particular year, then append the blog index to year_info array
          if(this.blog_year_info.blogs[index_j][1].indexOf(this.blog_year_info.blog_years[index_i]) > -1)
          {
            this.blog_year_info.year_info[index_i].push(index_j);
          }
        }
      }
    }
  }

  /**
   * Render the BlogArchivePage
   */
  render()
  {
    // Generate the information for all the years 
    this.generateBlogYearInfo();
    let blog_years = this.blog_year_info.blog_years;
    let year_info = this.blog_year_info.year_info;
    let blogs = this.blog_year_info.blogs;
    return (
      <div>
        <HeadMeta
          title={"Blogs - Archives | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of all the archives for the blogs undertaken by " + this.props.data.site.siteMetadata.author}
          keywords={"blogs, archives, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="fa fa-file-archive fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Blog - Archives</div>
        <div style={{display: 'inline-flex', flexWrap: 'wrap'}}>
        {/* Generates the list of years and their counts in all the blog posts */}
        {
          blog_years.map( function(name, index_i)
          {
            let year_slug = slugify(blog_years[index_i].toLowerCase());
            return (
              <LinkChip
                key={"/blog/archives/#"+year_slug}
                url={"/blog/archives/#"+year_slug}
                content={blog_years[index_i]}
                icon={"file-archive"}
                count={year_info[index_i].length}
              />
            );
          })
        }
        </div>
        <div>
        {
          blog_years.map( function(name, index_i)
          {
            let year_slug = slugify(blog_years[index_i].toLowerCase());
            return (
              <ul key={"blog_year_list"+index_i} style={{listStyleType: 'none', paddingLeft: '0'}}>
                <li key={blog_years[index_i]}>
                {
                  <Link to={"/blog/archives/#"+year_slug} style={{textDecoration: 'none'}}>
                    <h2>{name}</h2>
                  </Link>
                }
                <ul style={{listStyleType: 'none', paddingLeft: '1rem'}}>
                {
                  year_info[index_i].map( function(year_name, index_j)
                  {
                    return (
                    <li key={year_name} style={{marginBottom: '0.5rem'}}>
                      <SimpleCard>
                        <div className="card-content">
                          <Link to={blogs[year_name][2]} style={{textDecoration: 'none'}}>
                            <span>{blogs[year_name][0]}</span>
                          </Link><span style={{float: 'right'}}>{blogs[year_name][3]}</span>
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

export default BlogArchivePage;

export const query = graphql`
  query BlogArchivesQuery
  {
    archives: allMarkdownRemark
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
            publish
          }
          fields
          {
            slug
            date(formatString: "MMMM YYYY", locale: "en")
            year
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