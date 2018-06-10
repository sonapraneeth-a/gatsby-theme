import React from "react";
import Link from "gatsby-link";


class Sidebar extends React.Component
{
  constructor(props)
  {
    super(props);
    this.menu = [];
    this.state = {
      reveal_status: "off",
    }
  }

  updateRevealStatus()
  {
    let current_reveal_status = this.state.reveal_status;
    console.log(current_reveal_status);
    if(current_reveal_status === "on") { current_reveal_status = "off"; }
    else { current_reveal_status = "on"; }
    this.setState({
      reveal_status: current_reveal_status,
    })
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

  generateMenu()
  {
    let sidebar_menu = this.props.menu;
    let sidebar_menu_length = sidebar_menu.length;
    let sidebar_menu_array = new Array();
    for(let index_i = 0; index_i < sidebar_menu_length; index_i++)
    {
      let sidebar_submenu_length = sidebar_menu[index_i].submenu.length;
      let sidebar_submenu_array = new Array();
      let sidebar_menu_status = this.isNavMenuActive(sidebar_menu[index_i].url);
      for(let index_j = 0; index_j < sidebar_submenu_length; index_j++)
      {
        sidebar_submenu_array.push([sidebar_menu[index_i].submenu[index_j].name, 
                                    sidebar_menu[index_i].submenu[index_j].icon,
                                    sidebar_menu[index_i].submenu[index_j].url]);
      }
      sidebar_menu_array.push([sidebar_menu[index_i].name, sidebar_menu[index_i].icon, 
                                sidebar_menu[index_i].url, sidebar_submenu_array, sidebar_menu_status]);
    }
    this.menu = sidebar_menu_array;
  }

  render()
  {
    this.generateMenu();
    let sidebar_menu = this.menu;
    let version = this.props.version;
    let sidebarVisibleStyle = [];
    /*console.log(sidebar_menu);
    console.log(typeof(sidebar_menu));*/
    return (
      <div className="sidebar-content">
        <label className="sidebar-toggle" onClick={() => this.updateRevealStatus()}>
          <i className="fas fa-bars"></i>
        </label>
        <aside className={`sidebar ${this.state.reveal_status}`} style={{display: {}}} role="navigation">
          <div className="sidebar-item" style={{textAlign: 'right'}}>
            <p className="sidebar-close" onClick={() => this.updateRevealStatus()}>
              <i className="fas fa-times"></i>
            </p>
          </div>
          <ul className="sidebar-menu">
          {
            sidebar_menu.map(function(menu_name, index_i)
            {
              return (
                <li key={"sidebar"+index_i} className={sidebar_menu[index_i][4]} style={{width: '100%'}}>
                    <a href={sidebar_menu[index_i][2]}>
                      <i className={"fa fa-"+sidebar_menu[index_i][1]+" fa-fw"}></i>
                      &nbsp;&nbsp;{sidebar_menu[index_i][0]}
                      {
                        sidebar_menu[index_i][3].length > 0 &&
                          <span style={{float: 'right'}}><i className="fa fa-caret-down fa-fw"></i></span>
                      }
                    </a>
                  {
                    sidebar_menu[index_i][3].length > 0 &&
                    <ul className="sidebar-dropdown-menu">
                    {
                      sidebar_menu[index_i][3].map(function(submenu_name, index_j)
                      {
                        return (
                          <li key={"subsidebar"+index_j} className="active">
                            <a href={sidebar_menu[index_i][3][index_j][2]}>
                              <i className={"fa fa-"+sidebar_menu[index_i][3][index_j][1]}></i>&nbsp;&nbsp;{sidebar_menu[index_i][3][index_j][0]}
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
          <div className="sidebar-item">
            Made in <i className="fa fa-heart red"></i> with Gatsby
          </div>
          { version != null &&
            <div className="sidebar-item">
              <b>Current version: </b> {version}
            </div>
          }
        </aside>
      </div>
    );
  }
}

export default Sidebar;