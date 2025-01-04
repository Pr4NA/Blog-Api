const { Router } = require("express");
const createPostRouter = Router();
const prisma = require("../DB/db.config");
const passport = require("passport");

createPostRouter.get("/", (req, res) => {
  res.json({
    form: {
      title: "Create a new post",
      fields: [
        { name: "title", type: "text", placeholder: "Title of the blog" },
        { name: "body", type: "text" },
        { name: "isPublish", type: "checkbox" },
      ],
    },
  });
});

createPostRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { title, body, isPublish } = req.body;

      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const newPost = await prisma.post.create({
        data: {
          title,
          body,
          isPublish : isPublish === true || isPublish === "true", // Ensure isPublish is stored as a boolean
          user: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });

      res.status(201).json({
        success: true,
        message: "Post added successfully.",
        post: newPost,
      });
    } catch (err) {
      console.error("Error creating post:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = createPostRouter;
