import express from 'express'

const router = express.Router();

router.post("/", (req, res) => {
    const formData = req.body;

    if (!formData || typeof formData !== "object") {
        return res.status(400).json({error: "Invalid payload"});
    }

    // TODO: validate fields properly before saving
    // TODO: persist to database or foward to service

    return res.status(200).json({success: true});
});

export default router;