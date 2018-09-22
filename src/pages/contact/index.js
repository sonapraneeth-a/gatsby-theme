import React from "react";
import { Link } from "gatsby";
import { graphql } from "gatsby";

import HeadMeta from "../../components/head/head-meta";
import SEO from "../../components/head/seo";
import BaseLayout from "../../components/layouts/base";

//export default ({ data }) => {

class ContactIndex extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <BaseLayout location={this.props.location}>
        <HeadMeta
          title={"Contact | " + this.props.data.site.siteMetadata.author}
          description={"This is the contact page of " + this.props.data.site.siteMetadata.author}
          keywords={"contact page, info, " + this.props.data.site.siteMetadata.author}
        />
        <SEO
          type="page"
          title={"Contact | " + this.props.data.site.siteMetadata.author}
          description={"This is the contact page of " + this.props.data.site.siteMetadata.author}
          url={this.props.data.site.siteMetadata.siteUrl}
          site_name={"Homepage of " + this.props.data.site.siteMetadata.author}
          twitter_username={this.props.data.site.siteMetadata.social.twitter.username}
        />
        {/*<h2 style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'middle'}}><i className="material-icons">call</i>&nbsp;&nbsp;<span>Contact</span></h2>*/}
        <div className="page-title"><i className="fa fa-mobile-alt fa-1" aria-hidden={"true"}></i>&nbsp;&nbsp;Contact</div>
        <form action="https://getsimpleform.com/messages?form_api_token=64314f114eee2fa0a0b0d381d681cb02" method="post">
            <input type="hidden" name="redirect_to" value="/contact/thankyou/" />
            <div className="form-item">
              <label className="form-label" htmlFor="first-name">First Name</label>
              <input className="form-input" type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="form-item">
              <label className="form-label" htmlFor="last-name">Last Name</label>
              <input className="form-input" type="text" name="last-name" placeholder="Last Name" />
            </div>
            <div className="form-item">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input" type="email" name="email" placeholder="Email" />
            </div>
            <div className="form-item">
              <label className="form-label" htmlFor="subject">Subject</label>
              <input className="form-input" type="text" name="subject" placeholder="Subject" />
            </div>
            <div className="form-item">
              <label className="form-label" htmlFor="message">Message</label>
              <textarea className="form-input" type="text" name="body" rows="5" placeholder="Message"></textarea>
            </div>
            <center><input type="submit" value="Submit" /></center>
        </form>
      </BaseLayout>
    )
  }
}

export default ContactIndex;

export const query = graphql`
  query ContactIndexQuery
  {
    site: site
    {
      siteMetadata
      {
        author
        social
        {
          twitter
          {
            username
          }
        }
      }
    }
  }`;