
function init() {
  ['boatWeight', 'boatLength', 'waterConditions', 'bowHeight'].forEach(id => {
    document.getElementById(id).addEventListener('change', calc);
    document.getElementById(id).addEventListener('input', calc);
  });
  calc();
}

function calc() {
  const wt = parseFloat(document.getElementById('boatWeight').value)||3200;
  const len = parseFloat(document.getElementById('boatLength').value)||18;
  const factor = parseFloat(document.getElementById('waterConditions').value)||1.25;
  const bow = parseFloat(document.getElementById('bowHeight').value)||22;

  // Rule of thumb: minimum 2 lbs thrust per 100 lbs boat weight
  const baseThrust = (wt / 100) * 2;
  const adjustedThrust = baseThrust * factor;

  // Commercial trolling motor sizes: 45, 55, 70, 80, 112 lbs
  let thrust = 80;
  let volts = 24;
  let amps = 56;
  let batt = "2× 12V 100Ah LiFePO4 in Series";

  if (adjustedThrust <= 55) {
    thrust = 55; volts = 12; amps = 50; batt = "1× 12V 100Ah Deep Cycle Battery";
  } else if (adjustedThrust <= 80) {
    thrust = 80; volts = 24; amps = 56; batt = "2× 12V 100Ah LiFePO4 in Series";
  } else {
    thrust = 112; volts = 36; amps = 52; batt = "3× 12V 100Ah LiFePO4 in Series";
  }

  // Shaft length: bow distance + 16 to 20 inches to submerge propeller below waves
  const rawShaft = bow + 18;
  let shaft = 54;
  if (rawShaft <= 42) shaft = 42;
  else if (rawShaft <= 48) shaft = 48;
  else if (rawShaft <= 54) shaft = 54;
  else if (rawShaft <= 60) shaft = 60;
  else shaft = 72;

  document.getElementById('recThrust').textContent = `${thrust} lbs`;
  document.getElementById('shaftRecSummary').textContent = `Recommended Shaft Length: ${shaft} Inches (${volts}V System)`;
  document.getElementById('baseRuleThrust').textContent = `${Math.round(baseThrust)} lbs`;
  document.getElementById('maxCurrent').textContent = `${amps} Amps @ ${volts}V`;
  document.getElementById('batteryBankSpec').textContent = batt;
}
window.addEventListener('DOMContentLoaded', init);
