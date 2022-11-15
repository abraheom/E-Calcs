/*Dependencias*/
let port = process.env.PORT || 8080;
let colors = require("colors");
let http = require("http");
let express = require("express");

/*Express Server*/
let app = express();
app.use(express.static(__dirname+"/views"));
app.set("views",__dirname+"/views");

app.get("/pug",(req,res)=>{
	res.render("pug.pug");
});

let server = http.createServer(app);
server.listen(port,()=>{
	console.log("Server listening on port: "+(server.address().port).toString().green);
});


/*Socket.io*/
let io = require("socket.io").listen(server);
io.sockets.on("connect", (sock) => {
	console.log("Socket ID: "+ sock.id.toString().green);
});
