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
        logo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
        url: "https://gatsby-theme.netlify.com", // Domain of your website without pathPrefix.
        description: "A GatsbyJS starter with Advanced design in mind.", // Website description used for Feed feeds/meta description tag.
        pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
        author: "Sona Praneeth Akula", // Username to display in the author segment.
        copyright: "Copyright &copy; Sona Praneeth Akula. "+moment().format("YYYY"), // Copyright string for the footer of the website and Feed feed.
        themeColor: "#c62828", // Used for setting manifest and progress theme colors.
        backgroundColor: "#e0e0e0" // Used for setting manifest background color.
    },
    id: {
        googleAnalyticsID: "UA-47311644-5", // GA tracking ID.
        disqusShortname: "https-vagr9k-github-io-gatsby-advanced-starter", // Disqus shortname.
    },
    user: {
        social_links: [
            {
                label: "Gmail",
                username: "sonapraneeth.akula",
                url: "mailto:sonapraneeth.akula@gmail.com",
                iconClassName: "fa fa-envelope"
            },
            {
                label: "GitHub",
                username: "sonapraneeth-a",
                url: "https://github.com/sonapraneeth-a",
                iconClassName: "fa fa-github"
            },
            {
                label: "LinkedIn",
                username: "sona-praneeth-akula",
                url: "https://www.linkedin.com/in/sona-praneeth-akula",
                iconClassName: "fa fa-linkedin"
            },
            {
                label: "Twitter",
                username: "sonapraneeth_a",
                url: "https://twitter.com/sonapraneeth_a",
                iconClassName: "fa fa-twitter"
            },
        ],
    },
};