import users from "../db/users.js";
import { createUser } from "../resources/Users/user.service.js";

const resolvers =  {
        Query: {
          users: () => users(),
        },
        Mutation: {
          createUser: async (_:any, {input}:any) => {
              const res = await createUser(input.username, input.password)
              console.log(res)
              return res
          }
        }
}
export default resolvers