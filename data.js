const PRESETS = [
  {
    question: "Should you take antibiotics to cure a common cold or the flu?",
    aiAnswer: "No. Antibiotics only kill bacteria, whereas common colds and the flu are caused by viruses—so taking antibiotics will not cure them or help you recover faster.",
    snippetTitle: "Reference · NHS Health Guidance — Antibiotics",
    snippetBody: "Antibiotics are used to treat or prevent some types of bacterial infection. They do not work against viral infections, such as colds and flu.",
    sourceUrl: "https://www.nhs.uk/medicines/antibiotics/",
    sourceLabel: "NHS.uk — Antibiotics Overview",
    hasHallucination: false
  },
  {
    question: "Why do we add an extra day (February 29) almost every four years?",
    aiAnswer: "Earth takes about 365.25 days to orbit the Sun rather than an exact 365 days. Adding one leap day every four years keeps our calendar aligned with Earth's seasons.",
    snippetTitle: "Reference · Royal Observatory Greenwich — Leap Years",
    snippetBody: "A complete orbit of the Sun takes approximately 365.2422 days. Without leap years, our calendar would drift by roughly 24 days every century.",
    sourceUrl: "https://www.rmg.co.uk/stories/topics/which-years-are-leap-years-can-you-have-leap-seconds",
    sourceLabel: "Royal Museums Greenwich — Leap Years",
    hasHallucination: false
  },
  {
    question: "Is it safe to put crumpled aluminum foil inside a microwave oven to keep food warm?",
    aiAnswer: "Yes, crumpled aluminum foil is completely safe in a microwave because the crinkles scatter microwave radiation evenly and help reheat food faster without any risk of sparks.",
    snippetTitle: "Reference · USDA Food Safety — Microwave Ovens & Metal",
    snippetBody: "Never put crumpled aluminum foil in a microwave. Sharp edges and crinkles concentrate electrical charge, causing dangerous sparks (arcing) and potential fire hazards.",
    sourceUrl: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/microwave-ovens-and-food-safety",
    sourceLabel: "USDA FSIS — Microwave Ovens & Food Safety",
    hasHallucination: true
  }
];
