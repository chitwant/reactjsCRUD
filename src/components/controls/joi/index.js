import joi from "joi";

 const validation = joi.object({
  firstname: joi.string().required(),
  lastname: joi.string().required(),
  userName: joi.string().required(),
  email: joi.string().required(),
  password: joi
    .string()
    .pattern(
      new RegExp("^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\\-_]).{8,}$")
    )
    .required()
    .error(
      new Error(
        "Password must contain atleast 8 characters containing 1 uppercase, 1 lowercase and 1 special character "
      )
    ),
});

export default validation;
