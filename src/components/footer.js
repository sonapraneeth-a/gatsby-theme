import React from "react";
import moment from "moment";

class Footer extends React.Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    //console.log("Author: " + this.props.author);
    let footer_hide_class = "";
    if(this.props.hidden === true)
    {
      footer_hide_class = "hidden";
    }
    /*console.log(this.props.hidden);
    console.log(footer_hide_class);*/
    return (
      <footer className={`footer center ${footer_hide_class}`} id="footer" style={{clear: "both"}}>
        <center>
          <p className="footer-display">

            { this.props.author !== null &&
              <span id="copyright">
                &copy;&nbsp;<a href="https://sonapraneeth-a.github.io/">{this.props.author}.</a>&nbsp;
              </span>
            }
            <span id="powered-by">
              Powered by <a href="https://sonapraneeth-a.github.io/gatsby-theme/">Gatsby reboot lanyon</a> theme.
            </span>&nbsp;
            <span id="last-modified">{moment().format("ddd MMM DD YYYY h:mm:ss A")}</span>
          </p>
        </center>
      </footer>
    );
  }
}

export default Footer;

{/*<footer className="footer">
          <center>
            <p
              dangerouslySetInnerHTML={{
                __html: copyright}}
            />
          </center>
        </footer>*/}
