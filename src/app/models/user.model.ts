/* export interface User {
  id?: string;
  role?:string;
  name?: string;
  lastname?: string;
  password?: string;
  email: string;
} */


export class User {

  constructor(_id = "", role = "USER_ROLE", nombre="", password = "", email = "") {
    this._id = _id;
    this.role = role;
    this.nombre = nombre;
    this.password = password;
    this.email = email;
  }

  _id: string;
  nombre: string;
  email: string;
  password:string;
  role:string;
}
