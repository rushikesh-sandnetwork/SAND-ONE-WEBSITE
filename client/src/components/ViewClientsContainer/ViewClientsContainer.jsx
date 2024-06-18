import React from 'react'
import './ViewClientsContainer.css';
import ViewClientsBox from './ViewClientsBox';

const clients = [
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: "Client Name" },
]

const ViewClientsContainer = () => {
  return (
    <div className="ViewClientsContainer">
      {clients.map(client => (
        <ViewClientsBox imgSrc={client.imgSrc} title={client.title}></ViewClientsBox>
      ))}
    </div>
  )
}

export default ViewClientsContainer
