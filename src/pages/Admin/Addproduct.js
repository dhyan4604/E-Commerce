import React, { useState } from 'react';
import Sidebar from './Sidebar';



const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', productData);
    alert('Product added successfully!');
  };

  return (
    <div>
      <style>
        {`
          .add-product-page {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #000; /* Black background */
            font-family: 'Poppins', sans-serif;
          }
          .add-product-form {
            background: rgba(255, 255, 255, 0.1);
            padding: 35px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
            width: 100%;
            max-width: 500px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: fadeIn 0.8s ease-in-out, floatUp 1.5s infinite alternate;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes floatUp {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-8px);
            }
          }
          .add-product-form h1 {
            text-align: center;
            margin-bottom: 20px;
            color: white;
            font-size: 24px;
            font-weight: bold;
            animation: fadeIn 1s ease-in-out;
          }
          .form-group {
            margin-bottom: 20px;
            text-align: left;
          }
          label {
            display: block;
            font-size: 14px;
            color: white;
            font-weight: bold;
            margin-bottom: 5px;
          }
          input,
          textarea,
          select {
            width: 100%;
            padding: 12px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 16px;
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
            width: 100%;
            padding: 12px;
            background: linear-gradient(90deg, #ff4b2b, #ff416c);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s ease, background 0.3s ease;
          }
          .add-product-btn:hover {
            transform: scale(1.05);
            background: linear-gradient(90deg, #d84315, #d32f2f);
          }
        `}
      </style>

      <div className="add-product-page">
      <Sidebar />
        <form className="add-product-form" onSubmit={handleSubmit}>
          <h1>Add Product</h1>
          <div className="form-group">
            <label>Product Name:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Brand:</label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Product Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="add-product-btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
