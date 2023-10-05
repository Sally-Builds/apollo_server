import userModel from "./user.model";
import IUser from "./user.interface";


export const createUser = async(username: string, password: string): Promise<IUser> => {
    try {
        const user = await userModel.create({username, password})

        return user
    } catch (error:any) {
        console.log(error)
        throw new Error("sth went wrong")
    }
}