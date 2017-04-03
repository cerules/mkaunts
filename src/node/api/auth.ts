import * as passport from 'koa-passport';
import * as jwt from 'passport-jwt';
import * as config from 'config';
import {User} from './../models/user';

export function intializePassport(app) { 
    passport.use('jwt', new jwt.Strategy(
    {
        jwtFromRequest: jwt.ExtractJwt.fromAuthHeader(),
        secretOrKey: <string>config.get('jwtSecret'),
    },
    function(jwt_payload, done) {
        User.findOne({email: jwt_payload.sub}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }
));
    app.use(passport.initialize());
}