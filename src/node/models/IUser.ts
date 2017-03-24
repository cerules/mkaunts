export interface IUser {
    email : String,
    hash : String,
    salt : String,
    displayName: String,

    setPassword(password: string) : void,
    validPassword(password: string): boolean,
    generateJWT() : string
};