# BrewCraft Social Media Manager Agent - AWS Deployment Guide

This folder contains the background service daemon and the WhatsApp Web bridge. These processes run 24/7 on your server to automate web searches, draft posts, and alert you on WhatsApp for approval.

---

## 🛠️ Step 1: Getting Your API Keys & Credentials

To enable full posting functionality, you can obtain developer API keys from the links below. You can enter them directly into the **Settings** tab of the BrewCraft SMM Admin Dashboard.

### 1. AI Copywriting Keys (OpenRouter / Gemini / OpenAI)
- **Google Gemini (Recommended/Free tier)**: Get a free key at [Google AI Studio](https://aistudio.google.com/)
- **OpenRouter (Multiple models)**: Create an account and get a key at [OpenRouter Console](https://openrouter.ai/)
- **OpenAI (ChatGPT)**: Get a key at [OpenAI Developer Platform](https://platform.openai.com/api-keys)

### 2. Free WhatsApp Self-Alert Key (CallMeBot)
If you want free WhatsApp alerts sent to your phone:
1. Add the contact **+34 621 02 40 80** to your phone.
2. Send this exact message on WhatsApp: `I allow callmebot to send me messages`
3. The bot will instantly reply with your free **API Key**. Copy this into the settings page!

### 3. Social Media Platforms
- **Twitter/X API**: Go to the [X Developer Portal](https://developer.x.com/) to create a Project, set User Authentication settings to **Read and Write**, and generate API Keys, Secret, and Access Tokens.
- **LinkedIn API**: Create an app on the [LinkedIn Developer Portal](https://developer.linkedin.com//) and request the **Share on LinkedIn** product permissions to obtain an Access Token.
- **Meta (Facebook Pages & Instagram)**: Create a developer app on [Meta Developers](https://developers.facebook.com/), obtain a Page Access Token, and get your Page ID and Instagram Business Account ID.
- **Threads API**: Meta recently opened the Threads API. You can register your app under [Meta Developers Threads API](https://developers.facebook.com/docs/threads/) to get a Threads user access token.
- **Resend (Email Newsletters)**: Create a free account at [Resend](https://resend.com/) to get an API key (`re_...`) to send premium HTML newsletters.

---

## 🐳 Step 2: Hosting 24/7 on AWS EC2 (Free Tier)

You can run this system on a free-tier **AWS EC2 instance** (e.g. `t2.micro` running Ubuntu) because we built it to be lightweight (no heavy headless Chrome browsers).

### 1. Spin up an EC2 Instance
1. Go to your **AWS Console** > **EC2** > **Launch Instance**.
2. Select **Ubuntu Server 24.04 LTS** (eligible for Free Tier).
3. Set Instance type to **t2.micro** (free) or **t3.micro**.
4. Configure Security Group:
   - Allow **SSH** (Port 22) from your IP.
   - Allow **TCP Port 3000** (Next.js server) and **TCP Port 8000** (WhatsApp bridge API) if you plan to access them directly.
5. Launch and download your key pair (`.pem`).

### 2. Install Docker & Docker Compose on the Instance
SSH into your instance and run the following commands:
```bash
# Update packages
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
sudo apt-get install -y docker.io docker-compose

# Start and enable Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to the docker group
sudo usermod -aG docker $USER
```
*(Log out and log back in to apply group settings).*

### 3. Deploy the SMM Agent
1. Copy the `agent/` folder and your Next.js application to the EC2 server (or clone your repository).
2. Navigate into the `agent` folder:
   ```bash
   cd coffee/agent
   ```
3. Open `docker-compose.yml` and set the `BREWCRAFT_API_URL` environment variable to your Next.js application address (e.g. `http://your-ec2-ip:3000` or `https://yourdomain.com`).
4. Spin up the containers:
   ```bash
   docker compose up -d --build
   ```

---

## 📲 Step 3: Scan the WhatsApp QR Code

If you chose the **WhatsApp Web Local Bridge** in settings, you need to connect your WhatsApp account:

1. Run the following command on your EC2 instance to view the live logs of the bridge:
   ```bash
   docker compose logs -f whatsapp-bridge
   ```
2. You will see a **QR Code** printed in the terminal logs.
3. Open WhatsApp on your phone, go to **Settings** > **Linked Devices** > **Link a Device**.
4. Scan the QR code in your terminal.
5. Once connected, the console will print `WhatsApp connection opened successfully!`. You can now press `Ctrl+C` to exit the logs. The agent will run quietly in the background!
