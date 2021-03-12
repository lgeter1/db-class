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
    database: "projectone"
};

const pool = new Pool(config);


app.listen(app.get("port"), () => {
    console.log(`Find the server at http://localhost:${app.get("port")}`);
});

 
app.get("/api", async (req, res) => {
    try {
    	let check = ""; 

    	
        
        if (req.query.workshop == null){
         	check = "SELECT workshops FROM workshop WHERE workshops IS NOT NULL";
             const response = await pool.query(check);
              const results = response.rows.map(function(item){
                return item.workshops;
              });
             res.json({workshops: results});

        }else
        	check = "SELECT distinct attendees FROM workshop WHERE workshops = $1";

          const response = await pool.query(check, [req.query.workshop]);

        if(response.rowCount == 0) {
        	res.json({error: "workshop not found"});
        }else{
        
           const results = response.rows.map(function(item) {
                	return item.attendees;
        	});

            	res.json({attendees: results});
            
       }

    
    }catch(err){
    	console.log(err);
    	res.json({status: "error"});
    }
});

app.post("/api", async(req, res) => {
    const attendee= req.body.attendee;
    const workshop = req.body.workshop;
	console.log(req.body);
    try {
        
       	if (!req.body.attendee && !req.body.workshop) {
       		res.json({error: 'parameters not given'});
       	} else {
       	       		const template = "SELECT * FROM workshop WHERE attendees = $1 AND workshops = $2";

       		const response = await pool.query(template, [req.body.attendee, req.body.workshop]);
	        
	        
           console.log(response.rows);

           
	        if (response.rowCount == 0){
	        
	        	const template2 = "INSERT INTO workshop (workshops,attendees) VALUES ($1, $2)"; 
	        	const response = await pool.query(template2, [workshop, attendee]);
	 		 	res.json({attendee: attendee,workshop: workshop});
	        }else{ 
	        	res.json({error: 'attendee already enrolled'});
	        }
        }
      } catch (err) {
      	console.log(err);
        res.json({error: 'error'});
	  }
   
});//{{URL}}/api?workshop=DevOps1


//app.listen(app.get("port"), () => {
//	console.log(`Find the server at http://localhost:${app.get("port")}`);
	 // eslint-disable-line no-console
//});




