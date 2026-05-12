const express = require('express');
const connectToDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

require("./config/google")

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());


const routes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.route');

app.use("/users", routes);
app.use("/admin", adminRoutes);


connectToDB();


app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
