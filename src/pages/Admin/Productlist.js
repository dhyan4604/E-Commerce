import React, { useEffect, useState } from "react";
import Header from "./Header";

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
      });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Edit product
  const handleEditClick = (product) => {
    setEditingProduct(product._id);
    setEditedProduct({ ...product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditedProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${editingProduct}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
      const updatedProduct = await response.json();
      setProducts(products.map((product) => (product._id === editingProduct ? updatedProduct : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="productlist-container">
      <Header />
      <h3 className="productlist-title">Products</h3>
      <table className="productlist-table">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Title</th>
            <th>Info</th>
            <th>Category</th>
            <th>Type</th>
            <th>Connectivity</th>
            <th>Final Price</th>
            <th>Original Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) =>
            editingProduct === product._id ? (
              <tr key={product._id}>
                <td>
                  <input
                    type="text"
                    name="brand"
                    value={editedProduct.brand}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="info"
                    value={editedProduct.info}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="type"
                    value={editedProduct.type}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="connectivity"
                    value={editedProduct.connectivity}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="finalPrice"
                    value={editedProduct.finalPrice}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="originalPrice"
                    value={editedProduct.originalPrice}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="imageUrl"
                    value={editedProduct.imageUrl}
                    onChange={handleEditChange}
                  />
                </td>
                <td>
                  <button onClick={saveEditedProduct}>Save</button>
                  <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={product._id}>
                <td>{product.brand}</td>
                <td>{product.title}</td>
                <td>{product.info}</td>
                <td>{product.category}</td>
                <td>{product.type}</td>
                <td>{product.connectivity}</td>
                <td>₹{product.finalPrice}</td>
                <td>₹{product.originalPrice}</td>
                <td>
                <img src={product.imageUrls[0]} alt={product.title} className="product-image" />

                </td>
                <td>
                  {/* <button
                    className="productlist-edit-button"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button> */}
                  <button
                    className="productlist-delete-button"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>


              </tr>
            )
          )}
        </tbody>
      </table>
      <style>
        {`
        
    /* General Container Styling */
    .productlist-container {
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  background-color: #1a1a1a; /* Dark gray background for better contrast */
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
 margin-top: 60px; /* Margin to avoid content overlap with fixed header */
  overflow-x: hidden; /* Prevent horizontal scroll */
}

      .productlist-edit-button,
    .productlist-delete-button {
      padding: 8px 12px;
      font-size: 12px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: transform 0.2s ease, background-color 0.3s ease;
    }

    .productlist-edit-button {
      background-color: #4caf50;
      color: white;
      margin-right: 5px;
    }

    .productlist-edit-button:hover {
      background-color: #45a049;
      transform: scale(1.05);
    }

    .productlist-delete-button {
      background-color: #f44336;
      color: white;
    }

    .productlist-delete-button:hover {
      background-color: #d32f2f;
      transform: scale(1.05);
    }

    /* Page Title Styling */
    .productlist-title {
      font-size: 2rem;
      font-weight: bold;
      color: #ff4b2b; /* Accent color for title */
      margin-bottom: 20px;
      text-transform: uppercase;
      animation: fadeIn 0.8s ease-in-out;
      text-align: center;
    }

    /* Table Styling */
    .productlist-table {
      width: 100%;
      max-width: 1200px;
      border-collapse: collapse;
      margin: 0 auto;
      background: transparent;
      color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 8px 16px rgba(255, 75, 43, 0.2); /* Subtle shadow for table */
    }

    .productlist-table thead tr {
      background-color: rgba(255, 75, 43, 0.2); /* Slight accent for header background */
    }

    .productlist-table thead th {
      padding: 10px;
      font-weight: bold;
      font-size: 14px;
      text-transform: uppercase;
      text-align: left;
    }

    .productlist-table tbody tr {
      transition: background 0.3s ease-in-out;
    }

    .productlist-table tbody tr:nth-child(even) {
      background-color: rgba(255, 255, 255, 0.05); /* Alternate row styling */
    }

    .productlist-table tbody tr:hover {
      background-color: rgba(255, 255, 255, 0.15); /* Hover effect */
    }

    .productlist-table tbody td {
      padding: 10px;
      font-size: 14px;
      text-align: left;
      vertical-align: middle;
    }

    .productlist-table tbody img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .productlist-table tbody img:hover {
      transform: scale(1.1); /* Slight zoom effect on hover */
    }

    /* Fade-In Animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
      .productlist-container {
        padding: 15px;
      }

      .productlist-title {
        font-size: 1.8rem;
      }

      .productlist-table thead th {
        font-size: 12px;
      }

      .productlist-table tbody td {
        font-size: 12px;
      }
    }

    @media (max-width: 768px) {
      .productlist-container {
        padding: 10px;
      }

      .productlist-title {
        font-size: 1.5rem;
      }

      .productlist-table thead th {
        font-size: 10px;
        padding: 8px;
      }

      .productlist-table tbody td {
        font-size: 10px;
        padding: 8px;
      }

      .productlist-table tbody img {
        width: 40px;
        height: 40px;
      }
    }

    @media (max-width: 480px) {
      .productlist-container {
        padding: 8px;
      }

      .productlist-title {
        font-size: 1.2rem;
      }

      .productlist-table thead th {
        font-size: 8px;
        padding: 5px;
      }

      .productlist-table tbody td {
        font-size: 8px;
        padding: 5px;
      }

      .productlist-table tbody img {
        width: 30px;
        height: 30px;
      }

     
        
    }
  `}
      </style>
    </div>
  );
};

export default Productlist;
