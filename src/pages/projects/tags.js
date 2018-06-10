import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

// Components
import SimpleCard from "../../components/card/simple-card";
import LinkChip from "../../components/chip/link-chip";
import HeadMeta from "../../components/head-meta";

// Imports
const _ = require('lodash')
const slugify = require('slug')

/**
 * 
 */
class ProjectTagPage extends React.Component
{
  /**
   * Constructor for ProjectTagPage
   * @param {*} props 
   */
  constructor(props)
  {
    super(props);
    this.project_tag_info = 
    {
      project_tags: [],         // Gets the list of unique tags in all project posts
      projects: [],             // Store the information about each project post (title, tags, slug, date)
      tag_info: new Array(), // Store the information about each tag (List of indices of project posts containing the tag in the order in which the projects are ordered)
    }
  }
  
  /**
   * Generates the information necessary for each tag
   */
  generateProjectTagInfo()
  {
    this.project_tag_info.project_tags = [];
    this.project_tag_info.projects = [];
    this.project_tag_info.tag_info = [];
    if(this.props.data.tags != null)
    {
      // Iterate through each post, putting all found tags into `tags`
      _.each(this.props.data.tags.edges, edge => {
        //if (_.get(edge, "node.frontmatter.tags")) {
        let tags = [];
        // Get the tags for the project post. Convert the first letter of the tag name to capitals for 
        // proper sorting
        edge.node.frontmatter.tags.map( function(tag, index)
        {
          let tag_name = tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
          tags = tags.concat(tag_name);
        });
        // Concatenate the tags for this project posts to the list of the tags collected till now
        this.project_tag_info.project_tags = this.project_tag_info.project_tags.concat(tags);
        // Collect the project information for each project post in order
        this.project_tag_info.projects.push([edge.node.frontmatter.title, tags,
                      edge.node.fields.slug, edge.node.fields.date]);
        //}
      });
      // Eliminate duplicate tags
      this.project_tag_info.project_tags = _.sortBy(_.uniq(this.project_tag_info.project_tags));
      // Slugify characters
      slugify.charmap['+'] = 'p';
      // Generate the list of projects for each tag
      for(var index_i = 0; index_i < this.project_tag_info.project_tags.length; index_i++)
      {
        
        this.project_tag_info.tag_info.push(new Array());
        for(var index_j = 0; index_j < this.project_tag_info.projects.length; index_j++)
        {
          // If the project has this particular tag, then append the project index to tag_info array
          if(this.project_tag_info.projects[index_j][1].indexOf(this.project_tag_info.project_tags[index_i]) > -1)
          {
            this.project_tag_info.tag_info[index_i].push(index_j);
          }
        }
      }
    }
  }

  /**
   * Render the ProjectTagPage
   */
  render()
  {
    // Generate the information for all the tags 
    this.generateProjectTagInfo();
    let project_tags = this.project_tag_info.project_tags;
    let tag_info = this.project_tag_info.tag_info;
    let projects = this.project_tag_info.projects;
    return (
      <div>
        <HeadMeta
          title={"Projects - Tags | " + this.props.data.site.siteMetadata.author}
          description={"This page contains the details of all the tags for the projects undertaken by " + this.props.data.site.siteMetadata.author}
          keywords={"projects, tags, " + this.props.data.site.siteMetadata.author}
        />
        <div className="page-title"><i className="fa fa-tag fa-1" aria-hidden="true"></i>&nbsp;&nbsp;Projects - Tags</div>
        <div style={{display: 'inline-flex', flexWrap: 'wrap'}}>
          {/* Generates the list of tags and their counts in all the project posts */}
          {
            project_tags.map( function(name, index_i)
            {
              let tag_slug = slugify(project_tags[index_i].toLowerCase());
              return (
                <LinkChip
                  key={"/projects/tags/#"+tag_slug}
                  url={"/projects/tags/#"+tag_slug}
                  content={project_tags[index_i]}
                  icon={"tag"}
                  count={tag_info[index_i].length}
                />
              );
            })
          }
        </div>
        <div>
        {
          project_tags.map( function(name, index_i)
          {
            let tag_slug = slugify(project_tags[index_i].toLowerCase());
            return (
              <ul key={"project_tag_list"+index_i} style={{listStyleType: 'none', paddingLeft: '0'}}>
                <li key={project_tags[index_i]}>
                  {
                    <Link to={"/project/tags/#"+tag_slug} style={{textDecoration: 'none'}}>
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
                            <Link to={projects[tag_name][2]} style={{textDecoration: 'none'}}>
                              <span>{projects[tag_name][0]}</span>
                            </Link><span style={{float: 'right'}}>{projects[tag_name][3]}</span>
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

export default ProjectTagPage;

export const query = graphql`
  query ProjectTagsQuery
  {
    tags: allMarkdownRemark
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