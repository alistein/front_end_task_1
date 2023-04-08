export interface IForm {
  postData: (data: IData) => void;
  editData?: (id: string, data: IData) => void;
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