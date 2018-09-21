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
    console.log("Author: " + this.props.author);
    return (
      <footer className="footer center" id="footer" style={{clear: "both"}}>
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
