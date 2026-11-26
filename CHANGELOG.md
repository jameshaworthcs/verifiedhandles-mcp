# Changelog

The server gives its version in `serverInfo.version` when an agent connects. We only add within a major version; a change that would break a working client comes with a new one.

## 1.107.0 · 26 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.106.0 · 26 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.105.0 · 26 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.104.1 · 26 November 2026

- The tools’ descriptions, and their arguments’, are much shorter: the same facts in fewer words, so the tool list takes far less of a client’s context. Where a description used to let an agent pick the wrong tool or argument, it now says which. No tool’s name, arguments or behaviour changed.

## 1.104.0 · 22 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.103.0 · 21 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.102.0 · 21 November 2026

- update_entry_fields, propose_entry_change, update_entries and propose_entry_changes take `also_known_as`: another name the subject is known by, which the entry’s search snippet says after the name, ahead of the Wikidata item’s pseudonym or English alias; "" or null removes it. Plain text, at most 100 characters: the dry run shows the value as it would be stored (`changes.also_known_as`) or refuses one with a < or > (`also_known_as_markup`) or too long (`also_known_as_too_long`). propose_entry_revert puts it back with the rest. get_entry’s editing context and the entry’s JSON carry `also_known_as`.

## 1.101.0 · 21 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.100.0 · 21 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.99.0 · 21 November 2026

- A new entry kind, `performing_group` (“performing group”, an organisation): a comedy troupe or double act, a theatre or dance company, a ballet company or a circus, which the sync gives an entry whose item is one. Every answer’s `entity_kind` may carry it; such entries were `organization`, `nonprofit` or `company`, and change as the sync next reads their items. A band, an opera company or an idol group stays a `musical_group`.

## 1.98.0 · 19 November 2026

- get_entry’s handles carry `display_label`: what the platform calls a handle whose value is an ID (“Artist page” on Spotify, “Author page” on Goodreads), which the entry page shows as the card’s main line with the ID under it; null for most platforms.

## 1.97.0 · 19 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.96.0 · 19 November 2026

- find_by_handle matches a website by its site: the scheme, a leading `www.`, a trailing slash and the host’s case are ignored, so a bare domain finds an entry that lists its `https://` address with a slash (a longer path, such as `/blog`, is another page). A url that is no profile on a platform the site lists is looked up as a website, rather than refused.

## 1.95.0 · 9 November 2026

- Saving `bio` on an entry with no Wikidata item and no kind makes it a person, in the same revision, as its page states life facts for a person only; the dry run shows it as `changes.kind`. get_entry’s editing context carries `bioNotShown`: life facts stored on the entry that its page does not state, and why (`no_kind`, `not_person`, `under_18`, `birth_date_hidden`, `item_facts_used`), or null.

## 1.94.0 · 9 November 2026

- update_entry_fields, propose_entry_change, update_entries and propose_entry_changes take `native_name` and `native_name_lang`: the entry’s name in its own script, shown under its title (e.g. 川瀬智子, `ja`), and its language code; "" or null removes both. Setting it takes it from the Wikidata sync, which otherwise fills it from the item’s name in native language (P1559) when that is not the title. The dry run shows the pair as it would be stored (`changes.native_name`), or refuses a code that is not one (`invalid_native_name_lang`). get_entry’s editing context and the entry’s JSON carry `native_name` and `native_name_lang`.

## 1.93.0 · 9 November 2026

- An add_handles op naming a handle the entry has, with another display, now sets that handle’s Shown as in its place (handle_ops.display_set) rather than changing nothing; the handle stays whose it was, so one Wikidata lists stays on the sync. The dry runs list it under changes.display_set. A Shown as edited in a whole list no longer takes a handle off the sync either.
- get_entry’s handles carry platform_first: the first of the entry’s accounts on its platform, which is now its main one (an editor’s pick, else Wikidata’s preferred, else the one named as the entry). Inside a platform the handles follow that order.

## 1.92.0 · 7 November 2026

- update_entry_handles and propose_entry_change take `first`: the handles to move to the front of an entry’s list, in that order, each by its value (a masked email by its ref), the others keeping their order after them, so a reorder no longer needs the whole list. It can go with add and remove (add_handles and remove_handles on a proposal), which it is applied after. A handle in `first` the entry does not have is refused (`handle_not_found`), as is one named twice (`handle_repeated`), and `first` with `handle_order` (`first_or_handle_order`). update_entry_handles sends the list whole with `first`, on the revision it read, so a save in between is refused as a conflict. Dry run by default, audited as every edit.

## 1.91.0 · 7 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.90.0 · 7 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.89.0 · 6 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.88.0 · 4 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.87.0 · 3 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.86.0 · 3 November 2026

- update_entry_fields, propose_entry_change, update_entries and propose_entry_changes take `bio`: on an entry with no Wikidata item, a person’s date of birth (and optionally birth name and place of birth), each with the address of a source that states it; null removes it. The dry run shows it as it would be stored (`changes.bio`), or refuses it (`invalid_bio` with field and problem; `bio_from_wikidata` on an entry with an item). get_entry’s editing context carries `vh_bio` and `entity_type`.

## 1.85.0 · 2 November 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.84.0 · 28 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.83.0 · 28 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.82.0 · 28 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.81.0 · 28 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.80.0 · 27 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.79.0 · 27 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.78.0 · 27 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.77.0 · 27 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.76.0 · 25 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.75.0 · 25 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.74.0 · 21 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.73.0 · 20 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.72.0 · 20 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.71.0 · 20 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.70.0 · 19 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.69.0 · 19 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.68.0 · 19 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.67.0 · 19 October 2026

- A new entry kind, `software` (“software”, a brand): a program, an application, a framework or a library, which the sync gives an entry whose item is one (free software, software, application software, a spreadsheet, an image or video editor, a digital audio workstation, a web framework…). Every answer’s `entity_kind` may carry it. An item that is “application software” was a `website` and is now `software`. A mobile app is still a `website`, and so is an item that states a software class beside a mobile app, a web application, a website or an online service (Spotify, GitHub, Telegram).
- Two kinds take more classes: `sports_organization` an American football team, a men’s national association football team and a professional or American football league (the NFL); `broadcaster` a specialty channel (E!, Hallmark Channel). Their entries’ `entity_kind` follows on the sync’s next read.

## 1.66.0 · 19 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.65.0 · 18 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.64.0 · 18 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.63.0 · 16 October 2026

- A new entry kind, `show` (“show”, a brand): a television or web series, a programme or a podcast, which the sync gives an entry whose item is one. Every answer’s `entity_kind` may carry it. A podcast network is still a `broadcaster`.

## 1.62.0 · 16 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.61.0 · 16 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.60.0 · 16 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.59.1 · 16 October 2026

- The server’s instructions, its `serverInfo.description`, the server card’s and the MCP Registry listing’s description and the AI catalogue’s queries now say “official social media accounts”, not “verified social handles”: most entries carry no badge, and “Verified” is the badge’s word. No tool changed.

## 1.59.0 · 16 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.58.0 · 16 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.57.0 · 15 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.56.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.55.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.54.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.53.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.52.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.51.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.50.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.49.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.48.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.47.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.46.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.45.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.44.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.43.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.42.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.41.0 · 13 October 2026

- get_entry’s editing.image carries `license_name`: an upload’s licence by name, or a Commons file’s as the sync read it from the file page (“CC BY 3.0”). `license` stays an upload’s licence id, null for every Commons file; the licence was in image_rights.license_name all along.
- update_entry_fields names set_wikidata_ownership (relinquish_fields) as the way to hand a field back to the Wikidata sync.

## 1.40.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.39.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.38.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.37.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.36.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.35.0 · 13 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.34.0 · 12 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.33.0 · 12 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.32.0 · 12 October 2026

- propose_from_wikidata: copying an item’s handles, a handle the entry already has is now found by the key the site stores (letter case folded as the site folds it), so one that differs only by a letter whose case the site and a client fold differently (İx and ix on X) is no longer proposed again, a proposal the save refused whole. Its dry run’s `item.handles` carries each handle’s `value_norm`, as GET /api/wikidata/items/{qid} now does, beside the entry’s own in GET /api/editor/{vhid}.

## 1.31.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.30.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.29.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.28.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.27.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.26.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.25.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.24.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.23.1 · 11 October 2026

- propose_new_entry’s dry run asks the site to check the proposal without queueing it (POST /api/entity?check=1), so refused_because now names what the real run would be refused for that the tool could not see before: a short name that is the address of a site redirect (short_is_redirect), a deleted entry or a merged-away item, or one of the site’s moderation checks.

## 1.23.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.22.0 · 11 October 2026

- find_by_handle, a public read that needs no key: which public entries list a handle — “is x.com/someone an official account, and whose?”. Give a profile’s address as url (https://x.com/someone, read as the editor reads a pasted one), or platform and value (twitter, someone or @someone). It answers each entry’s VHID, title and URL, the handle as the entry lists it and whether that handle is verified, verified first; an empty list when no entry lists it. Case is ignored where the platform ignores it; email addresses are not looked up. It is GET /api/v1/handles.

## 1.21.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.20.0 · 11 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.19.0 · 10 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.18.0 · 9 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.17.0 · 9 October 2026

- The tools that write through the entry routes — update_entry_fields, update_entry_handles, set_entry_image, set_entry_gallery, set_wikidata_ownership, update_entries, propose_entry_change, propose_entry_changes, propose_entry_revert, propose_from_wikidata and propose_new_entry — take an optional idempotency_key (1–255 printable ASCII, e.g. a UUID), sent as the write’s Idempotency-Key. Calling the tool again with the same key and the same change within 24 hours answers the first call’s result, marked replayed: true, and writes nothing; the same key with another change is refused (422 idempotency_key_reused), and while the first call is still running, 409 idempotency_key_in_progress. A dry run shows the header in would_send. A tool that re-reads the entry before writing still matches its first call: the base revision is not part of what is compared. update_entries’ confirm digest still names the request’s base revisions: give each edit its base_revision_id from the dry run, and a retry sends the same request.

## 1.16.0 · 9 October 2026

- update_entry_handles, update_entries, propose_entry_change and propose_entry_changes send the handles you add and remove as ops (add_handles / remove_handles), no longer the entry’s whole list: the server applies them to the list as it is when the edit is saved, or when the proposal is approved, so nothing is read first, an edit of handles alone carries no base revision, and two edits adding different handles never undo each other. An add of a handle the entry has, or a remove of one it has not, is no longer refused before sending: it changes nothing, and the route’s answer says so (handle_ops: added, removed, already_present, not_present; an edit of nothing else answers 400 no_changes). The dry runs show the ops in would_send and list in changes which would change nothing now (already_listed, not_listed). update_entry_handles’ remove takes an email this key may not see by its ref, and its base_revision_id is no longer sent. propose_entry_change with handle_order still sends the whole list, which an order is of.

## 1.15.0 · 9 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.14.0 · 9 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.13.0 · 9 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.12.0 · 9 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.11.0 · 9 October 2026

- Many entries at once. get_entries reads up to 50 entries’ public records in one call (by VHID or short name, with or without a key), each as get_entry reads it signed out, or not_found. update_entries makes live edits to up to 25 entries in one request (each edit the text fields and handles update_entry_fields and update_entry_handles take), and propose_entry_changes files proposals for up to 25 (as propose_entry_change). Each edit is judged as it would be alone, entry by entry; by default each stands alone, and with atomic: true any refused edit means none is made. Both are dry runs by default, listing what would change entry by entry (may_edit_live, may_propose); a real run of update_entries needs confirm set to the batch digest its dry run names, which pins the exact request.

## 1.10.0 · 9 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.9.0 · 9 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.8.0 · 8 October 2026

- Every read tool’s `outputSchema` now names its fields, from the documented answer of the route behind it: each field’s type and description. Still loose: an object may carry fields its schema does not name. A tool whose answer takes one of two shapes (a list or one item, such as list_my_submissions) names every field of each, optional unless both always carry it. No tool’s arguments or answers changed.

## 1.7.0 · 8 October 2026

- ChatGPT can link your account on `/mcp`: every tool is listed with OpenAI’s `securitySchemes` (on the tool and in its `_meta`): `noauth` and `oauth2` (scope `mcp`) for the three reads that need no key, `oauth2` for every other tool. With no key, a call of a tool that needs an account answers a tool error, `sign_in_required`, whose `_meta["mcp/www_authenticate"]` is the Bearer challenge for `/mcp`; it was `Tool … not found`. What `/mcp` lists with no key is unchanged, and so is everything with a key or a token.

## 1.6.0 · 8 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.5.0 · 8 October 2026

- Structured answers: every tool is listed with an `outputSchema`, and every answer that is not an error carries its JSON as `structuredContent` too, beside the text block (unchanged, for older clients). get_entry, search_entries and get_entry_history describe their fields, as the public API documents them; the other reads answer an object, and every write the shared envelope (a dry run’s `dry_run`, `would_send`, `note`, and `confirm`, `may_edit_live` or `refused_because` where they apply; a real run’s, the route’s answer). An object may carry fields its schema does not name. /developers/mcp shows each tool’s output schema beside its input one.

## 1.4.0 · 8 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.3.0 · 8 October 2026

- Sign in with OAuth: a second address, `/mcp/account`, is the same server for an app you connect to your account. With no token it answers `401` with `WWW-Authenticate: Bearer resource_metadata="…"`, so an OAuth client (Claude, Claude Code, VS Code, ChatGPT) signs you in by itself; you choose its role ceiling, read only and how long. `/mcp` is unchanged, and its `401`s now name where to sign in too.

## 1.2.0 · 8 October 2026

- Changes to tools for site staff; nothing changes for public or registered keys.

## 1.1.0 · 6 October 2026

- No key needed to read: with no `Authorization` header, `/mcp` answers with the read tools a signed-out visitor can use (get_entry, search_entries, get_entry_history), in a rate limit of its own.
- Tools say more about themselves: a title on every tool, and `destructiveHint` false on the tools that only add (the propose_* tools, report_entry, comments, notes), `idempotentHint` where a repeat changes nothing, `openWorldHint` on those that reach Wikidata, Commons or the web.
- Resources and prompts: an entry and its history as `vh://entry/{entry}` and `vh://entry/{entry}/history`; the prompts find_entry and check_entry_handles for everyone, and propose_what_wikidata_says for a key that may propose.
- `serverInfo.version` is this version (it was the build’s git commit, which is now in `serverInfo.description`), and `tools.listChanged` is no longer advertised: the server is stateless and sends no notifications.

## 1.0.0 · 27 September 2026

- The first release: an API key opens it, and the tools listed are the ones the key may use. Every write tool is a dry run unless told otherwise.
