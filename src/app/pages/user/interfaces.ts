export interface IUsuario{
  userName:string,
  role: string,
}

export interface ICrearUsuario extends IUsuario{
  password: string,
}
