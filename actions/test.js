"use server";

export const testAction = async (user) => {
  console.log(user);

  return { success: true };
};
