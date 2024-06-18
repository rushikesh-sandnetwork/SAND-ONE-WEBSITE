import React from 'react'
import './ViewClientsContainer.css';
import ViewClientsBox from './ViewClientsBox';

const clients = [
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
  { imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png", title: generateRandomCompanyName() },
];
function generateRandomCompanyName() {
  const adjectives = ["Creative", "Reliable", "Innovative", "Strategic", "Global"];
  const nouns = ["Solutions", "Technologies", "Marketing", "Branding", "Consulting"];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdj} ${randomNoun}`;
}

const ViewClientsContainer = ({setActiveTab}) => {


  return (
    <div className="ViewClientsContainer">
      {clients.map((client, index) => (
        <ViewClientsBox key={index} imgSrc={client.imgSrc} title={client.title} setActiveTab={setActiveTab} ></ViewClientsBox>
      ))}
    </div>
  )
}

export default ViewClientsContainer
