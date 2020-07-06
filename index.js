const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

const PORT = 8000;
server.listen(PORT , () => console.log(`server ${PORT}`))

let users  = [
    {
        id: shortid.generate(),
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane"  // String, required
    },
    {
        id: shortid.generate(),
        name: "Jane Doe 2",
        bio: "Not Tarzan's Wife, another Jane 2"
    },
    {
        id: shortid.generate(),
        name: "Jane Doe 3",
        bio: "Not Tarzan's Wife, another Jane 3"
    },

]

server.get("/", (req , res)=>{
    res.status(200).send("<h3>Get / Test </h3>")
})

server.post("/api/users", (req,res)=>{
    const newUser = req.body

    if(newUser.name && newUser.bio){
        newUser.id = shortid.generate();
        users.push(newUser);
        res.status(201).json(newUser)
    } else if(!newUser.name || !newUser.bio){
        res.status(400).json({errorMessage:"Please provide name and bio for the user."})
    } else {
        res.status(500).json({errorMessage:"There was an error while saving the user to the database"})
    }

})

server.get("/api/users" , (req, res)=>{
    if(users.length > 0){
        res.status(200).json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved" })
    }
})
server.get("/api/users/:id" , (req, res)=>{
    let userId = req.params.id

    if(userId){
        res.status(200).json(users[userId])
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved"})
    }
})
