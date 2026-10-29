# Daily Slide for Rise Vision

Shows **one slide per school day** from your Canva presentations, in order, on a Rise Vision display. Animations play just as they do in Canva.

Rise points at **one web link** that never changes. Each day the page works out which deck and slide are due, then opens that Canva deck on that slide with Canva's play bar cropped out. Weekends and days off are skipped, so no slide is wasted. Edits you make in Canva show up automatically.

## What's in this folder

| File | What it does |
|---|---|
| `console.html` | **The control panel.** Add decks, click days off on a calendar, see which slide lands on which day. |
| `config.js` | The saved schedule. The console writes this for you. |
| `index.html` | The page Rise Vision displays. |
| `picker.js` | The scheduling rules (shared by the console and the display). |

## Setup (one time, ~10 minutes)

1. **Make each Canva deck viewable by link.** In Canva: Share → Access level → *Anyone with the link* → can view. Copy the long `canva.com/design/…/view` link.
2. **Put the folder on GitHub Pages (free):**
   - On github.com, click **New repository** (e.g. `daily-slide`) and make it **Public**.
   - Click **uploading an existing file**, drag in all the files, then **Commit changes**.
   - Go to **Settings → Pages**. Under Source pick *Deploy from a branch*, choose branch `main` and folder `/ (root)`, then **Save**.
   - After about a minute your site is at `https://<your-github-username>.github.io/daily-slide/`
3. **Add it to Rise Vision.** Create a presentation using the **Web Page / URL** component pointed at that link (full screen, scrollbars off). Add it to your schedule and save.

## Using the console

Open `https://<your-github-username>.github.io/daily-slide/console.html` (or double-click `console.html` on your computer).

- **Days off:** click any weekday on the calendar to mark it **OFF**, and click it again to undo. For a break, use *Block a range*. Later slides move forward on their own.
- **New deck (e.g. for December):** click **+ Add a deck**, then paste the Canva link and enter the number of slides. Choose how it starts:
  - **After previous** starts the school day after the last deck finishes. This is the usual choice.
  - **On date** starts on a specific day. If the previous deck isn't finished by then, the new deck takes over from that date and the console warns you how many slides get skipped.
- **Each deck gets its own colour** on the calendar, and every school day shows its slide number.
- **Save:** click **Copy config.js**. On GitHub, open `config.js`, click the pencil icon, select all, paste, then **Commit changes**. The screens update within a few minutes.

Your unsaved changes stay in the browser you used, so you can close the console and come back later. **Discard unsaved changes** goes back to what's on GitHub.

## Checking the display

- `…/daily-slide/?debug` shows today's deck and slide in the corner.
- `…/daily-slide/?date=2026-12-14&debug` previews any day.

## Notes

- The display reloads itself after midnight, so screens left on overnight move to the next slide.
- The display needs internet access. If a Canva design is made private or deleted, the screen goes blank on that deck's days.
- **Still see Canva's play bar, or slides look cropped?** Change "Hide Canva play bar" in the console (default 80).
- The console only creates text for you to paste. It can't change anything on GitHub by itself, so it's safe if someone else opens it.
