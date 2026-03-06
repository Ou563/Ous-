const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/whatsapp", (req, res) => {

const msg = req.body.Body.toLowerCase();
const twiml = new twilio.twiml.MessagingResponse();

if (msg === "hi" || msg === "hello") {

twiml.message(`Welcome to Dakecy Fashion Store 🛍️

Reply with a number:

1️⃣ Clothes
2️⃣ Shoes
3️⃣ Bags
4️⃣ Contact`);

}

else if (msg === "1") {

twiml.message(`Clothes Available 👕

T-shirts – KSh 800
Jeans – KSh 1500

Reply BUY to order`);

}

else if (msg === "2") {

twiml.message(`Shoes Available 👟

Sneakers – KSh 3500
Official shoes – KSh 4000

Reply BUY to order`);

}

else if (msg === "buy") {

twiml.message(`Great 👍

Send:
1. Product name
2. Size
3. Delivery location`);

}

else {

twiml.message("Type HI to start shopping 🛍️");

}

res.writeHead(200, {"Content-Type": "text/xml"});
res.end(twiml.toString());

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log("Bot is running");
});
