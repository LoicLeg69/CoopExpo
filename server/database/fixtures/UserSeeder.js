// const argon2 = require('argon2');
// const AbstractSeeder = require("./AbstractSeeder");

// const hashingOptions = {
//   type: argon2.argon2id,
//   memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
//   timeCost: 2,
//   parallelism: 1,
// };

// class UserSeeder extends AbstractSeeder {
//   constructor() {
//     // Call the constructor of the parent class (AbstractSeeder) with appropriate options
//     super({ table: "user", truncate: true });
//   }
  
//   // The run method - Populate the 'user' table with fake data
//   async run() {
//     // Generate and insert fake data into the 'user' table
//     for (let i = 0; i < 10; i += 1) {
//       // Generate fake user data

//       /* eslint-disable no-await-in-loop */
//       const hashedPassword = await argon2.hash("toto1234", hashingOptions); // Hash the password using Argon2


//       const fakeUser = {
//         username: `user_${i}`, // Create a reference name for the user
//         mail: this.faker.internet.email(), // Generate a fake mail using faker library
//         password: hashedPassword, // Use the hashed password
//       };

//       // Insert the fakeUser data into the 'user' table
//       await this.insert(fakeUser); // insert into user(username, mail, password) values (?, ?, ?)
//     }
//   }
// }

// // Export the UserSeeder class
// module.exports = UserSeeder;


const argon2 = require('argon2');
const AbstractSeeder = require("./AbstractSeeder");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10, // 19 MiB en KiB (19 * 1024 KiB)
  timeCost: 2,
  parallelism: 1,
};

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "user", truncate: true });
  }

  // The run method - Populate the 'user' table with predefined data
  async run() {
    const users = [
      { username: 'john_doe', mail: 'john.doe@example.com', password: 'password123' },
      { username: 'jane_doe', mail: 'jane.doe@example.com', password: 'password123' },
      { username: 'alice', mail: 'alice@example.com', password: 'password123' },
      { username: 'bob', mail: 'bob@example.com', password: 'password123' },
      // Ajoutez plus d'utilisateurs ici si nécessaire
    ];

    // Insert each user into the database
    await Promise.all(users.map(async (user) => {
      const hashedPassword = await argon2.hash(user.password, hashingOptions); // Hash the password using Argon2
      const normalUser = {
        username: user.username,
        mail: user.mail,
        password: hashedPassword,
      };
      await this.insert(normalUser);
    }));
  }
}

// Export the UserSeeder class
module.exports = UserSeeder;
