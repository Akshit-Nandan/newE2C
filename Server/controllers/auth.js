import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const { name, email, password, role, document, picture } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
      role,
      document,
      picture,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN USER */
// export const Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ msg: "Email and password required!" });

//     const user = await User.findOne({ email: email });
//     if (!user) return res.status(400).json({ msg: "User doesn't exist." });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ msg: "Invalid credentials." });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//     user.password = undefined;
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 3600000),
//       })
//       .status(200)
//       .json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const login = async (req, res) => {
  try {
    console.log(req.body)
    const { applicationId, dob } = req.body;
    if (!applicationId || !dob)
      return res.status(400).json({ msg: "Credentials required!" });

    const student = await Student.findOne({
      "loginDetails.applicationId": applicationId,
      "loginDetails.dob": dob,
    });

    if (!student) return res.status(400).json({
      status: "error",
      message: "Student doesn't exist!",
    });

    const filtered_student = {
      user_id: student._id,
      name: student.personalDetails.studentName.inEnglish,
      picture: student.personalDetails.picture,
      documents: student.documents,
      role: student.role,
      registrationStatus: student.registrationStatus,
    };

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: "success",
      message: "Logged In successfully",
      token,
      data: filtered_student,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
