const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  console.log(req.body);
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Name: ${req.body.company}</li>
      <li>Name: ${req.body.email}</li>
      <li>Name: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  let transporter = nodemailer.createTransport({ // Authorization
    host: 'imap.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '*********@gmail.com', // generated ethereal user
        pass: '********' // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false // Used for localhost
    }
  });

  // setup email data with unicode symbols - sending to who?
  let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: '*********@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // If successful do something
      res.render('contact', {msg:'Email has been sent'})
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }); 
})

app.listen(3000, () => console.log('Server started'));