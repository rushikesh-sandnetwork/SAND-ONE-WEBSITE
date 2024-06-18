import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './ViewCampaignsContainer.css'
const ViewCampaignsContainer = () => {

  const navigate = useNavigate()

  function createNewCampaign(){
      navigate('generateForm');
  }

  return (
    <div className="viewCampaignsContainer">
              <input className='newCampaignBtn' type="button" value="Create New Campaign +" onClick={createNewCampaign}/>

              <div className="allCampaignsContainer">
                
              </div>

    </div>
  )
}

export default ViewCampaignsContainer

