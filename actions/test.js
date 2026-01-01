"use server";

export const testAction = async (user) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log(user);

  return { success: true };
};
