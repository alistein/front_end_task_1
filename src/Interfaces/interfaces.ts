export interface IForm {
  method?: "POST" | "DELETE" | "PATCH" | "PUT",
}

export interface IFilter {
  fullname: string,
  email: string,
  role: string
}

export interface IData {
  id?: string;
  index?: number;
  fullname: string;
  email: string;
  role: string;
}

export interface IUser extends IData{
    deleteUser: () => void,
    editUser: () => void,
}

export interface IUsers{
    users?: IData[]
    filterUsers?: (filteredUser: IData) => void;
    deleteUserFromList?: (id: string) => void

}