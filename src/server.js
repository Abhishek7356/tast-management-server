import app from "./app.js";
import dotenv from "dotenv";
import db from "./config/db.js";


dotenv.config()

const PORT = process.env.PORT || 5000;

db.getConnection()
.then(connection=>{

    console.log("Database connected");
    connection.release();


    app.listen(PORT,()=>{
        console.log(`Server running on ${PORT}`);
    });

})
.catch(err=>{
    console.log(err.message);
});


