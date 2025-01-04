const { Router } = require("express");
const publishPostRouter = Router();
const prisma = require("../DB/db.config");
const passport = require("../passport.config") ;

publishPostRouter.put("/:postId/publish", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { postId } = req.params;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const post = await prisma.post.findUnique({
      where: { id: parseInt(postId, 10) },
    });

    if (!post || post.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(postId, 10) },
      data: { isPublish: true },
    });

    res.status(200).json({
      success: true,
      message: "Post published successfully.",
      post: updatedPost,
    });
  } catch (err) {
    console.error("Error publishing post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = publishPostRouter;