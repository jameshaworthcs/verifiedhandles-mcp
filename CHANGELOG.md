# Changelog

The server gives its version in `serverInfo.version` when an agent connects. We only add within a major version; a change that would break a working client comes with a new one.

## 1.59.1 · 16 October 2026

- The server’s instructions, its `serverInfo.description`, the server card’s and the MCP Registry listing’s description and the AI catalogue’s queries now say “official social media accounts”, not “verified social handles”: most entries carry no badge, and “Verified” is the badge’s word. No tool changed.

## 1.59.0 · 16 October 2026

- propose_wikidata_correction: a proposal on a statement where another person’s change to something else is open (another qualifier, a reference, the value beside a qualifier) no longer closes it: it is joined to that open change as its next step, one group made in that order and one card on Review. The answer’s new `joined` names the open change and `group_id` the group; the dry run’s new `joins` names it, and `warning` says “Joined to the open change #N (…) as its next step: …”. The same thing again (the value, the rank, the same qualifier property, the same reference) still replaces it (`replaces`, `replaced`).
- propose_wikidata_correction: a set_value, remove or move dry run now has the site check it too, as every other action’s does: `would_file`, and `replaces` / `joins` and `warning`, beside `entries_on_item` (or `refused_because` with the site’s `refusal`).

## 1.58.0 · 16 October 2026

- annotate_wikidata_correction: a verdict replaces any machine’s verdict before it, its own or another’s, only with `notes` saying what changed (409 `notes_required` without); the handle checker’s small model (`handle-checker/classify-small`) never replaces another model’s (409 `small_model_outranked`). The answer’s new `replaced` is the verdict it replaced (null with none), kept in the audit as `before`. The dry run shows it as `replaces`, and says when the verdict would be refused.

## 1.57.0 · 15 October 2026

- propose_wikidata_correction and propose_wikidata_changes: a reference whose `url` or `archive_url` is Verified Handles’ own page (this site’s, or verifiedhandles.org’s) is no longer refused (422 `own_site_reference`): it is filed with the warning `own_site_reference`, for the reviewer to keep only where Verified Handles is genuinely the source. propose_wikidata_item: a statement with such a reference is no longer refused either, and its dry run and answer warn of it in `warnings`.
- propose_wikidata_correction and propose_wikidata_changes: new warning `missing_display_name`, a new TikTok, Instagram, Threads, Twitch or X account statement (P7085, P2003, P11892, P5797, P2002) with no “subject named as” (P1810) qualifier: add the account’s display name as the platform shows it. It is filed all the same. A YouTube channel (P2397) without its title is still refused (`channel_without_title`).

## 1.56.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes: a reference whose `url` or `archive_url` is Verified Handles’ own page (this site’s, or verifiedhandles.org’s) is refused (422 `own_site_reference`, with a `message`): cite the page the subject published. New warning `range_too_wide`: a YouTube count whose range starts at its amount but is wider than YouTube’s rounding (“1.7M” is 1700000 to 1709999). `stated_in_mismatch` also warns on a reference stated in a platform’s item (the YouTube API, Q8056784) for an identifier that is none of that platform’s (an Apple Music artist ID, a Patreon ID), and knows Apple Music (P2850), Spotify (P1902) and Deezer (P2722).

## 1.55.0 · 13 October 2026

- list_wikidata_corrections: each correction’s `related`, the other open corrections on its item, outside its proposal, to decide with it, each `{id, how}` (`statement`, the same statement; `replaced_by`, it adds what replaces the value this one retires; `replaces`, the other way round; `property`, one of the two makes a value of the same property the preferred one), strongest first; [] with none. Two follower counts (P8687) of different accounts, both known, are no longer linked.
- dismiss_wikidata_correction: the answer’s `related` names the open corrections filed apart to decide with those dismissed, which stay open (at most 10), and its message says so. Nothing more is dismissed: each is the caller’s to dismiss, or not.

## 1.54.0 · 13 October 2026

- list_wikidata_corrections takes `min_score` and `max_score` (0 to 1, both inclusive): the row’s score, `confidence.score`, how likely it is right as filed, as Review’s *Score at least* / *at most* narrow by it (0.9 and up is the high band). Each row’s `confidence.parts` can now also say `channel_linked` (a renamed YouTube handle tied to the channel that names its new one by the item’s own qualifier or the checker’s look, `by`), `title_named` (the channel’s title names the subject) and `title_mismatch` (it names no one the subject is called). The score is advice: listing by it is reading, and only a person approves.

## 1.53.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes: `reference_misses_claim` reads more. A move or copy to another item (move_to_item, copy_to_item) has the reference given in its place read for the claim too, of the item it goes to, and keeps `evidence.reference_read`. An account or other value that is not an address is no longer taken as shown by the site’s own addresses (sombrmusic on sombrmusic.com, the Bluesky handle fastly.com on fastly.com), nor by a link inside an HTML comment. A value the page holds only in its script data, on a page that shows its text without it, is warned (“holds … only in its script data, not in its text or links”), kept as `evidence.reference_read.script_only`; a JSON-LD block (a site’s `sameAs`) still counts as shown. An item value is also found by its English aliases.

## 1.52.0 · 13 October 2026

- New tool propose_wikidata_item: propose a new Wikidata item with its own statements (each as add_claim takes one, every one with its reference), its English label, description and aliases, `evidence.why` and `notability` (the Wikidata:Notability criterion relied on), for an entry with no item (`entry`, linked to it once made) or for no entry at all (an event). One card in Console → Wikidata → Review; an administrator ticks it notable and approves it, and VH makes it in one edit. Dry run by default: the item as it would be made (`would_create`), and `warnings` (with `twins`) when an item on the write wiki has its label and description or one of its identifier values already.
- propose_wikidata_correction and propose_wikidata_changes: a supersede’s refusal names the field to change (`field`) and says, in `message`, what a supersede takes (`property`, `statement_guid`, `value`, `date`, `reference`, optionally `qualifiers`): `new_value` given for `value`, `end_date` for `date`, or a kind other than `superseded` (a renamed account is `superseded`).

## 1.51.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes refuse a whole number past 9007199254740991 sent as a JSON number in a value, a new value or a qualifier’s value (a 64-bit id, such as a Discord server ID: 966627436387266561 arrives rounded, as 966627436387266600), with a message saying to send it as a string; the route refuses it too (400 `value_must_be_string`, with `message`, and `step` in a group). A smaller whole number is still filed as its digits.
- propose_wikidata_correction and propose_wikidata_changes take a time of unknown value, {"unknown": true}, as an add_qualifier’s or change_qualifier’s value (a start, end or point in time; any other qualifier is refused bad_qualifier with a message), as a preferred rank’s end_date and as a supersede’s date (the old value ends on unknown value, the new one gets no start time). It is filed with new_value null and evidence.qualifier {"datatype":"time","snaktype":"somevalue"}, shown on Review as “unknown value” and sent as Wikidata’s unknown value. made_up_date’s suggestion now says to send it.
- propose_wikidata_correction and propose_wikidata_changes: a reference takes `archive_url`, a web archive’s https copy of its `url`, and `archive_date` (YYYY-MM-DD; read from a web.archive.org or archive.today address when left out). The site loads the copy instead of the original, which is kept as given (http or https) and never fetched, so a page that is gone can still be cited; it is written as archive URL (P1065) and archive date (P2960) after the reference URL, and shown on Review. archive_as_reference’s suggestion now names the two fields.

## 1.50.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes check four more of the owner’s Wikidata conventions as a proposal is filed, from the review of 2026-10-13. One more refusal (400, with `message`, `suggestion` and `refusals`): `superseded_in_place`, kind `superseded` filed as a set_value. Four more warnings (filed anyway, in `warnings` and kept on the row): `other_current_values` (a dead account deprecated beside a current value of its property), `outdated_not_wrong` (a value deprecated as “changed username”, “redirect” or “cannot be confirmed by other sources” while the item or a VH entry holds another value of its property), `handle_differs_from_channel` (a YouTube handle that is not the one the handle checker last saw its channel with) and `second_date_on_statement` (a second year put on one award or nomination statement).

## 1.49.0 · 13 October 2026

- propose_wikidata_correction, propose_wikidata_changes and the deprecation tools ask Wikimedia’s spam blacklist about a reference’s address (and a deprecation’s source) once its page has loaded: one the blacklist blocks is refused 422 `source_blacklisted`, with `matches` (what the blacklist matched) and `message`, and nothing is filed, since Wikidata would refuse the edit that cites it. Give another page.

## 1.48.0 · 13 October 2026

- get_reconcile: each handle carries `remove_after`, when the sync takes a handle it keeps off VH (the item deprecated, ended or no longer states it), not before; null otherwise. A handle the sync keeps that the item ended is no longer offered `remove_qualifier` (“Remove the end time”): VH has it only because Wikidata listed it, so `propose` is null and the sync takes it off VH instead. A handle a person keeps is still offered it.

## 1.47.0 · 13 October 2026

- commons_rights_pass (and `commons_rights_pass` in sync_state) answers `estimated_finish_from` (`measured` or `cap`) and `images_per_day`: `estimated_finish` comes from the rate the pass’s requests of the last day kept, never above its cap, once it has made six, and from its cap until then. The pass now steps beside a routine batch, under its own lock, so `phase` is `waiting_for_lock` only while a due request waits for the priority queue or another server process’s step.

## 1.46.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes read the reference’s page, as it loads to be cited, for the claim: one more warning (filed anyway, in `warnings` and on the row’s `evidence.checks`, a dry run’s too), `reference_misses_claim`, when the page does not show the identifier, text or address it is cited for, or names neither the value nor the subject. A page that draws its text by script, or is cut at the size VH reads, is never refused for it. The row keeps what was read as `evidence.reference_read`.

## 1.45.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes check more of the owner’s Wikidata conventions as a proposal is filed. Three more refusals (400, with `message`, `suggestion` and `step`, nothing filed): `archive_as_reference` (a reference url that is a web archive’s copy), `claim_already_present` (an add_claim the item states already, its qualifiers included), `bluesky_handle_without_did` (a Bluesky handle set_value on a statement with no DID, none added). New warnings: `count_not_preferred`, `same_account_still_preferred` (a new preferred count beside its account’s preferred one, on the item or by another open proposal, which it names; before, the first of these was `depends_on_other_proposal`, which now means a demotion with no newer count alone), `made_up_date`, `stated_in_mismatch`, `rounded_count_exact`, `remove_with_reference`, `single_best_second_normal`, `alias_duplicates_mul` and `generic_reference_title`.

## 1.44.0 · 13 October 2026

- New tool list_wikidata_wrong_subject_pairs: Console → Wikidata → To judge’s “One account on two subjects”, the pairs of items that state one account or identifier but that the identity check says are two subjects, with every value both state, what each side’s statement cites, and why they are two subjects. propose_wikidata_correction takes kind wrong_subject with action deprecate and `belongs_to`: the value deprecated on `qid`, the item it does not belong to, filed while VH may still list it, only while both items state it and the pair is still refused (read live, and again just before it is made), with the reason the site picks (“refers to different person” on a human, else “refers to different subject”).

## 1.43.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes: an add_claim whose value is a Commons file (an image P18, a logo P154, a coat of arms P94, any property of that datatype) may come without a `reference`, as Wikidata asks none of it; the dry run then shows none, and Review says “No reference: a Commons file is documented on Commons.” Any other new statement still needs one (`reference_required`).
- The dismissal memory compares the whole value written as well: a dismissed change is the same one only with the same quantity range, and for a new statement the same qualifiers and rank, so a correction dismissed as filed wrong (a count’s range, say) files again once corrected, without `refile`.

## 1.42.0 · 13 October 2026

- keep_wikidata_deleted_entry (new): Deleted on Wikidata’s “Keep, still linked” — an entry in “To review” comes off it and stays exactly as it is, linked to its deleted item, so a restore on Wikidata resumes its sync and it is never offered as a new item; `reason` is recorded; `undo: true` puts it back to “To review”. Dry run by default; audited.
- wikidata_deleted_entries takes view: "kept" (each row’s `kept`: by, at, reason and the deletion it was kept for), and every count has `kept`; “review” no longer lists kept entries.

## 1.41.0 · 13 October 2026

- get_entry’s editing.image carries `license_name`: an upload’s licence by name, or a Commons file’s as the sync read it from the file page (“CC BY 3.0”). `license` stays an upload’s licence id, null for every Commons file; the licence was in image_rights.license_name all along.
- set_entry_kind sets the kind of an entry whose stored QID is the legacy Q0 placeholder, which names no item, as it does on an entry with none; its dry run no longer says the server refuses it.
- update_entry_fields and restore_wikipedia_credit name set_wikidata_ownership (relinquish_fields) as the way to hand a field back to the Wikidata sync.

## 1.40.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes: a newer point-in-time value at preferred rank (add_claim, set_rank) now also sets to normal each older value of its series that is preferred itself, the same account (an identifier qualifier in common, e.g. P6552) or, for a series with none, none: a set_rank normal step after it in the same group, with its “most recent value” (P7452 Q71533355) taken off by a remove_qualifier step first, each named in makes_not_current. Another account’s preferred count is left alone, and so is a statement another change of the proposal names itself.

## 1.39.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes take `refile`: a change a person dismissed before (the same kind, action, statement, value seen, new value and new property) is refused 409 `dismissed`, now with `dismissed_id`, `dismissed_at`, a `message` and, for a group, the `step`; sent again with `refile: true` it is filed anyway, its evidence and audit naming the dismissed row. A dismissal of another change on the statement no longer refuses a proposal, so a row dismissed for its wrong reason is corrected by proposing the right one (dismiss_wikidata_correction says so).

## 1.38.0 · 13 October 2026

- list_wikidata_corrections takes four more of Review’s filters: `generator` (the rule that filed a correction, whole, as list_wikidata_feedback names it, e.g. job/dead_account:gone_only_value), `verdict_by` (who gave its machine verdict, whole), and `min_confidence` and `max_confidence` (that verdict’s confidence, 0 to 1; a correction with no confidence never matches either).

## 1.37.0 · 13 October 2026

- propose_wikidata_correction and propose_wikidata_changes: the owner’s Wikidata conventions, checked as a proposal is filed (dry run included). Refused, with a `message` and a `suggestion` saying exactly what to add, and nothing filed: a new YouTube channel ID statement (P2397) with no “subject named as” (P1810) title (`channel_without_title`), and a YouTube handle (P11245) whose P2397 qualifier names a channel the item does not state and no earlier change adds (`handle_without_channel`). Filed with `warnings` (each `code`, `step`, `message`, `suggestion`; also in `warning`, and kept on the row for the reviewer): `range_not_rounded_down`, `preferred_outranks_other_accounts`, `replacement_deprecated`, `depends_on_other_proposal`.

## 1.36.0 · 13 October 2026

- list_wikidata_feedback (new): what reviewers said about Wikidata corrections (Console → Wikidata → Feedback), each piece with the correction as it was when filed and the generator that filed it, its category, scope, text and its own state (open, addressed or wont_fix); filters state, category, kind, origin, generator and since; with include_dismissals, also the reasons Dismiss kept before, read-only.
- resolve_wikidata_feedback (new): close one open piece of feedback as addressed or wont_fix with a note (a commit, a backlog row, a reason). It never changes the correction. Dry run by default; audited.

## 1.35.0 · 13 October 2026

- list_wikidata_corrections takes Review’s filters, by the names the console’s list uses: `value` (the statement value, whole and case-insensitive, a merge’s shared value included), `q` (words, or a "quoted phrase", that must all appear in the reason, summary, verdict notes or entry title), `action`, `ids` (a list or ranges, at most 500), `from` and `to` (found on or after / on or before a UTC day), `found` (why the job proposed it, e.g. shared_value), and the console’s older `property`, `entry`, `age`, `origin` and `verdict`. A filter the site does not understand is refused, never ignored.

## 1.34.0 · 12 October 2026

- list_wikidata_corrections: each correction’s `description`, what the entry says its subject is, as plain text of at most 300 characters: the entry’s subtitle (the item’s English description, where the Wikidata sync keeps it), else the start of its description; null with neither, or no entry.

## 1.33.0 · 12 October 2026

- get_entry_admin: `entity.retry_at`, when the sync tries the entry again after its last fetch from Wikidata failed (null when it did not fail). `synced_at` now only ever says when the sync last read the entry: a failed fetch no longer moves it.

## 1.32.0 · 12 October 2026

- propose_from_wikidata: copying an item’s handles, a handle the entry already has is now found by the key the site stores (letter case folded as the site folds it), so one that differs only by a letter whose case the site and a client fold differently (İx and ix on X) is no longer proposed again, a proposal the save refused whole. Its dry run’s `item.handles` carries each handle’s `value_norm`, as GET /api/wikidata/items/{qid} now does, beside the entry’s own in GET /api/editor/{vhid}.
- set_entry_setting and bulk_change_entries take follow_links: follow this entry’s handle links (its handle links are followed as a verified entry’s are), as the Entry manager’s switch does.

## 1.31.0 · 11 October 2026

- list_wikidata_corrections: a new kind it lists and filters by, bluesky_did — the suggestion job’s Bluesky DID (P12409) added as a qualifier on an item’s Bluesky handle (P12361) statement that has none, where the entry holds the handle and Bluesky gives its DID. Always an add_qualifier, reviewed by an administrator and made only while adding identifiers is switched on; never a kind a person may claim.

## 1.30.0 · 11 October 2026

- list_wikidata_corrections: a new kind it lists and filters by, discord_pair — the suggestion job’s Discord invite (P9078) added as a qualifier on an item’s Discord server ID (P9345) statement that has none, where the entry holds both. Always an add_qualifier, reviewed by an administrator and made only while adding identifiers is switched on; never a kind a person may claim.

## 1.29.0 · 11 October 2026

- New tool dismiss_wikidata_candidate: for an entry with no Wikidata item, set aside an item only its name found as not its subject (Console → Wikidata → Not on Wikidata’s “Not this item”), or put it back (undo: true). Once every item its name finds is set aside, the entry is “Not found on Wikidata” and may be proposed as a new item. Audited on the entry; nothing is written to Wikidata. Needs the Wikidata write-back permission. Dry run by default.

## 1.28.0 · 11 October 2026

- propose_wikidata_correction and propose_wikidata_changes: a preferred rank (set_rank, add_claim, supersede) that outranks only point-in-time values (each with a point in time, P585, and no start or end time: a follower count P8687, a population, a revenue) is no longer refused rank_choice_required: the newer value takes the preferred rank and the older ones stay normal with no end time, the dry run still naming them in makes_not_current (the step’s evidence.outranks_choice is "point_in_time"). `outranked` takes "point_in_time" to ask for that by name, refused not_point_in_time (naming them in not_point_in_time) when one of them has no point in time, or has a start or end time. Mixed cases still need "end_date" or "leave_normal".

## 1.27.0 · 11 October 2026

- New tool dismiss_wikidata_correction: withdraw one proposed Wikidata correction, the suggestion job’s or a person’s, with a `reason` kept in the audit, as the console’s Dismiss does (through its dismiss.json, which now takes a key with the Wikidata write-back permission). Dry run by default. Use it instead of filing a correction only to take another’s place.
- propose_wikidata_correction and propose_wikidata_changes: a JSON number given for a text or external-id property is filed as its digits (7411938 → "7411938"; it was refused bad_value), and a value that fails the property’s format constraint (P1793) is refused format_mismatch with the pattern, for add_claim, supersede and set_value. Their dry runs now list the open corrections a proposal would take the place of (`replaces`, and a line in `warning`), and a single correction’s answer carries the row filed (`ids`) and those replaced (`replaced`), as a group’s carries `ids`.

## 1.26.0 · 11 October 2026

- propose_wikidata_correction deprecates a dead account’s value with kind dead_account: an account the platform shows deleted, suspended or terminated, on a property of the platform catalog, filed whether or not VH still lists it, with evidence.why required and the same reason and source checks as kind suppressed, which still deprecates only a value taken off VH (not_suppressed otherwise). set_rank deprecated is held to the same reason rule. Either dry run, and the answer, now carries still_listed and a warning line, “Still listed on VH entry <vhid> (…): …”, naming each handle a live entry on the item still shows and who keeps it (kept_by): the Wikidata sync takes its own off once Wikidata ranks the statement deprecated and the handle-removal grace is out; a person’s it never does. propose_wikidata_correction’s dry run now also passes on the route’s makes_not_current and warning, as propose_wikidata_changes’ did.

## 1.25.0 · 11 October 2026

- get_wikidata_corrections: what became of Wikidata corrections by id or by group_id, whatever their state (pending, queued, applying, applied with its revisions, failed with why and whether it was tried, dismissed, resolved, undone), where list_wikidata_corrections shows only the pending ones. Each group carries constraint_results: Wikidata’s own constraint checks, which the site now runs on every statement a group made or changed once it is made, each issue marked as introduced by the group or there before. wait_seconds (up to 45) waits while anything named is still being made or checked, never on a reviewer.

## 1.24.0 · 11 October 2026

- upload_image takes a file of up to 70 MB (was 10 MB): its base64, up to 94 MB, now reaches the site whole, where before the site’s front end stopped a request over 11 MB (about 8 MB of file). The editor’s own file upload takes the same 70 MB. A request the site refuses unread (no key, a key that may not upload, a file over 70 MB) is answered with the site’s own JSON error, not the front end’s error page.

## 1.23.1 · 11 October 2026

- propose_new_entry’s dry run asks the site to check the proposal without queueing it (POST /api/entity?check=1), so refused_because now names what the real run would be refused for that the tool could not see before: a short name that is the address of a site redirect (short_is_redirect), a deleted entry or a merged-away item, a blocked word, or new entries paused.

## 1.23.0 · 11 October 2026

- propose_wikidata_correction takes move_to_item and copy_to_item: name a statement (qid, property, statement_guid, value_seen) and the item it goes to (other_qid). The site reads it live and files, on that item, a new statement with its whole value (a quantity’s range included), its qualifiers and its references exactly as read, at normal rank; a move then removes the statement, two steps of one group, the removal only once the copy is made and only while the statement is still exactly as read. A reference that cites a Wikimedia page is never copied: refused (wikimedia_reference) unless a reference is given to take its place. Refused when that item already states the value (already_listed) or a proposal to add it is open (already_proposed). The dry run’s would_file shows the new statement as the write wiki will get it (statement). propose_wikidata_changes takes either action as its only change.

## 1.22.0 · 11 October 2026

- find_by_handle, a public read that needs no key: which public entries list a handle — “is x.com/someone an official account, and whose?”. Give a profile’s address as url (https://x.com/someone, read as the editor reads a pasted one), or platform and value (twitter, someone or @someone). It answers each entry’s VHID, title and URL, the handle as the entry lists it and whether that handle is verified, verified first; an empty list when no entry lists it. Case is ignored where the platform ignores it; email addresses are not looked up. It is GET /api/v1/handles.

## 1.21.0 · 11 October 2026

- propose_wikidata_correction’s reference (add_claim, supersede, add_reference, replace_reference) takes "stated_in", an item id written as P248 “stated in” (the work or database the claim is made in, for a source with no stable page of its own, such as YouTube, Q8056784), alone or beside "url": "url" is no longer required when "stated_in" is given. A stated_in that is not an item id is refused (bad_reference), and one not on the write wiki (item_not_found); an add_reference stated in an item that a reference of the statement already states is already_referenced. A "url" on a Wikimedia project (wikidata.org, any Wikipedia, Commons, the other projects and w.wiki; an old revision included) is refused: wikimedia_reference, with “A reference must be the outside source, not a Wikimedia page: …”. The dry run’s would_file shows a statement’s or a reference’s reference as the write wiki will get it (reference_snaks, by that wiki’s ids).

## 1.20.0 · 11 October 2026

- propose_wikidata_correction takes a quantity’s range: wherever it takes a quantity (value, new_value, a qualifier’s value), {"amount","unit"} may carry "lowerBound" and "upperBound" — both or neither, decimals as the amount is, with the amount between them, else bad_value / bad_new_value / bad_qualifier with “A range needs both a lower and an upper bound, with the amount between them.” A bare amount and {"amount","unit"} are unchanged. A move left without new_value keeps the statement’s range. A quantity is compared whole: a range set on Wikidata since you read it, that still holds what you read, is no change (nor is a quantity qualifier whose hash moved for it); a set_value of the range alone (set or changed) is a change, made only while the range is as you read it, but one that only takes a range off is refused (bad_new_value) for now; and a quantity is already listed when the property states the same amount and unit, or a range of the same unit that holds its amount. value_seen keeps its words (“17000”); a set_value’s or a move’s new_value names the range, “17000 (17000–17099)”, as the review shows it.

## 1.19.0 · 10 October 2026

- create_path_redirect (and Console → Redirects) takes a key that is a path: letters, digits, “-”, “_” and “.”, in parts split by “/”, e.g. "vh-internal/index.php" for /vh-internal/index.php (at most 64; never ending in ".json"). Its first part follows the rules a one-word key did (never 11 digits, a page of the site’s own, or an entry’s short name, VHID or old address); its second is never an entry page’s (history, edit, …). A one-word key is unchanged, and the dry run’s test link names the path as it is.

## 1.18.0 · 9 October 2026

- Bing, for administrators, beside the Search Console tools: bing_report (Bing Webmaster Tools’ clicks and impressions, top queries and pages by Bing’s weekly periods, crawl days, crawl issues, sitemaps and page details, from what the site has fetched from Bing, by default the last 28 days stored as one total; filtered by query, page or entry), bing_sitemaps (the sitemaps Bing lists, whether this instance may resubmit one, and the last automatic resubmission after a release) and resubmit_bing_sitemap (by default /sitemap.xml; dry run by default, which asks Bing nothing). The resubmission is refused everywhere but production, before anything is sent to Bing, and is audited with Bing’s answer.

## 1.17.0 · 9 October 2026

- The tools that write through the entry routes — update_entry_fields, update_entry_handles, set_entry_image, set_entry_gallery, set_wikidata_ownership, update_entries, propose_entry_change, propose_entry_changes, propose_entry_revert, propose_from_wikidata and propose_new_entry — take an optional idempotency_key (1–255 printable ASCII, e.g. a UUID), sent as the write’s Idempotency-Key. Calling the tool again with the same key and the same change within 24 hours answers the first call’s result, marked replayed: true, and writes nothing; the same key with another change is refused (422 idempotency_key_reused), and while the first call is still running, 409 idempotency_key_in_progress. A dry run shows the header in would_send. A tool that re-reads the entry before writing still matches its first call: the base revision is not part of what is compared. update_entries’ confirm digest still names the request’s base revisions: give each edit its base_revision_id from the dry run, and a retry sends the same request.

## 1.16.0 · 9 October 2026

- update_entry_handles, update_entries, propose_entry_change and propose_entry_changes send the handles you add and remove as ops (add_handles / remove_handles), no longer the entry’s whole list: the server applies them to the list as it is when the edit is saved, or when the proposal is approved, so nothing is read first, an edit of handles alone carries no base revision, and two edits adding different handles never undo each other. An add of a handle the entry has, or a remove of one it has not, is no longer refused before sending: it changes nothing, and the route’s answer says so (handle_ops: added, removed, already_present, not_present; an edit of nothing else answers 400 no_changes). The dry runs show the ops in would_send and list in changes which would change nothing now (already_listed, not_listed). update_entry_handles’ remove takes an email this key may not see by its ref, and its base_revision_id is no longer sent. propose_entry_change with handle_order still sends the whole list, which an order is of.

## 1.15.0 · 9 October 2026

- Site redirects, for administrators: list_path_redirects lists Console → Redirects (each /<key> that 301s to a path on this site, with who added it, when and its note); create_path_redirect adds one and delete_path_redirect deletes one, as the page’s forms do. The key is one word that nothing on the site already answers for (an entry’s short name, VHID or old address, a page of the site’s own, another redirect’s key or target); the target is a same-site path, never another site, its own address or an address that redirects itself. Both writes are dry runs by default; the delete needs confirm set to the redirect’s exact key. Each is audited with the key and the tool, and takes the address off the site’s cache at once. A short name a redirect holds is refused to every entry write (short_is_redirect) until the redirect is deleted.

## 1.14.0 · 9 October 2026

- upload_image and upload_image_from_url take hold: true, which stores the image held for a proposal: /img serves it only to its uploader and to reviewers (private, never cached), it is in no list (the picker, media_catalog, the media API), and no live edit may use it. Only its uploader may name it in propose_entry_change (image_media_id or gallery); a reviewer’s approval of that proposal releases it, in the same step, and it is then an ordinary image. A rejected, withdrawn or superseded proposal leaves it held, never deleted. The real run answers held: true and seen_at in place of public_at; a dry run of propose_entry_change names a held image (held_image). Each hold, release and park is audited with the key and the tool.

## 1.13.0 · 9 October 2026

- upload_image uploads an image file you hold, sent as base64 with its file name, licence, credit and source, through the same upload as the editor’s “upload a file”: the same upload-images permission, 20 a minute, rights check and re-encode to WebP, audited with the key, the tool and the file name. At most 10 MB of file (base64 over that is refused before it is decoded); the site’s front end currently takes a request of at most 11 MB, so about 8 MB of file through this tool. Like upload_image_from_url, the image is public by its id once stored, before any review, and the real run answers its mediaId for propose_entry_change. Dry run by default; every run needs confirm_rights: true.

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
