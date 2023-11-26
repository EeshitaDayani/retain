import React, { useState } from 'react';

export default function ImageInput() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const extractText = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8080/api/extractTextFromImage', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error('Error extracting text:', error);
      return '';
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const text = await extractText(file);
    setExtractedText(text);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setExtractedText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#18756e' }}>
      <h2>image upload</h2>

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

      <label>
        <input
          type="file"
          name="myImage"
          onChange={handleImageChange}
          style={{ display: 'none' }} // hide the default file input appearance
        />
        <div style={{ cursor: 'pointer', border: '1px solid #18756e', padding: '5px', borderRadius: '5px' }}>
          choose a file
        </div>
      </label>

      {extractedText && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>extracted text:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}
