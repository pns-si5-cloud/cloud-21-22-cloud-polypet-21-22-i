export class EmployeeDTO {

    public constructor(
        private _name: string,
        private _surname: string,
        private _username: string,
        private _password: string,
        private _id?: string,
        )
    {}

    public toJSON(){
        return {name:this.name,
            surname:this.surname,
            username:this.username,
            password:this.password,
        id:this.id}
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get surname(): string {
        return this._surname;
    }
    public set surname(value: string) {
        this._surname = value;
    }
    public get username(): string {
        return this._username;
    }
    public set username(value: string) {
        this._username = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
}