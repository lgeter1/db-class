require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("port", 8080);
app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

const Pool = require("pg").Pool;
const config = {
	    host: process.env.DB_HOST,
	    user: process.env.DB_USER,
	    password: process.env.DB_PASS,
	    database: "projecttwo"
};

const pool = new Pool(config);
var dateFormat = require('dateformat');

app.listen(app.get("port"), () => {
	    console.log(`Find the server at http://localhost:${app.get("port")}`);
});

app.post("/create-user", async(req,res) => {
const user = req.body.username;
	const first = req.body.firstname;
	const last = req.body.lastname;
	const email = req.body.email;

	try{
		const check = "SELECT * FROM userform WHERE username = $1";
		const response = await pool.query(check, [user]);
		if(response.rowCount != 0)
		{
			res.json({status: "username taken"});
		}
		else{
			const template = "INSERT INTO userform (username, firstname, lastname, email) VALUES ($1, $2, $3, $4)";
			const response2 = await pool.query(template, [user, first, last, email]);
			res.json({status: "user added"});
		}
	}
	catch (err){
		console.log(err);
	}

});

app.get("/list-users", async(req,res) => {
try{
	if(req.query.type == 'full'){
		const check = "SELECT * FROM userform";
		const response = await pool.query(check);
		const results = response.rows.map((row) => {return row});
		res.json({users: results});
	}
	if(req.query.type == 'summary'){
		const check2 = "SELECT firstname, lastname FROM userform";
		const response2 = await pool.query(check2);
		const results2 = response2.rows.map((row) => {return row});
		res.json({users: results2});
	}

}
catch(err)
{
	console.log(err);
}

});

app.delete("/delete-user", async(req,res) => {

const user = req.body.username;
	try{
		const check = "DELETE FROM userform WHERE username = $1";
		const response = await pool.query(check, [user]);
		return res.json({status: "deleted"});
	}
	catch(err)
	{
		console.log(err);
	}
});


app.post("/add-workshop", async(req,res) => {
const title = req.body.title;
	const date = req.body.date;
	const location = req.body.location;
	const maxseats = req.body.maxseats;
	const instructor = req.body.instructor;

	try{
		const check = "SELECT * FROM workshop WHERE title = $1 AND date = $2 AND location = $3 AND maxseats = $4 AND instructor = $5";
		const temp = await pool.query(check, [title, date, location, maxseats, instructor]);
		if(temp.rowCount !=0) {
			res.json({status: "workshop already in database"});
		}
		else{
			const check2 = "INSERT INTO workshop(title, date, location, maxseats, instructor) VALUES ($1,$2,$3,$4,$5)";
			const temp2 = await pool.query(check2, [title, date, location, maxseats, instructor]);
			res.json({status: "workshop added"});
		}

	}
	catch(err)
	{
		console.log(err);
	}
});


app.post("/enroll", async(req,res) => {
const title = req.body.title;
const date = req.body.date;
const location = req.body.location;
const maxseats = req.body.maxseats;
const user = req.body.username;
try{
		const check = "SELECT username FROM userform WHERE username = $1";
		const temp = await pool.query(check, [user]);
	if(temp.rowCount == 0){
		res.json({status: "user not in database"});
		}
	else{
			const check2 = "SELECT attendeeid, maxseats FROM workshop WHERE title = $1 AND date = $2 AND location = $3";
			const temp2 = await pool.query(check2, [title, date, location]);
		if(temp2.rowCount == 0){
				res.json({status: "workshop does not exist"});
			}
		else{
				const maxseats = temp2.rows[0].maxseats;
			
			const workshopid = temp2.rows[0].attendeeid;
		
			//const workshopid = req.body.workshopid;
				const check3 = "SELECT username, workshopid FROM attendees WHERE username = $1 AND workshopid = $2";
				const temp3 = await pool.query(check3, [user, workshopid]);
				console.log("checking enrolled");
			if(temp3.rowCount !=0){
					res.json({status: "user already enrolled"});
				}
			else{
					const check4 = "SELECT * FROM attendees WHERE workshopid = $1";
					const temp4 = await pool.query(check4, [workshopid]);
				if(temp4.rowCount >= maxseats){
						res.json({status: "no seats available"});
					}
				else{
console.log(workshopid);
					const check5 = "INSERT INTO attendees (username, workshopid) VALUES ($1, $2)";
						const temp5 = await pool.query(check5, [user, workshopid]);
						res.json({status: "user added"});
					}
				}
			}
		}
}
catch(err){
console.log(err);
}
});

app.get("/list-workshops", async (req,res) => {
try{
	const query = "SELECT title, date, location FROM workshop";
	const response = await pool.query(query);
	const results = response.rows.map((row) => {
		return {title: row.title,
			date: dateFormat(row.date, "isoDate"),
			location: row.location}
	});
res.json({"workshops": results});
}
catch(err)
{
	console.log(err);
}
});

app.get("/attendees", async(req,res) => {
const title = req.query.title;
	const date = req.query.date;
	const location = req.query.location;
		
	try{
		const query = "SELECT firstname, lastname FROM workshop JOIN attendees ON attendeeid = attendees.workshopid JOIN userform ON userform.username = attendees.username WHERE workshop.title =$1 AND workshop.date =$2 AND workshop.location = $3";
		const response = await pool.query(query, [title,date, location]);
//		console.log(response); 
		if(response.rowCount != 0){
		const results = response.rows.map((row) => {return row });
		res.json({"attendees": results});
		}
		else {
			res.json({"error": "workshop does not exist"});
		}

		
	}
	catch(err)
	{
		console.log(err);
	}
});

