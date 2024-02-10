const Queue = require("../lib/queue");

const connected = (G, s, r) => {
  if (!Object.keys(G).length) {
    return false;
  }
  if (s === r) {
    return true;
  }
  const enqueued = [s];
  const discovered = new Queue();
  discovered.enqueue(s);
  while (discovered.first) {
    let user = discovered.dequeue();
    for (let followedUser of G[user]) {
      if (followedUser === r) {
        return true;
      }
      if (!enqueued.includes(followedUser)) {
        enqueued.push(followedUser);
        discovered.enqueue(followedUser);
      }
    }
  }
  return false;
};

module.exports = connected;
