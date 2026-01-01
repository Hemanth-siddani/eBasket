import bcrypt from "bcrypt";

export const hashPassword = async (user_password) => {
    console.log("hashPassword triggered..! : ",user_password);
    const salt_rounds = 10;
    return await bcrypt.hash(user_password,salt_rounds);
}

export const comparePassword = async (user_password,hash_code) => {
    console.log("comparePassword triggered..! : ");
    return await bcrypt.compare(user_password,hash_code);
}