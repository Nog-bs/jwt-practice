const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // req.body

// ---- ROUTES -----
// create a anime
app.post("/new", async (req, res) => {
    try {
        const { description } = req.body;
        const newAnime = await pool.query(
            "INSERT INTO anime (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newAnime.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// get all anime
app.get("/anime", async (req, res) => {
    try {
        const allAnime = await pool.query("SELECT * FROM anime");
        res.json(allAnime.rows);
    } catch (error) {
        console.log(error.message);
    }
});

// get a anime
app.get("/anime/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const anime = await pool.query(
            "SELECT * FROM anime WHERE anime_id = $1",
            [id]
        );
        res.send(anime.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
});

// update an anime
app.put("/anime/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateAnime = await pool.query(
            "UPDATE anime SET description = $1 WHERE anime_id = $2",
            [description, id]
        );
        res.json("Anime was updated");
    } catch (error) {
        console.error(error.message);
    }
});

// delete an anime
app.delete("/anime/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAnime = await pool.query(
            "DELETE FROM anime WHERE anime_id = $1",
            [id]
        );
        res.json("Anime was deleted");
    } catch (err) {
        console.error(error);
    }
});

app.listen(5000, () => {
    console.log(" -------- Server has started on port 5000 --------");
});
