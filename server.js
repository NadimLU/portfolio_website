const express = require('express');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');



var app = express();
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {

    res.render('main/home.hbs', {
        pageTitle : 'Portfolio || MH NADIM',
        authorNameFull: 'Mohammad Mahmudul Haque Nadim',
        authorNameShort: 'M H Nadim',
        authorDesignationOne: 'Software Engineer',
        authorDesignationTwo: 'Web Developer',
        
    });
});


app.use(bodyParser.urlencoded({
    extended: true
}));


app.post('/contactdata',  function(req, res){
    
    var Sendername = req.body.user.name;
    var SemderEmail = req.body.user.email;
    var Message = req.body.user.message ;
   
    
    // response.json("Success");
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, //true --> will use ssl
        auth: {
            user: 'nadimcse.official@gmail.com',
            pass: 'abba1952'
        }
    });

    var mailOptions = {
        from: SemderEmail,
        to: 'na146363@gmail.com',
        subject: 'Contact Request',
        text: Message,
        html: '<b>'+ Message +'Sender Email Address is </br> '+ SemderEmail +'</b>'
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
        transporter.close();
    });
 

   
    

   
});






app.listen(port, () => {
    console.log(`Started on port: ${port}`);
});



module.exports = { app };

