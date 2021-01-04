import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();

//We will be using the express middleware to handle the routing introduced by postRoutes
// Every route inside of the postRoutes is going to start with /posts.
app.use('/posts', postRoutes);

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

const CONNECTION_URL = "mongodb+srv://hinduBale:bootstrappedUnicorn@testclusterformoviemant.oizsi.mongodb.net/<dbname>?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT,  () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// To make sure we don't get any warnings in the console
mongoose.set('useFindAndModify', false);