const { Router } = require("express");
const signUpRouter = Router();
const prisma = require("../DB/db.config") ;
const bcrypt = require('bcryptjs');

signUpRouter.post("/", async (req,res)=>{
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await prisma.user.create({
          data: {
            username,
            password : hashedPassword,
          },
        });
    
        res.json({
            success: true,
            message: "User registered successfully. Please log in.",
          });
    } catch (err) {
          console.error("Error in sign-up:", err);
          res.status(500).json({
            success: false,
            message: "An error occurred while signing up. Please try again.",
          });
    }
});

module.exports = signUpRouter ;