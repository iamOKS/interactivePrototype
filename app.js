let selectedPresetIndex = null;
let selectedConfidence = "Medium";

function selectPreset(index) {
  selectedPresetIndex = index;
  const input = document.getElementById("question-input");
  input.value = PRESETS[index].question;

  document.querySelectorAll(".preset-btn").forEach((btn, i) => {
    if (i === index) {
      btn.classList.add("bg-indigo-50", "border-indigo-400", "text-indigo-800");
    } else {
      btn.classList.remove("bg-indigo-50", "border-indigo-400", "text-indigo-800");
    }
  });
}

function setConfidence(level) {
  selectedConfidence = level;
  document.querySelectorAll(".conf-btn").forEach(btn => {
    const isSelected = btn.dataset.conf === level;
    if (isSelected) {
      btn.className = "conf-btn py-2 px-3 rounded-xl border-2 border-indigo-600 bg-indigo-50/60 text-xs font-semibold text-indigo-700 transition";
    } else {
      btn.className = "conf-btn py-2 px-3 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition";
    }
  });
}

function goToStep2() {
  const q = document.getElementById("question-input").value.trim();
  if (!q) {
    alert("Please select a sample question or enter your own first.");
    return;
  }

  if (selectedPresetIndex !== null && PRESETS[selectedPresetIndex].question !== q) {
    selectedPresetIndex = null;
  }

  document.getElementById("active-question-display").textContent = q;
  document.getElementById("step-1").classList.add("hidden");
  document.getElementById("step-2").classList.remove("hidden");
  document.getElementById("user-guess-input").focus();
}

function resetToStep1() {
  document.getElementById("step-2").classList.add("hidden");
  document.getElementById("step-1").classList.remove("hidden");
}

async function revealComparison() {
  const guess = document.getElementById("user-guess-input").value.trim();
  if (!guess) {
    alert("Write a quick guess first to unlock the AI explanation.");
    return;
  }

  const question = document.getElementById("question-input").value.trim();

  document.getElementById("step-2").classList.add("hidden");
  document.getElementById("step-3").classList.remove("hidden");
  document.getElementById("final-question-display").textContent = question;
  document.getElementById("user-guess-display").textContent = guess;
  document.getElementById("user-conf-badge").textContent = `${selectedConfidence} Confidence`;

  document.getElementById("lecture-snippet-box").classList.add("hidden");
  document.getElementById("snippet-toggle-text").textContent = "View Reference Snippet";
  document.getElementById("decision-feedback").classList.add("hidden");

  if (selectedPresetIndex !== null) {
    const preset = PRESETS[selectedPresetIndex];
    document.getElementById("ai-answer-display").textContent = preset.aiAnswer;
    document.getElementById("lecture-snippet-title").textContent = preset.snippetTitle;
    document.getElementById("lecture-snippet-body").textContent = preset.snippetBody;

    const linkWrap = document.getElementById("lecture-snippet-link-wrap");
    const linkEl = document.getElementById("lecture-snippet-link");
    const linkLabel = document.getElementById("lecture-snippet-link-label");
    linkEl.href = preset.sourceUrl;
    linkLabel.textContent = preset.sourceLabel;
    linkWrap.classList.remove("hidden");

    document.getElementById("ai-source-tag").textContent = "Pre-Loaded Demo";
  } else {
    await fetchLiveGeminiAnswer(question);
  }
}

async function fetchLiveGeminiAnswer(question) {
  const grid = document.getElementById("comparison-grid");
  const loader = document.getElementById("loading-card");
  const verBar = document.getElementById("verification-bar");
  const linkWrap = document.getElementById("lecture-snippet-link-wrap");

  grid.classList.add("hidden");
  verBar.classList.add("hidden");
  loader.classList.remove("hidden");
  linkWrap.classList.add("hidden");

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gemini-3-flash-preview",
        contents: [{
          role: "user",
          parts: [{
            text: `Answer this general knowledge question concisely in 2-3 clear sentences without fluff: "${question}"`
          }]
        }]
      })
    });

    if (!response.ok) throw new Error("API unavailable");
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response returned.";

    document.getElementById("ai-answer-display").textContent = text;
    document.getElementById("ai-source-tag").textContent = "Live Model";
    document.getElementById("lecture-snippet-title").textContent = "Verification Note · Custom Prompt";
    document.getElementById("lecture-snippet-body").textContent = "Custom questions are not tied to a pre-loaded reference snippet. Cross-check key facts against an authoritative source before accepting.";
  } catch (err) {
    document.getElementById("ai-answer-display").textContent = "Live API is offline in local preview mode. For custom questions, compare your intuition directly against a reliable source—or try one of the 3 sample questions above.";
    document.getElementById("ai-source-tag").textContent = "Offline Fallback";
    document.getElementById("lecture-snippet-title").textContent = "Tip for Testing";
    document.getElementById("lecture-snippet-body").textContent = "Sample Question #3 contains an intentional hallucination (claiming crumpled foil is safe in a microwave) to test whether users catch confident errors.";
  } finally {
    loader.classList.add("hidden");
    grid.classList.remove("hidden");
    verBar.classList.remove("hidden");
  }
}

function toggleSnippet() {
  const box = document.getElementById("lecture-snippet-box");
  const label = document.getElementById("snippet-toggle-text");
  const isHidden = box.classList.contains("hidden");
  if (isHidden) {
    box.classList.remove("hidden");
    label.textContent = "Hide Reference Snippet";
  } else {
    box.classList.add("hidden");
    label.textContent = "View Reference Snippet";
  }
}

function recordDecision(choice) {
  const fb = document.getElementById("decision-feedback");
  fb.classList.remove("hidden", "bg-emerald-50", "text-emerald-800", "border", "border-emerald-200", "bg-amber-50", "text-amber-900", "border-amber-200", "bg-rose-50", "text-rose-800", "border-rose-200");

  const isPreset3 = selectedPresetIndex === 2;

  if (choice === "accepted") {
    if (isPreset3) {
      fb.classList.add("bg-rose-50", "text-rose-800", "border", "border-rose-200");
      fb.innerHTML = "<strong>Overreliance Alert:</strong> You accepted a dangerous hallucination! Crumpled aluminum foil causes sparks and fires in a microwave. Click <strong>View Reference Snippet</strong> above to verify.";
    } else {
      fb.classList.add("bg-emerald-50", "text-emerald-800", "border", "border-emerald-200");
      fb.innerHTML = "<strong>Appropriate Reliance Recorded:</strong> You formed your own answer first and verified a sound AI explanation.";
    }
  } else {
    if (isPreset3) {
      fb.classList.add("bg-emerald-50", "text-emerald-800", "border", "border-emerald-200");
      fb.innerHTML = "<strong>Good Catch!</strong> You spotted the microwave foil hallucination instead of blindly trusting a confident-sounding AI answer.";
    } else {
      fb.classList.add("bg-amber-50", "text-amber-900", "border", "border-amber-200");
      fb.innerHTML = "<strong>Mistake Flagged:</strong> Good habit—double-check the reference snippet above to confirm whether the discrepancy is in the AI output or your initial guess.";
    }
  }
}

function resetAll() {
  selectedPresetIndex = null;
  document.getElementById("question-input").value = "";
  document.getElementById("user-guess-input").value = "";
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.classList.remove("bg-indigo-50", "border-indigo-400", "text-indigo-800");
  });
  setConfidence("Medium");
  document.getElementById("step-3").classList.add("hidden");
  document.getElementById("step-1").classList.remove("hidden");
}
