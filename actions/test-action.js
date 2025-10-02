"use server";

export const testAction = async ({formData}) => {
    const { name, email } = formData;

    // You can perform any server-side logic here, such as saving to a database
    console.log("Form data received:", { name, email });
  console.log("Test action executed");
  return { success: true, message: "Test action executed successfully" };
};