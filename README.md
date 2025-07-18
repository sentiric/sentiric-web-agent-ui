# Sentiric Web Agent UI

**Description:** A browser-based agent interface for customer service representatives or other end-users to manage voice and text interactions with the Sentiric platform.

**Core Responsibilities:**
*   Initiating and receiving voice calls (potentially using WebRTC and integrating with `sentiric-sip-client-sdk`).
*   Displaying text responses from `sentiric-agent-service`.
*   Showing dialogue history and relevant customer/contextual information (fetched via connectors).
*   Providing a rich user experience for agents.

**Technologies:**
*   JavaScript/TypeScript (e.g., React, Vue, Angular)
*   Node.js (for development server)
*   WebRTC (for real-time voice communication).

**API Interactions (As an API Client):**
*   Consumes APIs provided by `sentiric-api-gateway-service` (for `sentiric-agent-service` and other relevant APIs).
*   Communicates with `sentiric-sip-server` via `sentiric-sip-client-sdk` for WebRTC-based SIP/voice streams.

**Local Development:**
1.  Clone this repository: `git clone https://github.com/sentiric/sentiric-web-agent-ui.git`
2.  Navigate into the directory: `cd sentiric-web-agent-ui`
3.  Install dependencies: `npm install`
4.  Create a `.env` file from `.env.example` to configure the API Gateway URL.
5.  Start the development server: `npm start` (or `npm run dev`).

**Configuration:**
Refer to `config/` or `src/` directories and `.env.example` for UI-specific configurations.

**Deployment:**
This is a frontend application, typically deployed as static files served by a web server (e.g., Nginx) or a CDN. Refer to `sentiric-infrastructure`.

**Contributing:**
We welcome contributions! Please refer to the [Sentiric Governance](https://github.com/sentiric/sentiric-governance) repository for coding standards and contribution guidelines.

**License:**
This project is licensed under the [License](LICENSE).
