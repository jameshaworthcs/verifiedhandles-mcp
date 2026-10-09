# Changelog

The server gives its version in `serverInfo.version` when an agent connects. We only add within a major version; a change that would break a working client comes with a new one.

## 1.12.0 · 9 October 2026

- set_entry_kind sets the kind of an entry with no Wikidata item (the Entry Manager’s Kind: museum, musical group, company and the rest, or null to clear it), as a revision, for an administrator. Its dry run says when the entry has an item, whose kind comes from Wikidata and which the server refuses.
- sync_entry_now’s dry run no longer says an administrator’s run on a protected or claimed entry is refused: it runs, changing only the type, and the dry run says so (`keeps_only: "entity_type"`). Anyone else’s is still refused there.
- wikidata_deleted_entries takes view: "credit_gone", Console → Deleted on Wikidata’s “Wikipedia credit gone”: the entries whose “from Wikipedia” credit names a page that is gone or now outside the articles and drafts, each with its credit_title, state, missing_since and links. It changes nothing; update_entry_fields or propose_entry_change fix the text, and restore_wikipedia_credit with a title credits another page.

## 1.11.0 · 9 October 2026

- Many entries at once. get_entries reads up to 50 entries’ public records in one call (by VHID or short name, with or without a key), each as get_entry reads it signed out, or not_found. update_entries makes live edits to up to 25 entries in one request (each edit the text fields and handles update_entry_fields and update_entry_handles take), and propose_entry_changes files proposals for up to 25 (as propose_entry_change). Each edit is judged as it would be alone, entry by entry; by default each stands alone, and with atomic: true any refused edit means none is made. Both are dry runs by default, listing what would change entry by entry (may_edit_live, may_propose); a real run of update_entries needs confirm set to the batch digest its dry run names, which pins the exact request.

## 1.10.0 · 9 October 2026

- search_console_sitemaps also lists the sitemaps Google read inside each submitted sitemap index (/sitemap.xml’s person-1.xml, browse.xml and the rest), each with its own last read, pending, errors, warnings and discovered URLs, as Search Console shows them under the index. Each sitemap gains `via_index`: true for these, which have no `last_submitted`; the submitted ones come first. Nothing else changed.

## 1.9.0 · 9 October 2026

- Search Console, for administrators: search_console_report (clicks, impressions, CTR and position from what the site has fetched from Google, by default the last 28 final days of web search, grouped by total, date, page, query, kind, device or country, filtered by page, entry, kind, query or search type), search_console_index_status (URL Inspection’s verdicts for a URL, an entry or a kind, the indexed share per kind, the canonical mismatches) and search_console_sitemaps (the sitemaps Google lists, and whether this instance may change them). Two writes, dry run by default: resubmit_sitemap (by default /sitemap.xml) and delete_sitemap (only a sitemap the site answers 404 or 410 for, never /sitemap.xml, with confirm set to its URL). Both are refused everywhere but production, before anything is sent to Google.

## 1.8.0 · 8 October 2026

- Every read tool’s `outputSchema` now names its fields, from the documented answer of the route behind it (the audit log’s rows, handle health’s checks, the Entry manager’s card, the review queue’s submissions, the sync’s state, the open Wikidata corrections, rate limits and the rest): each field’s type and description, as the console API documents them. Still loose: an object may carry fields its schema does not name. A tool whose answer takes one of two shapes (a list or one item: list_duplicate_qids, list_bulk_changes, list_my_submissions, list_applications, email_outbox, permission_history, get_entry_history_full) names every field of each, optional unless both always carry it. No tool’s arguments or answers changed.

## 1.7.0 · 8 October 2026

- ChatGPT can link your account on `/mcp`: every tool is listed with OpenAI’s `securitySchemes` (on the tool and in its `_meta`): `noauth` and `oauth2` (scope `mcp`) for the three reads that need no key, `oauth2` for every other tool. With no key, a call of a tool that needs an account answers a tool error, `sign_in_required`, whose `_meta["mcp/www_authenticate"]` is the Bearer challenge for `/mcp`; it was `Tool … not found`. What `/mcp` lists with no key is unchanged, and so is everything with a key or a token.

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
