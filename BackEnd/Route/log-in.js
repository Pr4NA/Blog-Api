const { Router } = require("express");
const logInRouter = Router();
const prisma = require("../DB/db.config") ;
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ;


logInRouter.get('/', (req, res) => {
    res.json({
        form: {
          title: 'Login Form',
          fields: [
            { name: 'username', type: 'text', placeholder: 'Enter your username' },
            { name: 'password', type: 'password', placeholder: 'Enter your password' },
          ],
        },
    });
});
  
logInRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ sub: user.id }, "rana", { expiresIn: "24h" });
    res.json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = logInRouter ;