import React, { useEffect, useState } from "react";
import GalleryData from "../GalleryData";
import   './imageCard.css';
import styled from "styled-components";


const ImageCard = () => {
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(images[0]);
  // new
  // const [draggingItem, setDraggingItem] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);


  const [uploadImage, setUploadImage] = useState(null);


  useEffect(()=>{
    setImages(GalleryData);
  });

  const handleImageUpload = (e) => {
    const newImage = {
      
    }
    const file = e.target.files[0];
    setUploadImage(file);

  };

  const handleReorder = (result) => {
    if (!result.destination) return;

    const reorderedImages = [...images];
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };

  const handleDelete = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image.id)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  const handleFeatureImage = (image) => {
    setFeatureImage(image);
  };
  // deaging function
  const handleDragStart = (e, image) => {
    setDraggingItem(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();

    if (draggingItem) {
      const updatedItems = [...images];
      const currentIndex = images.indexOf(draggingItem);

      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(index, 0, draggingItem);

      setImages(updatedItems);
      setDraggingItem(null);
    }
  };

  return (
  
  <Wrapper>
    <div className="container">
      <h1 className="heading">Image Gallery</h1>
      <hr/>
      <div className="grid">
        <div className="grid grid-four-column"> 
      
        {images.map((image, index) => (

        
          
          <div 
            key={image.id}
            className={`gallery-item ${image === featureImage ? "feature" : ""} ${
              selectedImages.includes(image.id) ? "selected" : ""
            }`}
            onClick={() => handleFeatureImage(image)}
            draggable
            onDragStart={(e) => handleDragStart(e, image)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            <img src={image.src} alt={`Image ${image.id}`} />
            <input
              type="checkbox"
              onChange={() => {
                if (selectedImages.includes(image.id)) {
                  setSelectedImages(selectedImages.filter((id) => id !== image.id));
                } else {
                  setSelectedImages([...selectedImages, image.id]);
                }
              }}
            />
          </div>

          



        ))}

        

       <div className="gallery-item">
       <input type="file" accept="image/*" onChange={handleImageUpload} />
       {uploadImage && <img src={URL.createObjectURL(uploadImage)} alt="Selected" />}
      </div>

    

      </div>
         <button onClick={handleDelete}>Delete Selected</button>
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

export default ImageCard;