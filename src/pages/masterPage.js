/**
 * ═══════════════════════════════════════════════════
 *  SOMYNENCE NEURAL HEARTBEAT — MASTER PAGE (V49)
 *  Global monitor for the alt-vibe.net ecosystem.
 *  Polls the Genesis Helix bridge for live telemetry.
 * ═══════════════════════════════════════════════════
 */
import { fetch } from 'wix-fetch';
import { getUserSubscriptionTier } from 'backend/subscriptionChecker';

const BRIDGE_URL = 'https://c94a0c21-09b3-4340-9b51-81cafcbba6f7-00-3lwwfp71ahcx0.spock.replit.dev:8000';
let heartbeatInterval = null;

$w.onReady(async function () {
  console.log("⚡ Somynence Brain: Online");
  await manageSiteWideAds();
  startHeartbeatPulse();
});

// ─── NEURAL HEARTBEAT ───────────────────────────────
async function startHeartbeatPulse() {
  // Initial pulse
  await fetchAndApplyPulse();
  // Continuous polling every 3 seconds
  heartbeatInterval = setInterval(fetchAndApplyPulse, 3000);
}

async function fetchAndApplyPulse() {
  try {
    const response = await fetch(`${BRIDGE_URL}/status`, { method: 'get' });
    if (response.ok) {
      const status = await response.json();
      updateVisualPulse(status);
    }
  } catch (err) {
    console.warn("⚠ Pulse Lost: Reconnecting...");
  }
}

function updateVisualPulse(status) {
  // Extract telemetry
  const loss = status.loss || 0;
  const step = status.step || 0;
  const chemicals = status.chemicals || {};
  const dopamine = chemicals.dopamine || 0.5;
  const cortisol = chemicals.cortisol || 0.3;

  // Compute visual state
  const isCalm = dopamine > cortisol;
  const pulseColor = isCalm ? '#00FFCC' : '#FF0055';
  const glowIntensity = Math.min(1, Math.max(0.2, 1 - loss));

  // Apply to site elements (these IDs must exist on the page)
  try {
    if ($w('#neuralPulse')) {
      $w('#neuralPulse').style.color = pulseColor;
      $w('#neuralPulse').style.backgroundColor = pulseColor;
    }
  } catch (e) { /* Element may not exist on every page */ }

  try {
    if ($w('#statusText')) {
      $w('#statusText').text = `Step ${step} | Loss: ${loss.toFixed(4)} | D:${dopamine.toFixed(2)} C:${cortisol.toFixed(2)}`;
    }
  } catch (e) { /* Optional element */ }
}

// ─── EXISTING AD MANAGEMENT ─────────────────────────
async function manageSiteWideAds() {
  try {
    const subscriptionInfo = await getUserSubscriptionTier();
    if (subscriptionInfo.showAds) {
      enableAdSense();
    } else {
      disableAdSense();
    }
  } catch (error) {
    console.error('Error managing site-wide ads:', error);
    enableAdSense();
  }
}

function enableAdSense() {
  console.log('AdSense enabled for free tier user');
}

function disableAdSense() {
  console.log('AdSense disabled for paid subscriber');
}

export function onLogin(event) {
  manageSiteWideAds();
}

export function onLogout(event) {
  enableAdSense();
}
