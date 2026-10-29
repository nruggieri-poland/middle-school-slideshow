// ============================================================
//  Easiest way to edit this: open console.html, make changes,
//  click "Copy config.js", and paste it over this file on GitHub.
// ============================================================
window.DAILY_SLIDE_CONFIG = {
  // Each deck is one Canva presentation. They play in this order, one slide per school day.
  //   startDate: "YYYY-MM-DD"  starts on that date (or the next school day after it)
  //   startDate: "auto"        starts the school day after the previous deck's last slide
  decks: [
    {
      name: "November: Empathy & Gratefulness",
      canvaUrl: "https://www.canva.com/design/DAHZTvemFQ8/VvbQWPKa9Y0auGsqDiOdBw/view",
      startDate: "2026-11-02",
      slideCount: 26
    }
  ],

  // Weekdays with no school. These are skipped, so no slide is used up on them.
  holidays: [
    "2026-11-25", // Wed, Nov 25
    "2026-11-26", // Thu, Nov 26
    "2026-11-27" // Fri, Nov 27
  ],

  // On weekends/days off: 0 = black screen, a number = that slide of the current deck,
  // or an image file name in this folder such as "fallback.png".
  offDayShows: 0,

  // Hides Canva's play bar along the bottom. Raise if you still see it; lower if slides look cropped.
  hideControlsPx: 80
};
