import React from 'react'
import './OverViewTileOne.css';
import OverViewTileOneBox from './OverViewTileOneBox';
const OverViewTileOne = () => {
  return (
    <div className="OverViewTileOneContainer">
        <OverViewTileOneBox title="TOTAL CAMPAIGN" number="8"></OverViewTileOneBox>
        <OverViewTileOneBox title="ONGOING CAMPAIGN" number="2"></OverViewTileOneBox>
        <OverViewTileOneBox title="COMPLETED CAMPAIGN" number="5"></OverViewTileOneBox>
        <OverViewTileOneBox title="ON HOLD CAMPAIGN" number="1"></OverViewTileOneBox>
    </div>
  )
}

export default OverViewTileOne
