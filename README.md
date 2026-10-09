# Verified Handles MCP server

[Verified Handles](https://verifiedhandles.org) lists people, organisations and things with their verified social handles and other identifiers. Its MCP server lets an AI agent look entries up, search them and read their history with no key, and, with your key or your account, do what you can do on the site.

This repository holds what you need to connect to it: the server itself runs at `https://verifiedhandles.org/mcp`, and its code is not here. The full guide, with every tool, is at https://verifiedhandles.org/developers/mcp.

- **Version** 1.12.0: what changed is in [CHANGELOG.md](CHANGELOG.md).
- **The tools**, as the server lists them: [with no key](tools/no-key.json) and [with a registered account’s key](tools/registered-key.json), each with its input and output schemas.
- **A Claude Desktop extension** to install in one click: [mcpb/](mcpb/).
- **The MCP Registry listing**: [server.json](server.json).
- **A problem or a question?** [Open an issue](https://github.com/jameshaworthcs/verifiedhandles-mcp/issues).

The guides below are the ones at https://verifiedhandles.org/developers/mcp, word for word, so “this site” and “here” in them mean verifiedhandles.org.

## What MCP is here

MCP, the Model Context Protocol, is how an AI agent (Claude, Cursor, Copilot and others) uses a service through tools it can call. The Verified Handles server is at `https://verifiedhandles.org/mcp`, over MCP’s Streamable HTTP transport. It is stateless: each message is one `POST`, answered in JSON, with no session to keep.

Every tool goes through the same routes and checks as the site and the rest of the API: an agent can do nothing you could not do yourself, and with a key it acts as you. Nothing is changed by accident: every tool that changes something only shows what it would do until it is told otherwise (see [dry runs](https://verifiedhandles.org/developers/mcp#dry-run)).

The server is listed in the MCP Registry as `org.verifiedhandles/verified-handles`, and its setup guides, changelog and [a Claude Desktop extension](https://github.com/jameshaworthcs/verifiedhandles-mcp/releases/latest/download/verified-handles.mcpb) are [on GitHub](https://github.com/jameshaworthcs/verifiedhandles-mcp).

## No key, a read-only key, or a full key

| Connected with | Tools listed | Acts as |
| --- | --- | --- |
| No key | The public reads that need nothing else: [`get_entry`](https://verifiedhandles.org/developers/mcp#mcp-get_entry), [`search_entries`](https://verifiedhandles.org/developers/mcp#mcp-search_entries), [`get_entry_history`](https://verifiedhandles.org/developers/mcp#mcp-get_entry_history) and [`get_entries`](https://verifiedhandles.org/developers/mcp#mcp-get_entries). Just leave out the `Authorization` header. | A signed-out visitor: the public record only. |
| A read-only key | Every read tool your role is listed, and no tool that changes anything. | You, reading. |
| A key | Every tool your role is listed (see [which tools each role is listed](https://verifiedhandles.org/developers/mcp#roles)). | You, at the lower of the key’s role ceiling and your role today. |

A key that is sent but wrong, revoked or expired is refused with `401`; it is never treated as no key. Answers are never cached, by anyone.

## Getting a key

Any account can make a key: registered accounts and trusted editors may by default, and administrators hold every permission. (An administrator can take the permission away from an account.) Sign in, choose Console in the menu, then Account, then **Manage API keys**.

- **The key is shown once**, when it is made, as `vhk_<prefix>_<secret>`. Keep it somewhere safe; if it leaks, revoke it on the same page and it stops working at once.
- **A role ceiling** at or below your own role: the key never acts as more, and a role taken from you is taken from your keys too.
- **Read-only**, if you only read: the agent is then listed no tool that changes anything.
- **An expiry** of 1 to 90 days. You can keep up to 5 keys at once.

## Connect with your account (OAuth)

Clients that sign in with OAuth (Claude, Claude Code, ChatGPT, VS Code, Cursor) can act as you without an API key. Connect them to `https://verifiedhandles.org/mcp/account`: they open a Verified Handles page where you sign in and choose what they may do: a role ceiling, read only, and for how long (7, 30 or 90 days).

`https://verifiedhandles.org/mcp` stays as it is: with no key, the public reads; with an API key, your account. Your connected apps are on Console → Account → API keys, where you can disconnect one; you can have up to 10 at once. For clients that can’t sign in this way, such as scripts, use an API key as before.

### Claude Code

*In a terminal*

```sh
claude mcp add --transport http verified-handles https://verifiedhandles.org/mcp/account
```

Then run `/mcp` in Claude Code, choose **verified-handles** and **Authenticate**: your browser opens the Verified Handles page.

### claude.ai and Claude’s apps

Add a custom connector (Settings, Connectors, Add custom connector) with the address `https://verifiedhandles.org/mcp/account`, leaving the advanced settings empty, then choose **Connect**.

### VS Code

*.vscode/mcp.json*

```json
{
  "servers": {
    "verified-handles": {
      "type": "http",
      "url": "https://verifiedhandles.org/mcp/account"
    }
  }
}
```

VS Code asks you to sign in the first time it connects.

### ChatGPT

In developer mode, create a connector with the address `https://verifiedhandles.org/mcp/account` and OAuth as its authentication. Or start with `https://verifiedhandles.org/mcp` and no key: it reads, and ChatGPT can link your Verified Handles account later, when it asks you to.

### Cursor, and other apps that register themselves

Some clients, Cursor among them, publish no details of their own: they register themselves with Verified Handles the first time they connect. That works, but nobody can check who made an app like that, so the page marks it **Unverified app**, and your API keys page marks it **Unverified** too. Instead of where its details are published, it shows where the app sends you back to: a web address, your own computer, or for an app on your device, the kind of address it opens (such as `com.example.app:`). Any app can call itself anything, so allow one only if you started connecting it yourself, just now.

*Cursor: mcp.json*

```json
{
  "mcpServers": {
    "verified-handles": {
      "url": "https://verifiedhandles.org/mcp/account"
    }
  }
}
```

With no `headers`, Cursor asks you to sign in when it connects. To use an API key instead, see [Setting up your client](https://verifiedhandles.org/developers/mcp#setup-cursor).

### What the page asks

The page names the app as it describes itself, the web address its details are published at, and where it sends you back to. Only allow an app you started connecting yourself, just now. It can do what your account can do, never more than the role you pick, and never more than your own role if that changes. When its days are up it asks again; you can disconnect it sooner.

### For client authors

- A request to `https://verifiedhandles.org/mcp/account` with no token answers `401` with `WWW-Authenticate: Bearer resource_metadata="https://verifiedhandles.org/.well-known/oauth-protected-resource/mcp/account", scope="mcp"`. The metadata is at `https://verifiedhandles.org/.well-known/oauth-protected-resource/mcp/account` (RFC 9728) and `https://verifiedhandles.org/.well-known/oauth-authorization-server` (RFC 8414).
- A client registers with a Client ID Metadata Document: its `client_id` is the `https` address of that document. Without one, it can register at `https://verifiedhandles.org/oauth/register` (Dynamic Client Registration, RFC 7591), and the person sees it marked unverified. Either way there is no client secret. A registered client’s redirect URIs are `https:`, loopback `http:` (any port then matches) or a private-use scheme with a dot (RFC 8252 §7.1, such as `com.example.app:/callback`); others are dropped. At most 10 registrations an hour from one address; one never used is deleted after 24 hours.
- The authorization code flow with PKCE, `S256` only. Send `resource`: the address you connect to (`https://verifiedhandles.org/mcp/account`, or `https://verifiedhandles.org/mcp`); a token works there and nowhere else. The one scope is `mcp`, and `iss` comes back with the code.
- A code works once, for 60 seconds; an access token for 1 hour. A refresh token is replaced each time it is used, and using an old one again ends the connection. Send the token as `Authorization: Bearer`, never in a query string; revoke it at `https://verifiedhandles.org/oauth/revoke`.

## Setting up your client

Each recipe below connects with a key; for no key, leave the `Authorization` header (or the setting that sends it) out. Put your own key where it says `vhk_<prefix>_<secret>`, and keep it out of anything you share or commit: where a client can read it from an environment variable, the recipe does.

### Claude Code

*In a terminal*

```sh
# No key: the public reads
claude mcp add --transport http verified-handles https://verifiedhandles.org/mcp

# With a key (add --scope user to have it in every project)
claude mcp add --transport http verified-handles https://verifiedhandles.org/mcp \
  --header "Authorization: Bearer vhk_<prefix>_<secret>"
```

Or in a project’s `.mcp.json`, with the key read from your environment when Claude Code starts:

*.mcp.json*

```json
{
  "mcpServers": {
    "verified-handles": {
      "type": "http",
      "url": "https://verifiedhandles.org/mcp",
      "headers": {
        "Authorization": "Bearer ${VH_API_KEY}"
      }
    }
  }
}
```

### Cursor

In `~/.cursor/mcp.json` (every project) or a project’s `.cursor/mcp.json`:

*mcp.json*

```json
{
  "mcpServers": {
    "verified-handles": {
      "url": "https://verifiedhandles.org/mcp",
      "headers": {
        "Authorization": "Bearer ${env:VH_API_KEY}"
      }
    }
  }
}
```

### VS Code

In a workspace’s `.vscode/mcp.json`. VS Code asks for the key the first time and keeps it, so it never sits in the file:

*.vscode/mcp.json*

```json
{
  "inputs": [
    {
      "type": "promptString",
      "id": "vh-api-key",
      "description": "Verified Handles API key",
      "password": true
    }
  ],
  "servers": {
    "verified-handles": {
      "type": "http",
      "url": "https://verifiedhandles.org/mcp",
      "headers": {
        "Authorization": "Bearer ${input:vh-api-key}"
      }
    }
  }
}
```

### Claude Desktop

Add it as a custom connector (Settings, Connectors, Add custom connector), as for claude.ai below. Or, through the `mcp-remote` bridge (it needs Node.js 18 or later), in `claude_desktop_config.json`. The key goes in `env`, because some clients do not pass a space inside an argument safely:

*claude\_desktop\_config.json*

```json
{
  "mcpServers": {
    "verified-handles": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://verifiedhandles.org/mcp",
        "--header",
        "Authorization:${AUTH_HEADER}"
      ],
      "env": {
        "AUTH_HEADER": "Bearer vhk_<prefix>_<secret>"
      }
    }
  }
}
```

### claude.ai and other custom connectors

On claude.ai (and Claude’s desktop and mobile apps), add a custom connector with the address `https://verifiedhandles.org/mcp`. Choose **No sign in**: with nothing more, it reads with no key. To use your key, add a request header `Authorization` with the value `Bearer vhk_<prefix>_<secret>`. The connector calls from Anthropic’s servers, not your computer, so it shares their addresses’ rate limit; a key is the way to be counted as yourself. To sign in instead of sending a key, use the address `https://verifiedhandles.org/mcp/account`: see [Connect with your account (OAuth)](https://verifiedhandles.org/developers/mcp#oauth).

### Test the connection

*curl*

```sh
curl -s https://verifiedhandles.org/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -H "Authorization: Bearer $VH_API_KEY" \
  --data '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
# Leave out the Authorization line to see what no key is listed.
```

## Dry runs, confirm and proposing

**Every tool that changes something does nothing by default.** Called as it is, it runs with `dry_run: true`: it reads the entry as it is now and answers with what it would change, the exact request it would send, and whether your account may make it. To make the change, call it again with `dry_run: false`.

A change that destroys something or affects the whole site also needs `confirm`, set to the exact target the dry run names (an entry’s VHID, say), so it is never made by accident.

To change an entry without it going live, **propose** it: the `propose_*` tools send it to a reviewer, as a suggestion on the site does, and nothing changes until a person approves it. Sending the same proposal again answers with the one already waiting. Each tool that edits live names the tool that proposes the same change instead.

## Rate limits

Messages with no key are limited to 60 a minute from one IP address, shared by everyone calling from it, as everyone using an agent hosted on someone else’s servers is (a claude.ai connector calls from Anthropic’s). With a key, or connected with your account, the limit is 120 a minute for each key, wherever its messages come from. Each tool call is also counted by the request it makes, as any request to the site is: a read in the JSON reads’ limit (120 a minute), a change in the limits on changes, per address, per account and per key. Past a limit, the answer is `429 Too Many Requests` with a `Retry-After` header: wait that many seconds, then go on.

## The Claude Desktop extension

The `mcpb/` folder is a Claude Desktop extension. Claude Desktop runs it with its own Node.js; it starts `mcp-remote`, which connects to the server for it. Its one setting is your API key, and it is optional: left empty, the extension reads with no key. Claude Desktop hides the key as you type it and stores it securely.

The built file, `verified-handles.mcpb`, is on the [releases page](https://github.com/jameshaworthcs/verifiedhandles-mcp/releases/latest): open it with Claude Desktop to install it. To build it yourself from this folder (Node.js 18 or later):

```sh
cd mcpb
npm install --omit=dev
npx @anthropic-ai/mcpb pack
```

## About this repository

Everything here is generated from the Verified Handles source each time the server changes, so a pull request to these files would be overwritten: please open an issue instead.

This repository is MIT-licensed: see [LICENSE](LICENSE).
