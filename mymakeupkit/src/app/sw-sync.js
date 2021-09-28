importScripts("./ngsw-worker.js");
importScripts("dexie.min.js");

const db = new Dexie("MakeupDBSync");
db.version(1).stores({
  makeupSync:
    "id, productname, brandname, category, opened, durability, image, latitude, longitude",
});
db.open();

function getSyncData() {
  return db.makeupSync.toArray();
}

function deleteSyncData(id) {
  return db.makeupSync.delete(id);
}

self.addEventListener("sync", (event) => {
  console.log("service worker --> background syncing ...", event);
  if (event.tag === "sync-new-post") {
    console.log("service worker --> syncing new posts ...");
    event.waitUntil(
      getSyncData().then((dataArray) => {
        for (let data of dataArray) {
          console.log("data from IndexedDB", data);
          // diese Daten an das Backend senden (siehe Fallback)
          fetch("http://localhost:3000/makeup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              if (res.ok) {
                deleteSyncData(data.id);
              }
            })
            .catch(console.error);
        }
      })
    );
  }
});

self.addEventListener("push", (event) => {
  console.log("push notification received", event);
  let data = { title: "Test", content: "Fallback message" };
  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  let options = {
    body: data.content,
    icon: "/assets/icons/kiss96.png",
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});
