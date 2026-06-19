const express = require('express');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
const PORT = 8000;

let sock = null;

async function connectToWhatsApp() {
  const authFolder = path.join(__dirname, 'auth_info_baileys');
  if (!fs.existsSync(authFolder)) {
    fs.mkdirSync(authFolder, { recursive: true });
  }

  const { state, saveCreds } = await useMultiFileAuthState(authFolder);

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false, // We will custom print it with helper
    defaultQueryTimeoutMs: undefined
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;
    
    if (qr) {
      console.log('\n--- SCAN THIS QR CODE WITH YOUR WHATSAPP TO CONNECT ---');
      qrcode.generate(qr, { small: true });
      console.log('-------------------------------------------------------\n');
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('WhatsApp connection closed due to ', lastDisconnect.error, ', reconnecting: ', shouldReconnect);
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('WhatsApp connection opened successfully! Bridge is ready.');
    }
  });

  sock.ev.on('creds.update', saveCreds);
}

// REST Endpoint to send message
app.post('/send-message', async (req, res) => {
  const { phone, message } = req.body;

  if (!sock) {
    return res.status(503).json({ error: 'WhatsApp socket is not initialized.' });
  }

  if (!phone || !message) {
    return res.status(400).json({ error: 'Phone and Message are required fields.' });
  }

  try {
    // Baileys format for phone: JID = phone@s.whatsapp.net
    // Must contain country code, e.g. 923171036774@s.whatsapp.net
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    const jid = `${cleanPhone}@s.whatsapp.net`;

    await sock.sendMessage(jid, { text: message });
    console.log(`WhatsApp message successfully sent to ${cleanPhone}`);
    return res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Failed to send WhatsApp message via bridge:', error);
    return res.status(500).json({ error: error.message || 'Failed to send message.' });
  }
});

// Health check
app.get('/status', (req, res) => {
  res.json({
    initialized: !!sock,
    connected: sock?.ws?.readyState === 1
  });
});

app.listen(PORT, () => {
  console.log(`WhatsApp Web Bridge Server running on http://localhost:${PORT}`);
  connectToWhatsApp().catch(err => console.error('Error starting WhatsApp client:', err));
});
