const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.set("views",path.join(__dirname,"views"));
const { v4: uuidv4 } = require('uuid');

app.listen(port,()=>
{
    console.log(`Port is listening : ${port}`);
});
let posts=[
    {
        id:uuidv4(),
        username:"Apna College",
        content:"I love coding"
    },
    {
        id:uuidv4(),
        username:"Rahul Kumar",
        content:"I love hardworking"
    },
    {
        id:uuidv4(),
        username:"Madhura Thorat",
        content:"I don't love study"
    }
];

app.get("/posts",(req,res)=>
{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>
{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>
{
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newContent;
    res.redirect("/posts");

})
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>
{
    let {id}=req.params;
    posts=posts.filter((p)=> id!==p.id);
    res.redirect("/posts");
})