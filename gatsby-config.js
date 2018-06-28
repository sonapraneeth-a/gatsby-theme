const config = require("./data/config");
const moment = require("moment");

module.exports = {
  siteMetadata: {
    author: `Gatsby theme`,
    title: `Demo of Gatsby theme`,
    description: ``,
    siteUrl: config.site.url,
    copyright: config.site.copyright,
    version: `1.0.0`,
    pagination: 
    {
      per_page: 5,
      per_block: 4,
      disp_page_block: 3,
    },
    blog:
    {
      excerpt_length: 100
    },
    feedMetadata:
    {
      feedUrl: config.site.url + config.site.pathPrefix + config.feed.url,
      title: config.feed.title,
      description: config.feed.description,
      imageUrl: `${config.site.url + config.site.pathPrefix}/logos/logo-512.png`,
      author: config.feed.author,
      copyright: config.site.copyright
    },
    projectMetadata:
    {
      projectUrl: config.site.url + config.site.pathPrefix + config.projects.url,
      title: config.projects.title,
      description: config.projects.description,
      imageUrl: `${config.site.url + config.site.pathPrefix}/logos/logo-512.png`,
      author: config.projects.author,
      copyright: config.site.copyright
    },
    social:
    {
      email:
      {
        username: config.user.social_links[0].username,
      },
      github:
      {
        username: config.user.social_links[1].username,
      },
      linkedin:
      {
        username: config.user.social_links[2].username,
      },
      twitter:
      {
        username: config.user.social_links[3].username,
      },
    },
    menu: config.menu,
  },
  pathPrefix: "/",
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.site.title,
        short_name: config.site.title,
        description: config.site.description,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: "minimal-ui",
        icons: [
          {
            src: "/logos/logo-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logos/logo-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.id.googleAnalyticsID,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-copy-images`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-katex`,
          `gatsby-remark-component`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              // `ignoreFileExtensions` defaults to [`png`, `jpg`, `jpeg`, `bmp`, `tiff`]
              // as we assume you'll use gatsby-remark-images to handle
              // images in markdown as it automatically creates responsive
              // versions of images.
              //
              // If you'd like to not use gatsby-remark-images and just copy your
              // original images to the public directory, set
              // `ignoreFileExtensions` to an empty array.
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `pdf`],
            },
          }
        ]
      }
    },
    /*{
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto\:700`
        ]
      }
    }*/
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        setup(ref)
        {
          const ret = ref.query.site.siteMetadata.feedMetadata;
          ret.allMarkdownRemark = ref.query.allMarkdownRemark;
          ret.generator = "GatsbyJS - Sona Praneeth Akula";
          return ret;
        },
        query: `
        {
          site
          {
            siteMetadata
            {
              siteUrl
              feedMetadata
              {
                feedUrl
                title
                description
                imageUrl
                author
                copyright
              }
            }
          }
        }
      `,
        feeds: [
          {
            /* https://github.com/Vagr9K/gatsby-advanced-starter/blob/master/gatsby-config.js */
            serialize(ctx) {
              const feedMetadata = ctx.query.site.siteMetadata.feedMetadata;
              const siteUrl = ctx.query.site.siteMetadata.siteUrl;
              return ctx.query.allMarkdownRemark.edges.map(edge => ({
                date: edge.node.frontmatter.published_date,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                author: feedMetadata.author,
                url: siteUrl + edge.node.fields.slug,
                guid: siteUrl + edge.node.fields.slug,
                tags: edge.node.frontmatter.tags,
                categories: edge.node.frontmatter.categories,
                custom_elements: [{ "content:encoded": edge.node.html
              }]
              }));
            },
            query: `
            {
              allMarkdownRemark
              (
                sort: {  fields: [fields___date], order: DESC}
                  filter:
                  {
                    frontmatter:
                    {
                      type: {regex: "/blog-post/"}
                      publish: {eq: true}
                    },
                  }
              )
              {
                edges
                {
                  node
                  {
                    excerpt
                    html
                    timeToRead
                    fields { slug }
                    frontmatter
                    {
                      title
                      published_date
                      categories
                      tags
                    }
                  }
                }
              }
            }
          `,
            output: config.feed.url
          },
        ]
      }
    },
  ],
}