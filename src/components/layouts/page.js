import React from "react";
import { Link } from "gatsby";

import BaseLayout from "base";


class PageLayout extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let font_name = "fa fa-1 " + this.props.icon_name;
    return (
      <BaseLayout>
        <div className="page">
          <h1 className="page-title">
            { this.props.icon_name !== null &&
            <span>
                <i className={font_name} aria-hidden={"true"}></i>
              &nbsp;&nbsp;{this.props.title}
              </span>
            }
            { this.props.icon_name === null &&
            this.props.title
            }
          </h1>
          <div className="page-content">
            {this.props.children}
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default PageLayout;
