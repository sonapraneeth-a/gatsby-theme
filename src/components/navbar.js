import React from "react";
import { Link } from "gatsby";

import Container from "./grid/container";

class Navbar extends React.Component
{
  constructor(props)
  {
    super(props);
    this.menu = [];
  }

  generateMenu()
  {
    let nav_menu = this.props.menu;
    let nav_menu_length = nav_menu.length;
    let nav_menu_array = new Array();
    for(let index_i = 0; index_i < nav_menu_length; index_i++)
    {
      let nav_submenu_length = nav_menu[index_i].submenu.length;
      let nav_submenu_array = new Array();
      let nav_menu_status = this.isNavMenuActive(nav_menu[index_i].url);
      for(let index_j = 0; index_j < nav_submenu_length; index_j++)
      {
        nav_submenu_array.push([nav_menu[index_i].submenu[index_j].name, 
                                  nav_menu[index_i].submenu[index_j].icon,
                                  nav_menu[index_i].submenu[index_j].url]);
      }
      nav_menu_array.push([nav_menu[index_i].name, nav_menu[index_i].icon, 
                            nav_menu[index_i].url, nav_submenu_array, nav_menu_status]);
    }
    this.menu = nav_menu_array;
  }

  isNavMenuActive(url)
  {
    let nav_menu_class = "";
    if (url !== "/" && this.props.page_url.includes(url))
    {
      nav_menu_class = "active";
    }
    else if(url === this.props.page_url)
    {
      nav_menu_class = "active";
    }
    return nav_menu_class;
  }

  render()
  {
    this.generateMenu();
    let nav_menu = this.menu;
    return (
      <nav className="navbar" role="navigation">
        <Container>
        <div className="navbar-content">
          <h1 className="navbar-header"><a href="/">{this.props.brand_name}</a></h1>
          <ul className="navbar-menu">
            {
              nav_menu.map(function(menu_name, index_i)
              {
                return (
                  <li key={"nav"+index_i} className={nav_menu[index_i][4]}>
                    <span style={{display: 'inline-block'}}>
                      <a href={nav_menu[index_i][2]}>
                        <i className={"fa fa-"+nav_menu[index_i][1]+" fa-fw"}></i>
                        &nbsp;{nav_menu[index_i][0]}
                      </a>
                    </span>
                    {
                      nav_menu[index_i][3].length > 0 &&
                        <span className="dropdown-icon"><a style={{padding: '0rem 0.1rem'}}><i className="fa fa-caret-down fa-fw"></i></a></span>
                    }
                    {
                      nav_menu[index_i][3].length > 0 &&
                      <ul className="navbar-dropdown-menu">
                      {
                        nav_menu[index_i][3].map(function(submenu_name, index_j)
                        {
                          return (
                            <li key={"subnav"+index_j} className="active">
                              <a href={nav_menu[index_i][3][index_j][2]}>
                                <i className={"fa fa-"+nav_menu[index_i][3][index_j][1]}></i>&nbsp;&nbsp;{nav_menu[index_i][3][index_j][0]}
                              </a>
                            </li>
                          );
                        })
                      }
                      </ul>
                    }
                  </li>
                );
              })
            }
          </ul>
        </div>
        </Container>
      </nav>
    );
  }
}

export default Navbar;