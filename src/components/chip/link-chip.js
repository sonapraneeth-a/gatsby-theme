import React from "react";
import Link from "gatsby-link";


class LinkChip extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (
      <Link to={this.props.url} style={{textDecoration: 'none'}}>
        <div className="chip">
          { this.props.content != null &&
            <span className="chip-content">
            { this.props.icon != null && 
                <i className={"fa fa-"+this.props.icon} aria-hidden="true"></i>
            }
            &nbsp;{this.props.content}
            </span>
          }
          { this.props.count != null &&
            <span className="chip-count">
              {this.props.count}
            </span>
          }
        </div>
      </Link>
    );
  }
}

export default LinkChip;