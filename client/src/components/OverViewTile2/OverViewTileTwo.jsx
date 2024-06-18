import React from 'react';
import './OverViewTileTwoBox.css';
import OverViewTileTwoBox from './OverViewTileTwoBox';

const campaigns = [
  { id: 1, title: "Campaign 1", details: "Details for Campaign 1" },
  { id: 2, title: "Campaign 2", details: "Details for Campaign 2" },
  { id: 3, title: "Campaign 3", details: "Details for Campaign 3" },
  { id: 4, title: "Campaign 4", details: "Details for Campaign 4" }
];

const OverViewTileTwo = () => {
  return (
    <div className="OverViewTileTwoContainer">
      {campaigns.map(campaign => (
        <OverViewTileTwoBox key={campaign.id} title={campaign.title} details={campaign.details} />
      ))}
    </div>
  );
};

export default OverViewTileTwo;
