const bcrypt = require('bcrypt')

bcrypt.hash('admin.prisma@1789', 10, (err, hash) => {
  console.log(hash)
})

