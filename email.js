const express = require("express");

const nodemailer = require("nodemailer");

const bodyParser = require("body-parser");

require("dotenv").config();

// const {
//   body,
//   validationResult
// } = require("express-validator");

const ejs = require("ejs");



const app = express();

app.set('view engine', 'ejs');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("public"));



app.get("/", function (request, response) {
  response.render("index");
});

app.get("/success", function (req, res) {
  res.render(__dirname + "/success.html");
});

app.post(
  "/",
  // [
  //   // body() is used to validate each field of form according to the conditions
  //   body("email", "Must be a valid email of 5 to 30 chars").isEmail(),
  //   body("firstname", "Please Input your Full Name").isLength({
  //     min: 5,
  //   }),
  //   body("message", "Please Input your Message").isLength({
  //     min: 5,
  //   }),
  // ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    // If error occurs, handel it here

    // res.send("<h1>Please fill out the required field</h1>");

    function validator(data) {

      var x = data.firstname;

      let alert = {

      }
      if (x == "") {

        alert.firstNameErr = "Name must be filled out"

      }

      var y = data.email;
      if (y == "") {

        alert.email = "Must be a valid email of 5 to 30 chars"

      }

      var z = data.message;
      if (z == "") {

        alert.message = "Please Input your Message"

      }

      return alert;

    }


    const valerror = validator(req.body);


    if (Object.entries(valerror).length !== 0) {


      res.render("index",
        valerror
      );


    } else {
      // If no error occurs
      // console.log("Continue with your operations!")
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_EMAIL_PASSWORD,
        },
      });

      var mailOptions = {
        from: '"VAAL DIGITAL" noreply@gmail.com',
        to: "victorifeanyichukwu4@gmail.com, info@vaaldigital.com",
        subject: "Contact form",
        html: `<p>Email: ${req.body.email}</p>
    <p>Full Name: ${req.body.firstname}</p>
        <p>Message: ${req.body.message}</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {

          const smessage = "Email sent successfully"

          res.render("index", {
            smessage
          });



        }
      });
    }



  }
);

app.listen(4000, function () {
  console.log("Server started on port 4000");
});