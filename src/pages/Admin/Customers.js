import React, { useEffect, useState } from 'react';
import Header from './Header';

const Customers = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users'); // Update URL as per your API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data); // Update state with users
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove deleted user from the UI
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Failed to delete user:', err.message);
      alert('Failed to delete user. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <style>
        {`
          .customers-page {
            padding: 20px;
            font-family: 'Poppins', sans-serif;
            background-color: #000;
            color: white;
            min-height: 100vh;
            margin-top: 60px;
          }

          .title {
            font-size: 28px;
            font-weight: bold;
            color: #ff4b2b;
            margin-bottom: 20px;
            text-transform: uppercase;
            animation: fadeIn 0.8s ease-in-out;
          }

          .customers-table {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(255, 0, 0, 0.2);
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          thead {
            background: rgba(255, 255, 255, 0.1);
          }

          th, td {
            text-align: left;
            padding: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            font-size: 14px;
          }

          th {
            color: #ff4b2b;
            text-transform: uppercase;
            font-weight: bold;
          }

          td {
            color: white;
          }

          tbody tr:hover {
            background: rgba(255, 255, 255, 0.15);
            cursor: pointer;
          }

          .delete-btn {
            background-color: #ff4b2b;
            border: none;
            color: white;
            padding: 8px 12px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
          }

          .delete-btn:hover {
            background-color: #e6392e;
          }

          @media (max-width: 768px) {
            th, td {
              font-size: 12px;
              padding: 8px;
            }

            .title {
              font-size: 24px;
            }
          }

          @media (max-width: 480px) {
            th, td {
              font-size: 10px;
              padding: 6px;
            }

            .title {
              font-size: 20px;
            }
          }
        `}
      </style>

      <div className="customers-page">
        <Header />
        <h3 className="mb-4 title">Users</h3>
        <div className="customers-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
