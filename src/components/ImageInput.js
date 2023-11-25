import React, { useState } from 'react';

export default function ImageInput() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setExtractedText('');
  };

  const extractTextFromImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);
  
      const response = await fetch('http://localhost:8080/api/extractText', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      console.log(data.text);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };
  

  return (
    <div>
      <h1>Upload and Extract Text from Image</h1>

      {selectedImage && (
        <div>
          <img
            alt="Image Preview"
            width={250}
            src={URL.createObjectURL(selectedImage)}
          />

          <button onClick={removeImage}>Remove</button>
        </div>
      )}

      <input
        type="file"
        name="myImage"
        onChange={handleImageChange}
      />

      <button onClick={extractTextFromImage}>Extract Text</button>

      {extractedText && (
        <div>
          <h2>Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}
