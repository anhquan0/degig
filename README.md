# 🚀 Degig - Decentralized Freelance Platform on Cardano

<div align="center">
  <img src="/public/assets/logo.png" alt="Degig Logo" width="200"/>
  <p><i>Revolutionizing freelancing with blockchain technology</i></p>
</div>

## 🌟 Overview

Degig is a cutting-edge decentralized freelance marketplace built on the Cardano blockchain. Our platform connects employers with talented freelancers while leveraging smart contracts to ensure secure, transparent, and fair transactions for all parties involved.

### ✨ Key Features

- **🔒 Secure Escrow System**: Funds are locked in smart contracts until work is completed and approved
- **💰 Transparent Payments**: All transactions are recorded on the Cardano blockchain
- **⚖️ Fair Dispute Resolution**: Independent arbitrators ensure fair resolution of any disputes
- **🔍 Project Tracking**: Milestone-based tracking for clear progress monitoring
- **💸 Low Fees**: Only 3-5% platform fee, significantly lower than traditional freelance platforms

## 🛠️ How It Works

### For Employers
1. **Post a Job** - Create a detailed job listing with requirements and budget in ADA
2. **Escrow Funds** - Secure your payment in a smart contract
3. **Review & Approve** - Track progress and release funds upon satisfactory completion

### For Freelancers
1. **Find Opportunities** - Browse available jobs matching your skills
2. **Submit Work** - Complete tasks and submit deliverables through the platform
3. **Get Paid** - Receive ADA directly to your wallet upon approval

### Dispute Resolution
- Three independent arbitrators vote to resolve disputes
- Only 1% additional fee for dispute resolution
- Transparent process with blockchain-based voting

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- Cardano wallet (compatible with Mesh SDK)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/degig.git
cd degig

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS 4
- **State Management**: Zustand, SWR for data fetching
- **UI Components**: Radix UI, Lucide React
- **Backend**: Next.js API Routes, Prisma ORM
- **Blockchain Integration**: Mesh SDK for Cardano
- **Testing**: Jest

## 📱 Responsive Design

Degig is fully responsive and optimized for all devices:
- 📱 Mobile-friendly interface
- 💻 Desktop-optimized experience
- 🔄 Seamless transitions between device sizes

## 🔐 Security

- Smart contract audits
- Secure wallet connections
- Data encryption for sensitive information
- Regular security updates

## 🌐 Deployment

The application can be deployed on Vercel:

```bash
npm run build
# or
yarn build
```

For production deployment, we recommend using the [Vercel Platform](https://vercel.com/new) for the best performance and reliability.

## 🤝 Contributing

We welcome contributions from the community! Please check out our [Contributing Guidelines](CONTRIBUTING.md) for more information on how to get involved.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact our support team at support@degig.io.

---

<div align="center">
  <p>© 2025 Degig - Empowering the future of work through blockchain technology</p>
</div>
