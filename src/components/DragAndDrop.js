import React, { useEffect, useState } from "react";
import GalleryData from "../GalleryData";
import './imageCard.css';
import styled from "styled-components";

const DragAndDropList = () => {
  const [items, setItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);

  useEffect(()=>{
    setItems(GalleryData);
  },[]);

  const handleDragStart = (e, item) => {
    setDraggingItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (draggingItem) {
      const updatedItems = [...items];
      const currentIndex = items.indexOf(draggingItem);

      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(index, 0, draggingItem);

      setItems(updatedItems);
      setDraggingItem(null);
    }
  };

  return (
    <Wrapper>
    <div className="container">
    <h1 className="heading">Image Gallery</h1>
    <hr/>
      <div className="grid grid-four-column">
        {items.map((item, index) => (
          <div className="gallery-item"
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img src={item.src} alt={item.title} />
            {item.title}
          </div>
        )) }
      </div>
    </div>
    </Wrapper>
  );

  
}


const Wrapper = styled.section`
 .container{
  width: 100vw;
 }

  .feature{
    width: 400px;
    height: 400px;
  }
  .heading{
    text-align: left;
  }
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: .5rem;

  .grid {
    display: grid;
    gap: 3rem;
  }
  
  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-three-column {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-four-column{
    grid-template-columns: repeat(4, 1fr);
 }
 
 .grid-five-column{
   grid-template-columns: repeat(5, 1fr);
 }
  
  



  .grid {
    flex-direction: column;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .grid-four-column {
    grid-template-columns:  repeat(4, 1fr);
   
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;


export default DragAndDropList;