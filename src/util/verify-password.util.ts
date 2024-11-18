import * as bcrypt from 'bcrypt';
export const verifyPassword = async (
  password: string,
  hashPassword: string,
): Promise<string> => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (err) {
    console.error(err);
    throw new Error('Can not hash password.');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.error(err);
    throw new Error('Can not hash password.');
  }
};
