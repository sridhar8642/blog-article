const express= require('express') ;
const articleRouter=require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const app = express();
const port = 3000;

mongoose.connect(`mongodb+srv://sridhareswar3:sri2003.com@cluster0.dy7wvq9.mongodb.net/blog`, {
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