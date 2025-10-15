Here’s a single, clean README.md that covers both installation and running for your full-stack Next.js Smart Home Controller app:

# Smart Home Controller App

A full-stack Next.js application to manage smart home devices, scenes, and schedules.

---

## 🚀 Installation & Running

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/smart-home-controller.git
cd smart-home-controller

2️⃣ Install dependencies
npm install
# or
yarn install

3️⃣ Set up environment variables

Create a .env.local file in the root directory with:

NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/api


(Replace with deployed backend URL if needed)

4️⃣ Run the frontend
npm run dev
# or
yarn dev


Open http://localhost:3000
 in your browser.

5️⃣ Run the backend

Go to your backend folder:

cd backend
npm install
npm start


The backend should run at http://localhost:4000/api.

📦 Build for Production
npm run build
npm start