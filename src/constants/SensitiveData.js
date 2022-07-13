const UserSensitiveData = [
    // The following are sensitive data that should not be return to the client.
    // The salt should not return to the client.
    // The hash should not return to the client.
    // The password should not return to the client
    "passwordSalt",
    "passwordHash",
    "password",
];

export default UserSensitiveData;
