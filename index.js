const express = require("express");
const { Url } = require("./model.js");

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.post("/shorten", async (req, res) => {
    const Original = req.body.Original;
    let shorturl = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //CHecking if user has entered something 
    if (!Original) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // 2. Check if it's a valid format of url
    let parsedUrl;
    try {
        parsedUrl = new URL(Original);
    } catch(error) {
        return res.status(400).json({ error: 'Invalid URL format'});
    }
    try{
        let response= await fetch(parsedUrl.href, {
        method: 'HEAD',timeout:10000});
        if(!response.ok){
            return res.status(400).json({ error: 'URL is not reachable' });
        }
    }
    catch(error){
        return res.status(400).json({ error: 'URL does not exist or is unreachable' });
    }

    let exists = true;

    while (exists) {
        shorturl = "";
        for (let i = 1; i <= 7; i++) {
            shorturl += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const found = await Url.findOne({ shortUrl: shorturl });
        if (!found) {
            exists = false;
        }

    }

    try {
        await Url.create({
            originalUrl: Original,
            shortUrl: shorturl
        })
        res.status(200).json({ msg: "Short URL created successfully", shortUrl: shorturl });
    } catch (err) {
        res.status(500).json({ msg: "Error creating short URL", error: err.message });
    }


})

app.get("/:code", async (req, res) => {
    const code = req.params.code;
    const url = await Url.findOne({ shortUrl: code });
    //res.json(url+" &&&& "+code);
    if (url != null) {
        
        await Url.updateOne({ shortUrl: code }, { visited: url.visited+1 });
        res.redirect(url.originalUrl)
    }
    else {
        res.status(404).json({ msg: "invalid bfgbdgurl" });
    }

})

app.get("/stats/:code", async (req, res) => {
    const code = req.params.code;
    const url = await Url.findOne({ shortUrl: code });

    res.status(200).json({msg:"The url has been visited "+url.visited+" times"});
})

app.listen(3000);