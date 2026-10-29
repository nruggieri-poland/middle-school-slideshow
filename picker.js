// Shared scheduling logic used by both index.html (the display) and console.html (the editor).
// Rules:
//  - Only weekdays that aren't in `holidays` are school days. Each school day uses one slide.
//  - Decks run in list order. A deck with startDate "auto" begins the school day after the
//    previous deck's last slide. A deck with a date starts on that date (or the next school day).
//  - If two decks overlap, the one that started later wins that day.
(function (root) {
  function iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function parse(s) { var p = String(s).split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function addDays(d, n) { var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() + n); return x; }

  function tools(config) {
    var hol = {};
    (config.holidays || []).forEach(function (h) { hol[h] = true; });
    var isSchoolDay = function (d) { var w = d.getDay(); return w !== 0 && w !== 6 && !hol[iso(d)]; };
    var nextSchoolDay = function (d) { var x = new Date(d); var g = 0; while (!isSchoolDay(x) && g++ < 400) x = addDays(x, 1); return x; };
    return { isSchoolDay: isSchoolDay, nextSchoolDay: nextSchoolDay };
  }

  // Older single-deck configs still work.
  function deckList(config) {
    if (config.decks && config.decks.length) return config.decks;
    if (config.canvaUrl) return [{ name: "Deck 1", canvaUrl: config.canvaUrl, startDate: config.startDate, slideCount: config.slideCount }];
    return [];
  }

  // Returns each deck with its real first and last slide dates and a map of date -> slide number.
  function resolveDecks(config) {
    var t = tools(config), out = [], prevEnd = null;
    deckList(config).forEach(function (d, i) {
      var count = Math.max(1, parseInt(d.slideCount, 10) || 1);
      var start;
      if (!d.startDate || d.startDate === "auto") {
        if (!prevEnd) return; // the first deck needs a real date
        start = t.nextSchoolDay(addDays(prevEnd, 1));
      } else {
        start = t.nextSchoolDay(parse(d.startDate));
      }
      var days = {}, cur = start, n = 0, end = start;
      while (n < count) {
        if (t.isSchoolDay(cur)) { n++; days[iso(cur)] = n; end = cur; }
        cur = addDays(cur, 1);
      }
      out.push({
        index: i, name: d.name || "Deck " + (i + 1), canvaUrl: d.canvaUrl || "", slideCount: count,
        auto: !d.startDate || d.startDate === "auto",
        start: iso(start), end: iso(end), days: days
      });
      prevEnd = end;
    });
    return out;
  }

  // What should show on a given date: { deck, slide } or null for a day off / nothing scheduled.
  function pickToday(config, date) {
    var key = iso(date), best = null;
    resolveDecks(config).forEach(function (r) {
      if (r.days[key] && (!best || r.start >= best.deck.start)) best = { deck: r, slide: r.days[key] };
    });
    return best;
  }

  // The deck that most recently started on/before the date (or the first one), for off-day screens.
  function currentDeck(config, date) {
    var key = iso(date), decks = resolveDecks(config), pick = decks[0] || null;
    decks.forEach(function (r) { if (r.start <= key && (!pick || r.start >= pick.start)) pick = r; });
    return pick;
  }

  var api = { iso: iso, parse: parse, resolveDecks: resolveDecks, pickToday: pickToday, currentDeck: currentDeck };
  root.DailySlide = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
