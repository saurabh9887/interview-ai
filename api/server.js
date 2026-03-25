import connectToDB from "./src/config/db.js";
import app from "./src/app.js";

connectToDB();

app.listen(5000, console.log("Server is listening at port 5000"));
