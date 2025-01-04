const { Router } = require("express");
const prisma = require("../DB/db.config") ;
const passport = require("../passport.config") ;

const viewAllRouter = Router();

viewAllRouter.get("/",passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const userId = req.user?.id;
    
    const allPosts = await prisma.post.findMany({
      where: {
        OR: [
          { isPublish: true },
          { userId: userId || undefined }, // Include user's posts if userId is defined
        ],
      },
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

    res.json(allPosts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = viewAllRouter;
