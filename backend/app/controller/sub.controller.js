const webpush = require("web-push");

const {
  publicVapidKey,
  privateVapidKey,
} = require("../../config/push-notifications");

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/dgHEmnqJ50s:APA91bHDAXUPtXBPOuE9UQcFtnuGPVYOvwC0cSXkWsLrJ5l5ZFiLOJFyGutVlAm43KxiSZzsZgv0c2dTy19AfkuaRacZqDIdixVmC7Jd5MiEoh9n5ZHMbf_aAWFKotfsV6aWyacMZScz",
  expirationTime: null,
  keys: {
    p256dh:
      "BMQd_09RImamq3BHgh7s_VDxY81MZ48pCWlk7oVCrvVxMBz--LUicmkwi10K1MH1BNDZaj3wFpXq0xMG1Wb9teo",
    auth: "WJi2HLKnQcHF-5dKNijdaQ",
  },
};

module.exports = {
  SubscriptionController: {
    subscribe: (req, res) => {
      const subscription = req.body;
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
