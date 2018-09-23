import React from "react";

class Paginator extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    let baseURL = this.props.base_url;
    let firstPageURL = this.props.base_url;
    let lastPageURL = this.props.base_url + this.props.last_page;
    let prevPageURL = this.props.base_url + this.props.prev_page;
    let nextPageURL = this.props.base_url + this.props.next_page;
    let currentPage = this.props.current_page;
    let pages = this.props.pages;
    if(this.props.last_page > 1)
    {
      return (
        <center>
          <ul className="pager-block">
            <li className="first-page" key={"first-page"}>
              <a
                href={firstPageURL}>
                <i className="fa fa-angle-double-left"></i>
              </a>
            </li>
            { (this.props.prev_page == null || this.props.prev_page === "") &&
              <li className="prev" key={"prev-page"}>
                <a className="disabled-link">
                  <i className="fa fa-angle-left" aria-hidden={"true"}></i>
                </a>
              </li>
            }
            { (this.props.prev_page != null && this.props.prev_page !== "") &&
              <li className="previous" key={"prev-page"}>
                <a
                  href={prevPageURL}>
                  <i className="fa fa-angle-left"></i>
                </a>
              </li>
            }
            {
              pages.map(function(name, index) {
                let page_no = pages[index];
                let pageURL = baseURL + (page_no > 1 ? page_no : "");
                if (currentPage === page_no) {
                  return (
                    <li className={"selected"} key={"page" + page_no}>
                      <a href={pageURL}>{page_no}</a>
                    </li>
                  );
                }
                else {
                  return (
                    <li key={"page" + page_no}>
                      <a href={pageURL}>{page_no}</a>
                    </li>
                  );
                }
              })
            }
            { (this.props.next_page == null || this.props.next_page === "") &&
              <li className="next" key={"next-page"}>
                <a className="disabled-link">
                  <i className="fa fa-angle-right" aria-hidden={"true"}></i>
                </a>
              </li>
            }
            { (this.props.next_page != null && this.props.next_page !== "") &&
              <li className="next" key={"next-page"}>
                <a
                  href={nextPageURL}>
                  <i className="fa fa-angle-right"></i>
                </a>
              </li>
            }
            <li className="last-page" key={"last-page"}>
              <a
                href={lastPageURL}>
                <i className="fa fa-angle-double-right"></i>
              </a>
            </li>
          </ul>
        </center>
      );
    }
    else
    {
      return null;
    }
  }
}

export default Paginator;
