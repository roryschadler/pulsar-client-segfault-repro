const Pulsar = require("pulsar-client");
const SegfaultHandler = require("segfault-handler");

SegfaultHandler.registerHandler("test-crash.log");

NUM_ITS = 400;

const its = Array.from({ length: NUM_ITS }, (_, i) => i);

(async () => {
  const d = await Promise.all(
    its.map(async () => {
      const client = new Pulsar.Client({
        serviceUrl: "pulsar://localhost:6650",
      });
      const reader = await client.createReader({
        topic: "persistent://public/default/my-topic",
        startMessageId: Pulsar.MessageId.earliest(),
        listener: (message) => {
          console.log(
            `data: ${JSON.stringify({
              data: message.getData().toString(),
              id: message.getMessageId().toString(),
            })}\n\n`
          );
        },
      });
      await reader.close();
      await client.close();
    })
  );
})();
