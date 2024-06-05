const express= require('express') ;
const articleRouter=require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const methodOverride = require('method-override');


const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.dy7wvq9.mongodb.net/blog`, {
    // Remove the useNewUrlParser and useUnifiedTopology options
});


app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));


app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({date_created:'desc'});
    res.render('articles/index',{articles:articles});
});
app.use('/articles',articleRouter);
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});