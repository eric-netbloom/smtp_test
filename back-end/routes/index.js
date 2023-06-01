var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/config');

var transport = {
  host: 'mx1.sitehost.co.nz',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
 
  let name = req.body.name
  let email = req.body.email
  let msg = req.body.message
  let content = `name: ${name} \n email: ${email} \n message: ${msg} `

  let mail = {
    from: name,
    to: 'eric@netbloom.co.nz',  //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text:content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
