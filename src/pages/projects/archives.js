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
class ProjectArchivePage extends React.Component
{
  /**
   * Constructor for ProjectArchivePage
   * @param {*} props 
   */
  constructor(props)
  {
    super(props);
    this.project_year_info = 
    {
      project_years: [],        // Gets the list of unique years in all project posts
      projects: [],                  // Store the information about each project post (title, years, slug, date)
      year_info: new Array(), // Store the information about each year (List of indices of project posts containing the year in the order in which the projects are ordered)
    }
  }
  
  /**
   * Generates the information necessary for each year
   */
  generateProjectYearInfo()
  {
    this.project_year_info.project_years = [];
    this.project_year_info.projects = [];
    this.project_year_info.year_info = [];
    if(this.props.data.archives != null)
    {
      // Iterate through each post, putting all found years into `years`
      _.each(this.props.data.archives.edges, edge => {
        // Concatenate the years for this project posts to the list of the years collected till now
        this.project_year_info.project_years = this.project_year_info.project_years.concat(edge.node.fields.year);
        // Collect the project information for each project post in order
        this.project_year_info.projects.push([edge.node.frontmatter.title, edge.node.fields.year,
                                        edge.node.fields.slug, edge.node.fields.date]);
      });
      // Eliminate duplicate years
      this.project_year_info.project_years = _.reverse(_.sortBy(_.uniq(this.project_year_info.project_years)));
      // Slugify characters
      slugify.charmap['+'] = 'p';
      // Generate the list of projects for each year
      for(var index_i = 0; index_i < this.project_year_info.project_years.length; index_i++)
      {
        
        this.project_year_info.year_info.push(new Array());
        for(var index_j = 0; index_j < this.project_year_info.projects.length; index_j++)
        {
          // If the project has this particular year, then append the project index to year_info array
          if(this.project_year_info.projects[index_j][1].indexOf(this.project_year_info.project_years[index_i]) > -1)
          {
            this.project_year_info.year_info[index_i].push(index_j);
          }
        }
      }
    }
  }

  /**
   * Render the ProjectArchivePage
   */
  render()
  {
    // Generate the information for all the years 
    this.generateProjectYearInfo();
    let project_years = this.project_year_info.project_years;
    let year_info = this.project_year_info.year_info;
    let projects = this.project_year_info.projects;
    return (
      <div>
        <HeadMeta
          title={"Projects - Archives | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of all the tags for the projects undertaken by " + this.props.data.site.siteMetadata.author}
          keywords={"projects, archives, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="fa fa-file-archive fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Project - Archives</div>
        <div style={{display: 'inline-flex', flexWrap: 'wrap'}}>
        {/* Generates the list of years and their counts in all the project posts */}
        {
          project_years.map( function(name, index_i)
          {
            let year_slug = slugify(project_years[index_i].toLowerCase());
            return (
              <LinkChip
                key={"/projects/archives/#"+year_slug}
                url={"/projects/archives/#"+year_slug}
                content={project_years[index_i]}
                icon={"file-archive"}
                count={year_info[index_i].length}
              />
            );
          })
        }
        </div>
        <div>
        {
          project_years.map( function(name, index_i)
          {
            let year_slug = slugify(project_years[index_i].toLowerCase());
            return (
              <ul key={"project_year_list"+index_i} style={{listStyleType: 'none', paddingLeft: '0'}}>
                <li key={project_years[index_i]}>
                {
                  <Link to={"/project/archives/#"+year_slug} style={{textDecoration: 'none'}}>
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
                          <Link to={projects[year_name][2]} style={{textDecoration: 'none'}}>
                            <span>{projects[year_name][0]}</span>
                          </Link><span style={{float: 'right'}}>{projects[year_name][3]}</span>
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

export default ProjectArchivePage;

export const query = graphql`
  query ProjectArchivesQuery
  {
    archives: allMarkdownRemark
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