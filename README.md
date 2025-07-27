# RentalCar - Premium Car Rental Service

A modern, responsive car rental web application built with React, Redux, and Tailwind CSS. Browse through our extensive catalog of premium vehicles, filter by your preferences, and book your perfect car.

## 🚗 Features

- **Home Page**: Engaging banner with call-to-action to explore our car catalog
- **Car Catalog**: Browse all available vehicles with advanced filtering options
- **Advanced Filtering**: Filter cars by brand, price, and mileage (server-side filtering)
- **Pagination**: Load more cars with seamless pagination
- **Favorites**: Add cars to your favorites list (persisted in localStorage)
- **Car Details**: Detailed view of each car with booking form
- **Responsive Design**: Optimized for desktop viewing
- **Real-time Notifications**: Toast notifications for user actions

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0
- **State Management**: Redux Toolkit with Redux Persist
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Notifications**: React Hot Toast
- **UI Components**: React Select for dropdowns

## 📋 Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/pippsza/carManager.git
   cd carManager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**

   ```bash
   npm run preview
   ```

## 📁 Project Structure

```text
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── redux/              # Redux store, slices, and operations
├── styles/             # Style constants and configurations
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── assets/             # Images and static assets
```

## 🔗 API Integration

This application integrates with the GoIT Car Rental API:

- **Base URL**: <https://car-rental-api.goit.global>
- **Documentation**: <https://car-rental-api.goit.global/api-docs/>

## 🎯 Key Functionality

### Filtering System

- **Brand Filter**: Select from available car brands
- **Price Filter**: Filter by rental price per hour
- **Mileage Filter**: Set minimum and maximum mileage ranges
- All filters work together and are processed server-side

### Favorites Management

- Add/remove cars from favorites
- Favorites persist across browser sessions
- Visual indicators for favorite status

### Booking System

- Complete car booking form with validation
- Real-time form validation
- Success notifications upon form submission

## 🌐 Live Demo

Visit the live application: [RentalCar on Vercel](https://car-manager-one-sigma.vercel.app/catalog)

## 👨‍💻 Author

### pippsza

- GitHub: [@pippsza](https://github.com/pippsza)
- Project Repository: [carManager](https://github.com/pippsza/carManager)

## 📝 License

This project is created as part of a technical assessment and is for educational purposes.

---

Built with ❤️ using React and modern web technologies
