# pulsar-client-segfault-repro

This repository is a reproduction of a segfault that occurs when using the
Node.JS bindings for the Pulsar C++ client library.

```bash
npm install
docker run -it \
-p 6650:6650 \
-p 8080:8080 \
--mount source=pulsardata,target=/pulsar/data \
--mount source=pulsarconf,target=/pulsar/conf \
apachepulsar/pulsar:3.2.2 \
bin/pulsar standalone

# in another terminal
npm run produce
npm run test
# should segfault immediately, rerun if not, updating NUM_ITS in index.js if necessary
```
