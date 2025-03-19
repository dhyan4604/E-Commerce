import React, { useState, useEffect } from "react";
import Header from "./Header";

const AddProduct = ({ productToEdit, onSave, onCancel }) => {
  const [productData, setProductData] = useState({
    brand: "",
    title: "",
    info: "",
    category: "",
    type: "",
    connectivity: "",
    finalPrice: "",
    originalPrice: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]); // ✅ Store image previews

  // ✅ Prefill form when editing a product
  useEffect(() => {
    if (productToEdit) {
      setProductData({
        brand: productToEdit.brand || "",
        title: productToEdit.title || "",
        info: productToEdit.info || "",
        category: productToEdit.category || "",
        type: productToEdit.type || "",
        connectivity: productToEdit.connectivity || "",
        finalPrice: productToEdit.finalPrice || "",
        originalPrice: productToEdit.originalPrice || "",
        images: [], // Reset images field
      });

      // ✅ Load existing images for preview
      setPreviewImages(productToEdit.imageUrls || []);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // ✅ Handle Image Selection & Show Previews
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setProductData({
      ...productData,
      images: selectedFiles, // ✅ Update images in state
    });

    // ✅ Generate previews for selected images
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("brand", productData.brand);
    formData.append("title", productData.title);
    formData.append("info", productData.info);
    formData.append("category", productData.category);
    formData.append("type", productData.type);
    formData.append("connectivity", productData.connectivity);
    formData.append("finalPrice", productData.finalPrice);
    formData.append("originalPrice", productData.originalPrice);

    productData.images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      let response;
      if (productToEdit) {
        // ✅ Update Product (PUT request)
        response = await fetch(`http://localhost:5000/api/products/${productToEdit._id}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        // ✅ Add New Product (POST request)
        response = await fetch("http://localhost:5000/api/products", {
          method: "POST",
          body: formData,
        });
      }

      const data = await response.json();
      if (response.ok) {
        alert(productToEdit ? "Product updated successfully!" : "Product added successfully!");
        // onSave(data); // ✅ Refresh product list
      } else {
        alert("Failed to save product: " + data.message);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="add-product-page">
      <Header />
      <form className="add-product-form" onSubmit={handleSubmit}>
        <h1>{productToEdit ? "Edit Product" : "Add Product"}</h1>

        <div className="form-group">
          <label>Brand:</label>
          <input type="text" name="brand" value={productData.brand} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={productData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Info:</label>
          <textarea name="info" value={productData.info} onChange={handleChange} rows="3" required />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={productData.category} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input type="text" name="type" value={productData.type} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Connectivity:</label>
          <input type="text" name="connectivity" value={productData.connectivity} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Final Price:</label>
          <input type="number" name="finalPrice" value={productData.finalPrice} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Original Price:</label>
          <input type="number" name="originalPrice" value={productData.originalPrice} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Product Images:</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} required={!productToEdit} />
        </div>

        {/* ✅ Image Previews */}
        <div className="preview-container">
          {previewImages.length > 0 ? (
            previewImages.map((img, index) => (
              <img key={index} src={img} alt="Preview" />
            ))
          ) : (
            <p>No Images Selected</p>
          )}
        </div>

        <button type="submit" className="add-product-btn">{productToEdit ? "Update Product" : "Add Product"}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </form>

      {/* Existing CSS */}
      <style>
        {`
        .add-product-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #000;
          padding: 50px 20px;
          min-height: 100vh;
          font-family: 'Poppins', sans-serif;
        }

        .form-title {
          color: #ff4b2b;
          font-size: 28px;
          margin-bottom: 20px;
        }

        .add-product-form {
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
          width: 100%;
          max-width: 600px;
        }

        input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: white;
          margin-bottom: 10px;
        }

        .preview-container {
          display: flex;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .preview-container img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          margin: 5px;
          border-radius: 8px;
        }
           /* Add Product Page */
    .add-product-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh; /* Ensures the container takes the full height of the viewport */
      background-color: #000; /* Black background */
      font-family: 'Poppins', sans-serif;
      padding: 130px 10px; /* Added margin from top and bottom */
      box-sizing: border-box; /* Ensure padding doesn't affect height */
    }

    .add-product-form {
      display: grid;
      grid-template-columns: 1fr 1fr; /* Two columns */
      column-gap: 10px; /* Space between columns */
      row-gap: 15px; /* Space between rows */
      background: rgba(255, 255, 255, 0.1);
      padding: 20px; /* Reduced padding */
      border-radius: 8px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 20px rgba(255, 0, 0, 0.2);
      width: 100%;
      max-width: 600px; /* Smaller width for compact layout */
      text-align: left;
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: fadeIn 0.8s ease-in-out, floatUp 1.5s infinite alternate;
    }

    .add-product-form h1 {
      grid-column: span 2; /* Center heading across both columns */
      text-align: center;
      margin-bottom: 10px; /* Reduced margin */
      color: white;
      font-size: 20px; /* Smaller title size */
      font-weight: bold;
      animation: fadeIn 1s ease-in-out;
    }

    .form-group {
      margin-bottom: 10px; /* Reduced space between fields */
    }

    label {
      display: block;
      font-size: 12px; /* Smaller label text */
      color: white;
      font-weight: bold;
      margin-bottom: 5px;
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 10px; /* Reduced input padding */
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 14px; /* Smaller input text */
      transition: border-color 0.3s ease-in-out;
    }

    input:focus,
    textarea:focus,
    select:focus {
      border-color: #ff4b2b;
      outline: none;
    }

    textarea {
      resize: none;
    }

    .add-product-btn {
      grid-column: span 2; /* Stretch button across both columns */
      padding: 10px; /* Reduced button padding */
      background: linear-gradient(90deg, #ff4b2b, #ff416c);
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px; /* Smaller button text */
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.3s ease, background 0.3s ease;
    }

    .add-product-btn:hover {
      transform: scale(1.05);
      background: linear-gradient(90deg, #d84315, #d32f2f);
    }

    /* Responsive Styles */
    @media (max-width: 768px) {
      .add-product-form {
        grid-template-columns: 1fr; /* Single column layout on smaller screens */
        max-width: 100%; /* Full-width form */
        padding: 15px; /* Reduced padding */
      }

      .add-product-form h1 {
        font-size: 18px; /* Smaller title */
      }

      input,
      textarea,
      select {
        font-size: 12px; /* Smaller input text */
      }

      .add-product-btn {
        font-size: 12px; /* Smaller button text */
      }
    }

    @media (max-width: 480px) {
      .add-product-form {
        padding: 10px; /* Further reduced padding for mobile */
      }

      .add-product-form h1 {
        font-size: 16px; /* Smaller title */
      }

      input,
      textarea,
      select {
        font-size: 12px; /* Smaller input text */
      }

      .add-product-btn {
        font-size: 12px; /* Smaller button text */
      }
        `}
      </style>
    </div>
  );
};

export default AddProduct;
