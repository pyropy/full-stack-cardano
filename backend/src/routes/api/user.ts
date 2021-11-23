import config from "config";
import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
// router.post(
//   "/",
//   [
//     check("email", "Please include a valid email").isEmail(),
//     check(
//       "password",
//       "Please enter a password with 6 or more characters"
//     ).isLength({ min: 6 })
//   ],
//   async (req: Request, res: Response) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res
//         .status(HttpStatusCodes.BAD_REQUEST)
//         .json({ errors: errors.array() });
//     }

//     const registrationEnabled = config.get('registrationEnabled');

//     if (!registrationEnabled) {
//       return res.status(HttpStatusCodes.BAD_REQUEST).json({
//         errors: [
//           {
//             msg: "Registrations have been disabled."
//           }
//         ]
//       })
//     }

//     const { email, password } = req.body;
//     try {
//       let user: IUser = await User.findOne({ email });

//       if (user) {
//         return res.status(HttpStatusCodes.BAD_REQUEST).json({
//           errors: [
//             {
//               msg: "User already exists"
//             }
//           ]
//         });
//       }

//       const salt = await bcrypt.genSalt(10);
//       const hashed = await bcrypt.hash(password, salt);

//       // Build user object based on IUser
//       const userFields = {
//         email,
//         password: hashed,
//       };

//       user = new User(userFields);

//       await user.save();

//       const payload: Payload = {
//         userAddr: user.id
//       };

//       jwt.sign(
//         payload,
//         config.get("jwtSecret"),
//         { expiresIn: config.get("jwtExpiration") },
//         (err, token) => {
//           if (err) throw err;
//           res.json({ token });
//         }
//       );
//     } catch (err) {
//       console.error(err.message);
//       res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
//     }
//   }
// );

export default router;
