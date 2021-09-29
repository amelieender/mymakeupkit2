const webpush = require("web-push");

const {
  publicVapidKey,
  privateVapidKey,
} = require("../../config/push-notifications");

let pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cxn66AQ9LSY:APA91bFO7fOFerbbAyLwiDHDjvqi4ssluYVf9aKLR7PcDkAG5xXYXIO5-tbYTPhpC-qVIlvHHdO23xF2O1EThZhyeLJrnBA5L9sjqw4dAKbzLZ0r-kx9NIcNi7Hcxs1MeiS0xKUtk88j",
  expirationTime: null,
  keys: {
    p256dh:
      "BCGxcFZEV5WgvIWl4z5SqImKwWaM0odGaG_K45DywL6bPK30cFYbk-hHMmaIE8FHU6uwlsURe1JAHK5nxOWnA1M",
    auth: "yd45xYA7Rsyzm100czOjBA",
  },
};

module.exports = {
  SubscriptionController: {
    subscribe: (req, res) => {
      const subscription = req.body;
      pushSubscription = subscription;
      console.log("subscription", subscription);
      res.status(201).json({ message: "subscription received" });

      webpush.setVapidDetails(
        "mailto:amelie.ender@gmx.de",
        publicVapidKey,
        privateVapidKey
      );
    },
    sendNotification: ({ name, brand }) => {
      webpush.setVapidDetails(
        "mailto:amelie.ender@gmx.de",
        publicVapidKey,
        privateVapidKey
      );
      const payload = JSON.stringify({
        title: `New item in your makeup kit!`,
        content: `${name} by ${brand}`,
      });
      webpush
        .sendNotification(pushSubscription, payload)
        .catch((err) => console.error(err));
      console.log("push notification sent");
      // res.status(201).json({ message: 'push notification sent'});
    },
  },
};
