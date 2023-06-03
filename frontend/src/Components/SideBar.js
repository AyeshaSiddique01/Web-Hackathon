import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter, 
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
    return (
        
            <div style={{ display: 'flex', height: '100%', overflow: 'scroll initial',position:'fixed' }}>
              <CDBSidebar textColor="rgb(113 91 83)" backgroundColor="rgb(113, 91, 83)">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <button style={{position: 'relative',}} icon="logout" >LOGOUT</button>
                  
                </CDBSidebarHeader>
                <CDBSidebarContent className="sidebar-content">
                  <CDBSidebarMenu>
                    <a href ="/" activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon="columns">FEED</CDBSidebarMenuItem>
                    </a>
                    <a href ="/TableOfCariculum" activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon="table">ADD EVENT</CDBSidebarMenuItem>
                    </a>
                    {/* <a href="/profile" activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon="user">Profile page</CDBSidebarMenuItem>
                    </a> */}
                    <a href="/ShowDuties" activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon="paste">WISHLIST</CDBSidebarMenuItem>
                    </a>
                    <NavLink href="/hero404" target="_blank" activeclassname="activeClicked">
                      <CDBSidebarMenuItem icon="exclamation-circle">PROFILE</CDBSidebarMenuItem>
                    </NavLink>
                  </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                  <div style={{padding: '20px 5px',}}> 
                    <div href="/hero404" target="_blank" activeclassname="activeClicked">
                    <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                    DYNAMIC EVENT SCHEDULER
                  </a>
                    </div>
                  </div>
                </CDBSidebarFooter>
              </CDBSidebar>
            </div>


    );
};

export default SideBar;