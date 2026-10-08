// Claude Desktop starts this with the API key you gave it, if any. It runs mcp-remote, which
// connects to the Verified Handles MCP server and passes messages between it and Claude Desktop.
// With no key it sends no Authorization header, and the server answers with the reads that need none.
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ENDPOINT = 'https://verifiedhandles.org/mcp';

const remote = join(dirname(fileURLToPath(import.meta.url)), '..', 'node_modules', 'mcp-remote');
const bin = JSON.parse(readFileSync(join(remote, 'package.json'), 'utf8')).bin['mcp-remote'];

// A setting left empty can arrive empty, or as its placeholder unreplaced.
const key = (process.env.VH_API_KEY ?? '').trim().replace(/^Bearer\s+/i, '');
const keyed = key !== '' && !key.startsWith('$' + '{');

const args = [join(remote, bin), ENDPOINT];
// mcp-remote reads the header's value from the environment, so the key is never an argument.
if (keyed) args.push('--header', 'Authorization:$' + '{AUTH_HEADER}');
const env = { ...process.env };
delete env.VH_API_KEY;
if (keyed) env.AUTH_HEADER = `Bearer ${key}`;

const child = spawn(process.execPath, args, { stdio: 'inherit', env });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
child.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 1)));
