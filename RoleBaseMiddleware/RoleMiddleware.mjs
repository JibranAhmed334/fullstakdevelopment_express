import usermodel from "../models/user.model.mjs"

const roleMiddleware = (...role) => {
  return async (req, res, next) => {
    const roleExsits = await usermodel.findOne({ role: req.user.role })


    if (!roleExsits) {
      return res.status(401).json({ message: "Unsufficents role" });
    }
const user = await usermodel.findById(roleExsits._id)

if (!role.includes(user.role)){
    return res.status(401).json({message:`connot access with this role`})

}
next();
}
}

export default roleMiddleware