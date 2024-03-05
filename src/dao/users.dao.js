import UsersModel from './models/users.schema.js';

class UserManagerDAO {
    static async registerUser(first_name, last_name, email, age, password) {
        try {
            const newUser = new UsersModel({first_name, last_name, email, age, password,});
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            throw  error;
        }
    }

    static async findUserByEmail(email) {
        try {
            const user = await UsersModel.findOne({ email });
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default UserManagerDAO;
