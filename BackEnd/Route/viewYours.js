const { Router } = require("express");
const prisma = require("../DB/db.config");
const passport = require("../passport.config");

const viewYoursRouter = Router();

viewYoursRouter.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const userId = req.user.id;

    const yourPosts = await prisma.post.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(yourPosts);
  } catch (err) {
    console.error("Error fetching user's posts:", err.message);
    res.status(500).json({ message: "Failed to fetch your posts. Please try again later." });
  }
});

module.exports = viewYoursRouter;
