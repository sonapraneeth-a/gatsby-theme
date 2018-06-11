import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

class SEO extends React.Component
{
  constructor(props)
  {
    super(props);
    this.config = {
      author: "",
      title: "",
      titleAlt: "",
      type: "",
      description: "",
      url: "",
      image: "",
      site_name: "",
      twitter_card: "summary",
      twitter_creator: "@",
      twitter_site: "@",
      published_date: "",
      tags: "",
    }
  }

  setMetaProps()
  {
    if(this.props.author != null) { this.config.author = this.props.author; }
    if(this.props.title != null) { this.config.title = this.props.title; }
    if(this.props.type != null) { this.config.type = this.props.type; }
    if(this.props.description != null) { this.config.description = this.props.description; }
    if(this.props.url != null) { this.config.url = this.props.url; }
    if(this.props.image != null) { this.config.image = this.props.image; }
    if(this.props.site_name != null) { this.config.site_name = this.props.site_name; }
    if(this.props.twitter_username != null) { this.config.twitter_creator = "@"+this.props.twitter_username; }
    if(this.props.twitter_username != null) { this.config.twitter_site = "@"+this.props.twitter_username; }
    if(this.props.published_date != null) { this.config.published_date = this.props.published_date; }
    if(this.props.tags != null) { this.config.tags = this.props.tags; }
  }

  render()
  {
    this.setMetaProps();
    let author = this.config.author;
    let title = this.config.title;
    let type = this.config.type;
    let description = this.config.description;
    let url = this.config.url;
    let image = this.config.image;
    let site_name = this.config.site_name;
    let twitter_card = this.config.twitter_card;
    let twitter_site = this.config.twitter_site;
    let twitter_creator = this.config.twitter_creator;
    let published_date = this.config.published_date;
    let tags = this.config.tags;
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "Website",
        url: this.config.url,
        name: this.config.title,
        alternateName: this.config.titleAlt ? this.config.titleAlt : ""
      }
    ];
    return (
      <div>
        {/* http://ogp.me/ */}
        <Helmet
          meta={[
            { name: "og:title", content: title },
            { name: "og:type", content: type },
            { name: "og:description", content: description },
            { name: "og:url", content: url },
            { name: "og:image", content: image },
            { name: "og:site_name", content: site_name },
            { name: "twitter:card", content: twitter_card },
            { name: "twitter:site", content: twitter_site },
            { name: "twitter:creator", content: twitter_creator },
          ]}
        />
        { type == "article" &&
          <Helmet
            meta={[
              { name: "article:published_time", content: published_date },
              { name: "article:modified_time", content: "" },
              { name: "article:expiration_time", content: "" },
              { name: "article:author", content: author },
              { name: "article:section", content: "" },
              { name: "article:tag", content: tags },
            ]}
          />
        }
        {/* Schema.org tags */}
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(schemaOrgJSONLD)}
          </script>
        </Helmet>
      </div>
    );
  }
}

export default SEO;

/*export const query = graphql`
  query SEOQuery
  {
    site: site
    {
      social
      {
        twitter
        {
          username
        }
      }
    }
  }
  `;*/
