import { createServer } from 'node:http';

async function testLayout() {
  const cdpRes = await fetch('http://127.0.0.1:9223/json/list').catch(() => null);
  console.log('DevTools available?', Boolean(cdpRes));
}
testLayout();
