import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";
import moment from "moment";
import moment_tz from "moment-timezone";
import rehypeReact from "rehype-react";
import slugify from "slug";
import { graphql } from "gatsby";
import config from "../../data/config";
import _ from "lodash";

import SimpleChip from "../components/chip/simple-chip";
import LinkChip from "../components/chip/link-chip";
import HeadMeta from "../components/head/head-meta";
import SEO from "../components/head/seo";
import Sharing from "../components/sharing";
import Row from "../components/grid/row";
import Col from "../components/grid/col";
import Admonition from "../components/admonition";
import Blockquote from "../components/blockquote";
import Text from "../components/text";
import BaseLayout from "../components/layouts/base";

import "katex/dist/katex.min.css";
import BlogPost from "../templates/blog-post";

class Pager extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    // console.log("PPU: " + this.props.prev_post_url);
    // console.log("NPU: " + this.props.next_post_url);
    return (
      <div className="pager">
        {
          this.props.prev_post_url == null &&
          <span className="post-page hidden"></span>
        }
        { this.props.prev_post_url != null &&
        <a className="post-page" href={this.props.prev_post_url} style={{paddingLeft: '0'}}>
          <div style={{width: '12%', textAlign: 'center'}} className="previous-post">
            <i className="fa fa-arrow-left" aria-hidden={"true"}></i>
          </div>
          <div style={{width: '88%'}}>
            <p style={{textAlign:'left', fontWeight: "bold"}}>Previous</p>
            <p style={{textAlign:'left'}} className="previous-post-title">{this.props.prev_post_title}</p>
          </div>
        </a>
        }
        {
          this.props.next_post_url == null &&
          <span className="post-page hidden"></span>
        }
        { this.props.next_post_url != null &&
        <a className="post-page" href={this.props.next_post_url} style={{paddingRight: '0'}}>
          <div style={{width: '88%'}}>
            <p style={{textAlign:'right', fontWeight: '700'}}>Next</p>
            <p style={{textAlign:'right'}} className="next-post-title">{this.props.next_post_title}</p>
          </div>
          <div style={{width: '12%', textAlign: 'center'}} className="next-post">
            <i className="fa fa-arrow-right" aria-hidden={"true"}></i>
          </div>
        </a>
        }
      </div>
    );
  }
}

export default Pager;
