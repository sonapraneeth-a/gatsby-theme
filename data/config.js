const moment = require("moment");

module.exports = {
  feed: {
    dir: "posts", // The name of directory that contains your posts.
    url: "/feed.xml", // Path to the Feed file.
    title: "Blog - Gatsby theme",
    description: "Blog of Gatsby theme",
    author: "Sona Praneeth Akula"
  },
  projects: {
    dir: "projects",
    url: "/projects.xml", // Path to the Feed file.
    title: "Projects - Sona Praneeth Akula",
    description: "Projects of Sona Praneeth Akula",
    author: "Sona Praneeth Akula"
  },
  site: {
    title: "Home page - Gatsby theme", // Site title.
    titleAlt: "Home page - Gatsby theme", // Alternative site title for SEO.
    logo: "", // Logo used for SEO and manifest.
    url: "https://gatsby-profile-page-theme.netlify.com", // Domain of your website without pathPrefix.
    description: "A GatsbyJS starter with Advanced design in mind.", // Website description used for Feed feeds/meta description tag.
    pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
    author: "Sona Praneeth Akula", // Username to display in the author segment.
    copyright: "Copyright &copy; Sona Praneeth Akula. "+moment().format("YYYY"), // Copyright string for the footer of the website and Feed feed.
    themeColor: "#c62828", // Used for setting manifest and progress theme colors.
    backgroundColor: "#e0e0e0" // Used for setting manifest background color.
  },
  id: {
    googleAnalyticsID: "UA-90733014-1", // GA tracking ID.
    disqusShortname: "sonapraneethakula", // Disqus shortname.
  },
  user: {
    social_links: [
      {
        label: "Gmail",
        username: "sonapraneeth.akula",
        url: "mailto:sonapraneeth.akula@gmail.com",
        iconClassName: "fab fa-envelope"
      },
      {
        label: "GitHub",
        username: "sonapraneeth-a",
        url: "https://github.com/sonapraneeth-a",
        iconClassName: "fab fa-github"
      },
      {
        label: "LinkedIn",
        username: "sona-praneeth-akula",
        url: "https://www.linkedin.com/in/sona-praneeth-akula",
        iconClassName: "fab fa-linkedin-in"
      },
      {
        label: "Twitter",
        username: "sonapraneeth_a",
        url: "https://twitter.com/sonapraneeth_a",
        iconClassName: "fab fa-twitter"
      },
    ],
  },
  menu:
  [
    {
      name: "Home",
      icon: "home",
      url: "/",
      submenu: [],
    },
    {
      name: "Projects",
      icon: "file-code",
      url: "/projects/",
      submenu:
      [
        {
          name: "Tags",
          icon: "tag",
          url: "/projects/tags/",
        },
        {
          name: "Categories",
          icon: "folder-open",
          url: "/projects/categories/",
        },
        {
          name: "Archives",
          icon: "file-archive",
          url: "/projects/archives/",
        },
      ]
    },
    {
      name: "Blog",
      icon: "pencil-alt",
      url: "/blog/",
      submenu:
      [
        {
          name: "Tags",
          icon: "tag",
          url: "/blog/tags/",
        },
        {
          name: "Categories",
          icon: "folder-open",
          url: "/blog/categories/",
        },
        {
          name: "Archives",
          icon: "file-archive",
          url: "/blog/archives/",
        },
      ]
    },
    {
      name: "Contact",
      icon: "mobile-alt",
      url: "/contact/",
      submenu: [],
    },
  ],
};