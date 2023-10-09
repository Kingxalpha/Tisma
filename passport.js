// const passport = require('passport');
// const passportJwt = require('passport-jwt');
// const ExtractJwt = passportJwt.ExtractJwt;
// const JwtStrategy = passportJwt.Strategy;
// const User = require('./model/User');

// passport.use(new JwtStrategy({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: process.env.TOKEN_SECRET,
// }, (jwtPayload, done) => {
//     User.findOne({ where: { id: jwtPayload.id } })
//         .then((user) => {
//             if (user) {
//                 return done(null, user);
//             } else {
//                 return done(null, false);
//             }
//         })
//         .catch((err) => {
//             return done(err, false);
//         });
// }));

// // Export the authenticateJWT middleware
// module.exports = passport.authenticate('jwt', { session: false });
