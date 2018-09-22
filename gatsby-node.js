const fs = require("fs-extra");
const path = require("path");
const slugify = require("slug");
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  slugify.charmap["+"] = "p";
  // Create node fields for blog post
  if (node.internal.type === `MarkdownRemark` && node.frontmatter.type === `blog-post`)
  {
    const slug = createFilePath({ node, getNode, basePath: `posts` });
    const [, year, month, date, title] = slug.match(/^\/([\d]{4})-([\d]{2})-([\d]{2})-{1}(.+)\/$/);
    const value = `/blog/${year}/${month}/${date}/${slugify(title)}/`;
    createNodeField({ node, name: `slug`, value });
    createNodeField({ node, name: `date`, value: year+"-"+month+"-"+date });
    createNodeField({ node, name: `year`, value: year });
    createNodeField({ node, name: `month`, value: month });
    createNodeField({ node, name: `day`, value: date });
  }
  // Create node fields for project
  if (node.internal.type === `MarkdownRemark` && node.frontmatter.type === `project`)
  {
    const slug = createFilePath({ node, getNode, basePath: `projects` });
    const [, year, month, date, title] = slug.match(/^\/([\d]{4})-([\d]{2})-([\d]{2})-{1}(.+)\/$/);
    const value = `/projects/${slugify(title)}/`;
    createNodeField({ node, name: `slug`, value });
    createNodeField({ node, name: `date`, value: year+"-"+month+"-"+date });
    createNodeField({ node, name: `year`, value: year });
    createNodeField({ node, name: `month`, value: month });
    createNodeField({ node, name: `day`, value: date });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
  graphql(`
    {
      posts: allMarkdownRemark (
        sort: {  fields: [fields___date], order: DESC},
        filter:
        {
          frontmatter:
          {
            type: {regex: "/blog-post/"},
            publish: {eq: true}
          },
        }
      )
      {
        totalCount
        edges
        {
          node
          {
            frontmatter
            { tags, title }
            fields
            {
              slug
              date
            }
            fileAbsolutePath
          }
        }
      }
      projects: allMarkdownRemark (
        filter:
        {
          frontmatter:
          {
            type: {regex: "/project/"}
          },
        }
      )
      {
        edges
        {
          node
          {
            frontmatter
            { tags }
            fields 
            {
              slug
              date
            }
          }
        }
      }
      config: site
      {
        siteMetadata
        {
          pagination
          {
            per_page
            per_block
            disp_page_block
          }
          blog
          {
            excerpt_length
          }
        }
      }
    }
    `).then(result => {

      const blogsPerPage = result.data.config.siteMetadata.pagination.per_page;
      const blogExcerptLength = result.data.config.siteMetadata.blog.excerpt_length;
      if(result.data.posts != null)
      {
        const numPages = Math.ceil(result.data.posts.totalCount/blogsPerPage);
        let blogsPaginationList = new Array(numPages);
        let blogsInfo = new Array(result.data.posts.totalCount);
        for (var i = 0; i < numPages; i++)
        {
          blogsPaginationList[i] = [];
        }

        result.data.posts.edges.map( function(name, index)
        {
          let dirname = __dirname;
          let fullPath = result.data.posts.edges[index].node.fileAbsolutePath;
          //console.log("Fullpath: " + fullPath);
          //console.log("Dirname: " + dirname);
          if(dirname.indexOf("\\") >= 0)
          {
            dirname = dirname.replace(/\\/g, "/");
          }
          //console.log("Dirname: " + dirname);
          let srcDirname = dirname + "/src/";
          let relativePath = fullPath.substr(srcDirname.length);
          blogsPaginationList[Math.floor(index/blogsPerPage)].push(index);
          let prevPost = [];
          let nextPost = [];
          let relatedPosts = [];
          if(index > 0 && index < result.data.posts.totalCount)
          {
            prevPost.push(result.data.posts.edges[index-1].node.frontmatter.title);
            prevPost.push(result.data.posts.edges[index-1].node.fields.slug);
          }
          if(index >= 0 && index < result.data.posts.totalCount-1)
          {
            nextPost.push(result.data.posts.edges[index+1].node.frontmatter.title);
            nextPost.push(result.data.posts.edges[index+1].node.fields.slug);
          }
          console.log("Relativepath: " + relativePath);
          blogsInfo.push([result.data.posts.edges[index].node.fields.slug, 
                          prevPost, nextPost, relatedPosts, relativePath]);
        });

        blogsPaginationList.map(function(name, index_i) {
          var blog_path = "/blog/";
          var page_no = index_i+1;
          if(index_i !== 0) { blog_path = "/blog/"+page_no; }
          createPage({
            path: blog_path,
            component: path.resolve(`./src/templates/blog-index.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              limit: blogsPerPage,
              skip: index_i*blogsPerPage,
              totalNumberOfPages: numPages,
              prevPage: page_no-1,
              currentPage: page_no,
              nextPage: page_no+1,
              minNumberOfPages: 5,
              blogs: blogsPaginationList[index_i],
              excerptLength: blogExcerptLength,
            },
          });
        });

        blogsInfo.map(function(name, index_i) {
          //console.log("Map rp: " + blogsInfo[index_i][3]);
          createPage
          ({
            path: blogsInfo[index_i][0],
            component: path.resolve(`./src/templates/blog-post.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: blogsInfo[index_i][0],
              next_post: blogsInfo[index_i][2],
              prev_post: blogsInfo[index_i][1],
              relativePath: blogsInfo[index_i][4],
            },
          });
        });
      }

      if(result.data.projects != null)
      {
        result.data.projects.edges.forEach(({ node }) => {
          createPage
          ({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/project.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          });
        });
      }

      resolve();
    });
  });
};
