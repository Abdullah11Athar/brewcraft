import { getSettings, addLog } from './smm-db';

interface SendAlertResponse {
  success: boolean;
  message: string;
}

export async function sendWhatsAppAlert(text: string): Promise<SendAlertResponse> {
  const settings = await getSettings();
  const phone = settings.whatsappNumber;
  const alertType = settings.whatsappAlertType;

  if (!phone) {
    await addLog('warn', 'WhatsApp phone number not configured. Skipping alert.');
    return { success: false, message: 'Phone number not configured.' };
  }

  await addLog('info', `Attempting to send WhatsApp alert via ${alertType} to ${phone}`);

  try {
    if (alertType === 'none') {
      await addLog('info', `[Mock Alert] WhatsApp to ${phone}: ${text}`);
      return { success: true, message: 'Mock alert logged.' };
    }

    if (alertType === 'callmebot') {
      const apiKey = settings.callmebotApiKey;
      if (!apiKey) {
        await addLog('warn', 'CallMeBot API key not configured. Logging mock alert instead.');
        await addLog('info', `[CallMeBot Alert Mock] ${text}`);
        return { success: false, message: 'CallMeBot API key missing.' };
      }

      const cleanPhone = phone.replace(/\+/g, '').trim();
      const url = `https://api.callmebot.com/whatsapp.php?phone=${cleanPhone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`;
      
      const response = await fetch(url);
      if (response.ok) {
        await addLog('info', 'WhatsApp alert sent successfully via CallMeBot.');
        return { success: true, message: 'Alert sent via CallMeBot.' };
      } else {
        const errText = await response.text();
        await addLog('error', `CallMeBot API returned error: ${errText}`);
        return { success: false, message: `CallMeBot error: ${errText}` };
      }
    }

    if (alertType === 'whatsapp_web') {
      const url = `http://localhost:8000/send-message`;
      const cleanPhone = phone.replace(/\+/g, '').replace(/\s/g, '').trim();

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          message: text
        })
      });

      if (response.ok) {
        await addLog('info', 'WhatsApp alert sent successfully via local WhatsApp Web bridge.');
        return { success: true, message: 'Alert sent via WhatsApp Web bridge.' };
      } else {
        const errText = await response.text();
        await addLog('error', `WhatsApp Web bridge returned error: ${errText}`);
        return { success: false, message: `WhatsApp Web bridge error: ${errText}` };
      }
    }

    if (alertType === 'twilio') {
      const sid = settings.twilioAccountSid;
      const token = settings.twilioAuthToken;
      const from = settings.twilioFromNumber;

      if (!sid || !token || !from) {
        await addLog('warn', 'Twilio credentials incomplete. Logging mock alert instead.');
        await addLog('info', `[Twilio Alert Mock] ${text}`);
        return { success: false, message: 'Twilio credentials missing.' };
      }

      const basicAuth = Buffer.from(`${sid}:${token}`).toString('base64');
      const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

      const details: Record<string, string> = {
        To: `whatsapp:${phone.startsWith('+') ? phone : '+' + phone}`,
        From: `whatsapp:${from.startsWith('+') ? from : '+' + from}`,
        Body: text
      };

      const formBody = Object.keys(details)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
        .join('&');

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`
        },
        body: formBody
      });

      if (response.ok) {
        await addLog('info', 'WhatsApp alert sent successfully via Twilio.');
        return { success: true, message: 'Alert sent via Twilio.' };
      } else {
        const errJson = await response.json();
        await addLog('error', `Twilio API returned error: ${JSON.stringify(errJson)}`);
        return { success: false, message: `Twilio error: ${errJson.message}` };
      }
    }

    return { success: false, message: 'Unsupported alert type.' };
  } catch (error: any) {
    await addLog('error', `Failed to send WhatsApp alert: ${error.message || error}`);
    return { success: false, message: error.message || 'Error occurred.' };
  }
}
