const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;
// const token = process.env.token;

try {
  const decoded = jwt.verify({token}, secretKey, {} ((err, foundUser)=>{
    if(err){
        console.log(err, err);
    }
    res.json({foundUser})
  }));
  // Token is valid
  console.log(decoded);
} catch (error) {
  // Token is invalid or malformed
  console.error(error);
}

// jwt.verify(token, 'shhhhh', function(err, decoded) {
//     console.log(decoded.foo) // bar
//   });
