import React from "react";
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
class ProjectCategoryPage extends React.Component
{
  /**
   * Constructor for ProjectCategoryPage
   * @param {*} props 
   */
  constructor(props)
  {
    super(props);
    this.project_category_info = 
    {
      project_categories: [],        // Gets the list of unique categories in all project posts
      projects: [],                  // Store the information about each project post (title, categories, slug, date)
      category_info: new Array(), // Store the information about each category (List of indices of project posts containing the category in the order in which the projects are ordered)
    }
  }
  
  /**
   * Generates the information necessary for each category
   */
  generateProjectCategoryInfo()
  {
    this.project_category_info.project_categories = [];
    this.project_category_info.projects = [];
    this.project_category_info.category_info = [];
    if(this.props.data.categories != null)
    {
      // Iterate through each post, putting all found categories into `categories`
      _.each(this.props.data.categories.edges, edge => {
        //if (_.get(edge, "node.frontmatter.categories")) {
        let categories = [];
        // Get the categories for the project post. Convert the first letter of the category name to capitals for 
        // proper sorting
        edge.node.frontmatter.categories.map( function(category, index)
        {
          //let category_name = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
          //categories = categories.concat(category_name);
          categories = categories.concat(category);
        });
        // Concatenate the categories for this project posts to the list of the categories collected till now
        this.project_category_info.project_categories = this.project_category_info.project_categories.concat(categories);
        // Collect the project information for each project post in order
        this.project_category_info.projects.push([edge.node.frontmatter.title, categories,
                                            edge.node.fields.slug, edge.node.fields.date]);
        //}
      });
      // Eliminate duplicate categories
      this.project_category_info.project_categories = _.sortBy(_.uniq(this.project_category_info.project_categories));
      // Slugify characters
      slugify.charmap['+'] = 'p';
      // Generate the list of projects for each category
      for(var index_i = 0; index_i < this.project_category_info.project_categories.length; index_i++)
      {
        this.project_category_info.category_info.push(new Array());
        for(var index_j = 0; index_j < this.project_category_info.projects.length; index_j++)
        {
          // If the project has this particular category, then append the project index to category_info array
          if(this.project_category_info.projects[index_j][1].indexOf(this.project_category_info.project_categories[index_i]) > -1)
          {
            this.project_category_info.category_info[index_i].push(index_j);
          }
        }
      }
    }
  }

  /**
   * Render the ProjectCategoryPage
   */
  render()
  {
    // Generate the information for all the categories 
    this.generateProjectCategoryInfo();
    let project_categories = this.project_category_info.project_categories;
    let category_info = this.project_category_info.category_info;
    let projects = this.project_category_info.projects;
    return (
      <div>
        <HeadMeta
          title={"Projects - Categories | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of all the categories for the projects undertaken by " + this.props.data.site.siteMetadata.author}
          keywords={"projects, categories, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="fa fa-folder-open fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Projects - Categories</div>
        <div style={{display: 'inline-flex', flexWrap: 'wrap'}}>
        {/* Generates the list of categories and their counts in all the project posts */}
        {
          project_categories.map( function(name, index_i)
          {
            let category_slug = slugify(project_categories[index_i].toLowerCase());
            return (
              <LinkChip
                  key={"/projects/categories/#"+category_slug}
                  url={"/projects/categories/#"+category_slug}
                  content={project_categories[index_i]}
                  icon={"folder-open"}
                  count={category_info[index_i].length}
              />
            );
          })
        }
        </div>
        <div>
        {
          project_categories.map( function(name, index_i)
          {
            let category_slug = slugify(project_categories[index_i].toLowerCase());
            return (
              <ul key={"project_category_list"+index_i} style={{listStyleType: 'none', paddingLeft: '0'}}>
                <li key={project_categories[index_i]}>
                  {
                    <Link to={"/project/categories/#"+category_slug} style={{textDecoration: 'none'}}>
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
                            <Link to={projects[category_name][2]} style={{textDecoration: 'none'}}>
                              <span>{projects[category_name][0]}</span>
                            </Link><span style={{float: 'right'}}>{projects[category_name][3]}</span>
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

export default ProjectCategoryPage;

export const query = graphql`
  query ProjectCategoriesQuery
  {
    categories: allMarkdownRemark
    (
      sort: {  fields: [fields___date], order: DESC}
      filter:
      {
        frontmatter:
        {
          type: {regex: "/project/"},
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