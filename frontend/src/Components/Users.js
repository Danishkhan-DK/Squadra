import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); 
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Fetch registered users
  const fetchUsers = () => {
    fetch('http://localhost:5000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => alert('Error fetching users'));
  };

  // Update user data
  const handleUpdate = () => {
    if (!editUser) return;

    fetch(`http://localhost:5000/users/${editUser._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User updated successfully') {
          alert('User updated successfully!');
          setEditUser(null); 
          setName('');
          setPhone('');
          fetchUsers(); 
        } else {
          alert(data.message || 'Error updating user');
        }
      })
      .catch((error) => alert('Error during update'));
  };

    // Delete user
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
          fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.message === 'User deleted successfully') {
                alert('User deleted successfully!');
                fetchUsers(); // Refresh the user list
              } else {
                alert(data.message || 'Error deleting user');
              }
            })
            .catch((error) => {
              console.error('Error during deletion:', error);
              alert('Error during deletion');
            });
        }
      };

  return (
    <div>
      <button onClick={fetchUsers}>Show Registered Users</button>

      {users.length > 0 && (
        <div>
          <h2>Registered Users</h2>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Profession</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.profession}</td>
                  <td>
                    <button onClick={() => {
                      setEditUser(user);
                      setName(user.name);
                      setPhone(user.phone);
                    }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editUser && (
        <div>
          <h3>Edit User</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          /><br />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Users;
