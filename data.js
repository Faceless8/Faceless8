// data.js
let users = [
    { id: 1, username: 'john_doe', email: 'john.doe@example.com' },
    { id: 2, username: 'jane_smith', email: 'jane.smith@example.com' },
    // Add more users as needed
  ];
  
  module.exports = {
    getAllUsers: () => users,
    getUserById: (id) => users.find(user => user.id === id),
    createUser: (user) => {
      const newUser = { id: users.length + 1, ...user };
      users.push(newUser);
      return newUser;
    },
    updateUser: (id, updatedUser) => {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        return users[index];
      }
      return null; // User not found
    },
    deleteUser: (id) => {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        return deletedUser[0];
      }
      return null; // User not found
    },
  };
  