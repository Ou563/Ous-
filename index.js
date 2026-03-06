const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Temporary storage for users
let users = {};

app.post("/whatsapp", (req, res) => {
    const incomingMsg = req.body.Body.trim();
    const from = req.body.From;
    const twiml = new twilio.twiml.MessagingResponse();

    // Check if user said "my name is ..."
    const nameMatch = incomingMsg.match(/my name is (\w+)/i);

    if (nameMatch) {
        const name = nameMatch[1];
        users[from] = { name: name, stage: "menu" };
        twiml.message(
`Hi ${name}! 👋
I’m Ous Shop Bot 🤖
These are the goodies we have today:

1️⃣ Clothes
2️⃣ Shoes
3️⃣ Bags

Reply with a number to see products.`
        );
    }
    else if (!users[from]) {
        // Ask for name if unknown
        twiml.message("Hi! What’s your name? (Type 'My name is ...')");
    }
    else if (users[from].stage === "menu") {
        if (incomingMsg === "1") {
            twiml.message(
`👕 Clothes Available:

T-Shirt – KSh 800
Jeans – KSh 1500

Reply BUY to order`
            );
        }
        else if (incomingMsg === "2") {
            twiml.message(
`👟 Shoes Available:

Sneakers – KSh 3500
Official Shoes – KSh 4000

Reply BUY to order`
            );
        }
        else if (incomingMsg === "3") {
            twiml.message(
`👜 Bags Available:

Handbag – KSh 1200
Backpack – KSh 2000

Reply BUY to order`
            );
        }
        else if (incomingMsg.toLowerCase() === "buy") {
            twiml.message(
`✅ Great, ${users[from].name}!

Please send:
1. Product name
2. Size
3. Delivery location`
            );
        }
        else {
            twiml.message(`Type 1, 2, or 3 to see products, ${users[from].name} 🛒`);
        }
    }

    res.writeHead(200, { "Content-Type": "text/xml" });
    res.end(twiml.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Bot running on port " + PORT);
});
