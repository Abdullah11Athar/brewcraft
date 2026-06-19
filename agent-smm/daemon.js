const fetch = require('node:fetch' in globalThis ? 'node:fetch' : 'node-fetch');

// Target Next.js server URL
const BACKEND_URL = process.env.BREWCRAFT_API_URL || 'http://localhost:3000';
const CHECK_INTERVAL_MS = 60 * 1000; // Check every 1 minute
let lastRunTime = 0;

console.log('===================================================');
console.log('🤖 BrewCraft SMM Agent Daemon Core Running 24/7 🤖');
console.log(`Backend API target URL: ${BACKEND_URL}`);
console.log('===================================================');

// Trigger SMM Agent crawling and drafting pipeline
async function triggerAgentCycle() {
  console.log(`[${new Date().toLocaleString()}] Daemon initiating search & draft cycle...`);
  try {
    const response = await fetch(`${BACKEND_URL}/api/smm/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`[SUCCESS] Agent drafted ${data.draftsCount} posts on topic: "${data.topic}"`);
    } else {
      const errText = await response.text();
      console.error(`[ERROR] SMM Agent API returned: ${response.status} - ${errText}`);
    }
  } catch (error) {
    console.error(`[CRITICAL ERROR] Failed to contact Next.js backend SMM API:`, error.message);
  }
}

// Check configuration settings
async function checkSchedule() {
  try {
    const response = await fetch(`${BACKEND_URL}/api/smm/settings`);
    if (!response.ok) {
      console.error(`[DAEMON] Failed to fetch settings: status ${response.status}`);
      return;
    }

    const settings = await response.json();
    const frequencyHours = settings.searchFrequencyHours || 12;
    const intervalMs = frequencyHours * 60 * 60 * 1000;
    const now = Date.now();

    // Initialize first run or run if interval elapsed
    if (lastRunTime === 0 || now - lastRunTime >= intervalMs) {
      lastRunTime = now;
      await triggerAgentCycle();
    } else {
      const remainingMinutes = Math.round((intervalMs - (now - lastRunTime)) / 60000);
      console.log(`[DAEMON] Idle check. Next content generation run in ${remainingMinutes} minutes.`);
    }

  } catch (error) {
    console.error(`[DAEMON] Error fetching schedule settings:`, error.message);
  }
}

// Start polling
console.log('Starting polling loop...');
checkSchedule();
setInterval(checkSchedule, CHECK_INTERVAL_MS);
