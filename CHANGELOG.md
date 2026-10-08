# Changelog

The server gives its version in `serverInfo.version` when an agent connects. We only add within a major version; a change that would break a working client comes with a new one.

## 1.6.0 · 8 October 2026

- rate_limits: Console → Rate limits, read only, for a key that may run the Wikidata sync: each consumer’s state, its hosts’ limits and live rates, today’s units against its daily ceiling, and when its worker’s key expires.

## 1.5.0 · 8 October 2026

- Structured answers: every tool is listed with an `outputSchema`, and every answer that is not an error carries its JSON as `structuredContent` too, beside the text block (unchanged, for older clients). get_entry, search_entries and get_entry_history describe their fields, as the public API documents them; the other reads answer an object, and every write the shared envelope (a dry run’s `dry_run`, `would_send`, `note`, and `confirm`, `may_edit_live` or `refused_because` where they apply; a real run’s, the route’s answer). An object may carry fields its schema does not name. /developers/mcp shows each tool’s output schema beside its input one.

## 1.4.0 · 8 October 2026

- An edit summary on the Entry Manager’s writes that make a revision: restore_entry_revision, set_entry_wikidata_item, restore_wikipedia_credit, merge_entry and unmerge_entry take `summary` (why, in a few plain words), stored after the site’s own words in the entry’s history, as update_entry_fields stores it.

## 1.3.0 · 8 October 2026

- Sign in with OAuth: a second address, `/mcp/account`, is the same server for an app you connect to your account. With no token it answers `401` with `WWW-Authenticate: Bearer resource_metadata="…"`, so an OAuth client (Claude, Claude Code, VS Code, ChatGPT) signs you in by itself; you choose its role ceiling, read only and how long. `/mcp` is unchanged, and its `401`s now name where to sign in too.

## 1.2.0 · 8 October 2026

- A platform’s look: update_platform takes `accent` (its colour, `#rrggbb`, or null for the built-in one), and revert_platform_icon removes an uploaded icon, so it shows its built-in one again.

## 1.1.0 · 6 October 2026

- No key needed to read: with no `Authorization` header, `/mcp` answers with the read tools a signed-out visitor can use (get_entry, search_entries, get_entry_history), in a rate limit of its own.
- Tools say more about themselves: a title on every tool, and `destructiveHint` false on the tools that only add (the propose_* tools, report_entry, comments, notes), `idempotentHint` where a repeat changes nothing, `openWorldHint` on those that reach Wikidata, Commons or the web.
- Resources and prompts: an entry and its history as `vh://entry/{entry}` and `vh://entry/{entry}/history`; the prompts find_entry and check_entry_handles for everyone, and propose_what_wikidata_says for a key that may propose.
- `serverInfo.version` is this version (it was the build’s git commit, which is now in `serverInfo.description`), and `tools.listChanged` is no longer advertised: the server is stateless and sends no notifications.

## 1.0.0 · 27 September 2026

- The first release: an API key opens it, and the tools listed are the ones the key may use. Every write tool is a dry run unless told otherwise.
