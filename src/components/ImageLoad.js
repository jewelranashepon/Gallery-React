import React, { useEffect, useState } from 'react';
//import GalleryData from './ImageGallery'; // Import the component where you want to use the images
import Gallery from './Gallery';
import GalleryData from "../GalleryData";

function App() {
  const [image, setImage] = useState([]);

  useEffect(()=>{
    setImage(GalleryData);
  })
  return (
    <div>
      <h1>Image Gallery</h1>
      <Gallery imgs={image} />
    </div>
  );
}

export default App;