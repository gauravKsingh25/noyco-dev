const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel'); 


const updateName = async (req, res) => {
  try {
    const { newName, email } = req.body;

    if (!newName) {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const user = await User.findByIdAndUpdate(email, { name: newName }, { new: true });

    return res.status(200).json({
      message: 'Name updated successfully.',
      user: {
        name: user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Controller to update User's Email
// const updateEmail = [
//   // Validation for email
//   body('email').isEmail().withMessage('Please provide a valid email address.'),

//   async (req, res) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const { newEmail } = req.body;

//       if (!newEmail) {
//         return res.status(400).json({ message: 'Email is required.' });
//       }

//       // Check if email already exists
//       const existingUser = await User.findOne({ email: newEmail });
//       if (existingUser) {
//         return res.status(400).json({ message: 'Email is already in use.' });
//       }

//       const user = await User.findByIdAndUpdate(req.user.id, { email: newEmail }, { new: true });

//       return res.status(200).json({
//         message: 'Email updated successfully.',
//         user: {
//           email: user.email,
//         },
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Server error.' });
//     }
//   },
// ];

// Controller to update User's Password
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword , email} = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Both current and new passwords are required.' });
    }

    const user = await User.findById(email);

    // Check if current password matches the stored password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password.' });
    }

    // Hash the new password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { updateName, updateEmail, updatePassword };
