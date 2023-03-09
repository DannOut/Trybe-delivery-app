const userClient = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  password: "1c37466c159755ce1fa181bd247cb925",
  role: "customer",
  // -- senha: md5('$#zebirita#$')
}

const userSeller = {
  id: 2,
  name: "Fulana Pereira",
  email: "fulana@deliveryapp.com",
  password: "3c28d2b0881bf46457a853e0b07531c6",
  role: "seller",
  // -- senha: md5('fulana@123')
}

module.exports =  {
  userClient,
  userSeller
};