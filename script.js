const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use(express.static(__dirname));

let images = [];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post("/api/images", upload.single("image"), (req, res) => {

    const newImage = {
        id: Date.now(),
        title: req.body.title,
        imageUrl: `/uploads/${req.file.filename}`
    };

    images.push(newImage);

    res.json(newImage);
});

app.get("/api/images", (req, res) => {
    res.json(images);
});

app.put("/api/images/:id", (req, res) => {

    const id = parseInt(req.params.id);

    images = images.map(img => {

        if (img.id === id) {
            return {
                ...img,
                title: req.body.title
            };
        }

        return img;
    });

    res.json({
        message: "Updated Successfully"
    });
});

app.delete("/api/images/:id", (req, res) => {

    const id = parseInt(req.params.id);

    images = images.filter(img => img.id !== id);

    res.json({
        message: "Deleted Successfully"
    });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});