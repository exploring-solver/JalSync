# JalSync

JalSync is a comprehensive mobile-based solution designed for the efficient operation and maintenance of drinking water supply schemes. It integrates asset management, financial control, and condition-based maintenance to optimize water infrastructure management at the Gram Panchayat level.

## Table of Contents

- [Overview](#overview)
- [How It Addresses the Problem](#how-it-addresses-the-problem)
- [Innovation and Uniqueness](#innovation-and-uniqueness)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

Developed for the **Smart India Hackathon 2024** (Problem Statement 1709 for the Ministry of Jal Shakti), JalSync offers a unified platform to manage drinking water supply schemes effectively. It provides real-time GIS-based asset tracking and AI/ML-powered predictive maintenance to ensure uninterrupted water supply at the grassroots level.

## How It Addresses the Problem

- **Real-Time Asset Tracking**: Utilizes GIS technology for live monitoring of water infrastructure assets, enabling quick response to issues.
- **Predictive Maintenance**: Employs AI/ML algorithms to forecast equipment failures, reducing downtime and maintenance costs.
- **Automated Inventory Management**: Features demand forecasting to maintain optimal stock levels of consumables and spare parts.
- **Financial Transparency**: Streamlines financial management with automated bill generation and integrated payment gateways.
- **User-Friendly Dashboards**: Provides analytical and customizable dashboards with multilingual support for informed decision-making by GPs, PHED, and consumers.

## Innovation and Uniqueness

- **AI-Driven Demand Forecasting**: Ensures timely replenishment of consumables and spare parts, reducing stockouts and optimizing inventory levels.
- **Predictive Maintenance Analyzer**: Uses machine learning to predict system failures, enabling proactive maintenance and reducing costly breakdowns.
- **User-Centric Design**: Offers seamless dashboards for Gram Panchayats, PHED staff, and consumers on both mobile and web platforms.
- **All-in-One Solution**: Integrates multiple functionalities—billing, inventory, GIS, asset management—into a single, accessible platform.

## Key Features

- **JalSync Mobile App**
- **Billing, Inventory, GIS, and Asset Management Dashboard**
- **Web-Based Financial Control Center**
- **Individual, PHED & Gram Panchayat Dashboards**
- **AI/ML Demand Forecasting**
- **Maintenance and Repair Tracking**
- **Predictive Maintenance Analyzer**
- **Multilingual Support**

## Technology Stack

- **Front-end**:
  - **Mobile App**: React Native
  - **Web App**: React.js, Material UI, Tailwind CSS
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB
- **Machine Learning Libraries**: TensorFlow, Scikit-learn, Pandas, NumPy
- **GIS Integration**: Leaflet.js, OpenLayers
- **Payment Gateway**: Integration with popular gateways like Razorpay or Paytm
- **APIs**: RESTful APIs for communication between services
- **Version Control**: Git, GitHub

## Installation

### Prerequisites

- **Node.js** (v14.x or higher)
- **MongoDB**
- **Git**
- **React Native CLI** (for mobile app development)
- **Android Studio/Xcode** (for running the mobile app on emulators)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/exploring-solver/jalsync.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd jalsync
   ```

3. **Install Dependencies**

   - **Server**

     ```bash
     cd server-main
     npm install
     ```

   - **Web Client**

     ```bash
     cd ../web-main
     npm install
     ```

   - **Mobile App**

     ```bash
     cd ../mobile-app
     npm install
     ```

4. **Set Up Environment Variables**

   Create a `.env` file in the `server`, `web-client`, and `mobile-app` directories with the necessary environment variables.

5. **Run the Application**

   - **Server**

     ```bash
     cd server
     npm start
     ```

   - **Web Client**

     ```bash
     cd ../web-client
     npm start
     ```

   - **Mobile App**

     ```bash
     cd ../mobile-app
     react-native run-android  # For Android
     react-native run-ios      # For iOS
     ```

6. **Access the Application**

   - **Web Client**: Open your browser and navigate to `http://localhost:3000`.
   - **Mobile App**: The app should be running on your emulator or physical device.

## Usage

- **Gram Panchayats (GPs)**:
  - Manage water supply schemes through the mobile app or web dashboard.
  - Monitor assets in real-time using GIS mapping.
  - Access predictive maintenance reports to schedule repairs.

- **Public Health Engineering Department (PHED) Staff**:
  - Oversee multiple GPs from a centralized dashboard.
  - Manage inventory and financials.
  - Generate analytical reports for informed decision-making.

- **Consumers**:
  - View bills and make payments through the mobile app.
  - Report issues directly to GPs or PHED.
  - Receive notifications about maintenance and water supply status.

## Acknowledgments

- **Smart India Hackathon 2024**: Developed for Problem Statement 1709 for the Ministry of Jal Shakti.
- **Open-Source Libraries**: Thanks to the developers of React.js, React Native, Node.js, Express.js, MongoDB, TensorFlow, Scikit-learn, Material UI, and Tailwind CSS.

---