import { Schema, model , models} from "mongoose";
import IUser from "./user.interface";


const userSchema = new Schema<IUser>({
    username: {
        type: String
    },
    password: {
        type: String,
    }
})


export default model('User', userSchema)