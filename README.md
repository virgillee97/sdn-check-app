# SecureScreen

SecureScreen is a web application designed to help businesses comply with regulatory requirements by screening customers against the Specially Designated Nationals (SDN) list. Using real-time data, SecureScreen ensures that transactions are safe and compliant by quickly identifying individuals or entities that are flagged by regulatory bodies.

## Features

- **Quick Screening:** Fast and efficient verification of customer details against the SDN list.
- **Real-Time Updates:** Always up-to-date with the latest SDN list to ensure accurate results.
- **User-Friendly Interface:** Simple and intuitive interface designed with Ant Design (AntD) for ease of use.

## Access

You can access the application at [SecureScreen](https://sdn-check-app.vercel.app/).

## Installation

To get started with SecureScreen, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/secure-screen.git
   cd secure-screen
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

### Environment Variables

Create a `.env.local` file in the root of your project and add your environment variables:

```env
NEXT_PUBLIC_OFAC_API_KEY=your-ofac-api-key
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```
