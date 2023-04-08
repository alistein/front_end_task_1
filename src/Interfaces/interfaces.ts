export interface IForm {
  postData: (data: IData) => void;
  editData?: (index: number, data: IData) => void;
}

export interface IData {
  id: string;
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
    deleteUserFromList?: (id: string) => void
    editUserFromList?: (id: string) => void
}