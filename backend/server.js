require("dotenv").config();
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});

// Gmail Transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact Form API
app.post("/contact", (req, res) => {

    const { name, email, message } = req.body;

    const sql = "INSERT INTO contact(name,email,message) VALUES(?,?,?)";

    db.query(sql, [name, email, message], (err) => {

        if (err) {
            return res.json({ message: "Database Error" });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "New Portfolio Contact Message",
            text:
`Name: ${name}

Email: ${email}

Message:
${message}`
        };

        transporter.sendMail(mailOptions, (error) => {

            if (error) {
                console.log(error);
                return res.json({
                    message: "Saved in Database but Email Failed"
                });
            }

            res.json({
                message: "Message Sent Successfully"
            });

        });

    });

});

app.listen(3000, () => {
    console.log("Server Running on Port 3000");
    console.log(process.env.DB_USER);
    console.log(process.env.DB_PASSWORD);
});