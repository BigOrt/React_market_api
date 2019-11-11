import React from "react";
import { Dropdown } from "react-bootstrap";
import dashboard from './svgs/dash.svg';
import trades from './svgs/trades.svg';
import market from './svgs/market.svg';
import torrent from './svgs/torrent.svg';

export const SideList = ({ classes }) => {
  return (
    <Dropdown>
      <style type="text/css">
        {`
          .dropdown-item.hover, .dropdown-item:hover {
            color: #7a8189;
            text-decoration: none;
            background-color: white;
        }
        .dropdown-item.active, .dropdown-item:active {
          color: #000000;
          text-decoration: none;
          background-color: #dcdfe5;
      }
        `}
      </style>
      <Dropdown.Item eventKey="1"><img src={dashboard} alt="Dashboard" />&nbsp;Dashboard</Dropdown.Item>
      <Dropdown.Item eventKey="2"><img src={trades} alt="Trades" />&nbsp;Trades</Dropdown.Item>
      <Dropdown.Item eventKey="3"><img src={market} alt="Market" />&nbsp;MarketCap</Dropdown.Item>
      <Dropdown.Item eventKey="3"><img src={torrent} alt="Torrent" />&nbsp;Torrent</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
    </Dropdown>
  );
};
