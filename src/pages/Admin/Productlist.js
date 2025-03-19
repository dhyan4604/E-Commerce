import React, { useEffect, useState } from "react";
import Header from "./Header";
import AddProduct from "../Admin/Addproduct";

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, { method: "DELETE" });
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleSave = async (updatedProduct) => {
    await fetchProducts(); // ✅ Refresh product list
    setEditingProduct(null);
  };

  return (
    <div className="productlist-container">
      <Header />
      <h3 className="productlist-title">Products</h3>

      {editingProduct ? (
        <AddProduct productToEdit={editingProduct} onSave={handleSave} onCancel={() => setEditingProduct(null)} />
      ) : (
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
            {products.map((product) => (
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
                  <button className="productlist-edit-button" onClick={() => handleEditClick(product)}>
                    Edit
                  </button>
                  <button className="productlist-delete-button" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style>
        {`
          /* General Container Styling */
          .productlist-container {
            padding: 20px;
            font-family: 'Poppins', sans-serif;
            background-color: #1a1a1a;
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 60px;
            overflow-x: hidden;
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
            color: #ff4b2b;
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
            box-shadow: 0 8px 16px rgba(255, 75, 43, 0.2);
          }

          .productlist-table thead tr {
            background-color: rgba(255, 75, 43, 0.2);
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
            background-color: rgba(255, 255, 255, 0.05);
          }

          .productlist-table tbody tr:hover {
            background-color: rgba(255, 255, 255, 0.15);
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
            transform: scale(1.1);
          }

          /* Responsive Design */
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
        `}
      </style>
    </div>
  );
};

export default Productlist;
