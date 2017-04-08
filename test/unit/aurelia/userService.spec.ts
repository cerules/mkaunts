import { UserService } from './../../../src/aurelia/services/userService';


describe("UserService", () => {
    const assert = chai.assert;

    it("Sets user after login", (done) => {
        const user = {
            _id: 1,
            email: 'test@test.com',
            displayName: 'test'
        }
        const dataServiceMock = {
            login: (email: string, password: string) => {
                return Promise.resolve();
            },
            whoAmI: () => {
                return Promise.resolve(user);
            }
        }
        const userService = new UserService(<any>dataServiceMock);
        userService.login('email', 'password')
            .then(() => {
                assert.equal(userService.user, user);
                done();
            })
    });
});