import * as chai from 'chai';
import {User} from '../../../src/node/models/user';

describe("User", () => {
    const assert = chai.assert;
    
    it("Validates correct password", () => {
        let user = new User();
        let password: string = 'password';
        user.setPassword(password);
        assert.isTrue(user.validPassword(password));
    });

    it("Fails to validate incorrect password", () => {
        let user = new User();
        let password: string = 'password';
        let incorrectPassword: string = 'incorrectPassword';
        user.setPassword(password);
        assert.isFalse(user.validPassword(incorrectPassword));
    });
});