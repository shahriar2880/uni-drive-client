# RentRental 🚗  
Your ultimate car rental platform to explore, manage, and book your preferred vehicles seamlessly.  

---

## Live Site 🌐  
[Visit RentRental](https://rent-rental.netlify.app/)  

---

## Features ✨  
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.  
- **Dynamic Car Management**: Add, update, and delete cars with seamless functionality.  
- **User Authentication**: Secure login and registration authentication and Google Sign-In.  
- **Search and Filters**: Search for cars by model, brand, or location with advanced filtering options.  
- **Booking System**: Book cars with real-time availability updates and manage bookings via the "My Bookings" page.  
- **Data Visualization**: Visualize daily rental prices using charts on the "My Bookings" page.  
- **Sorting Options**: Sort cars by date added (newest/oldest) or price (lowest/highest).  

---

## Pages and Functionality 📖  

### **Home Page**  
- **Banner Section**:  
  - Motivational heading like "Drive Your Dreams Today!"  
  - Call-to-action button ("View Available Cars") redirecting users to the "Available Cars" page.  
  - Full-width background video showcasing premium cars.  
- **Why Choose Us**:  
  - Highlights unique selling points like a wide variety of cars, affordable prices, easy booking, and 24/7 customer support.  
- **Recent Listings**:  
  - Showcase the latest 6-8 cars added to the platform in a card layout.  
  - Each card includes car image, model, daily price, availability, booking count, and date posted.  

### **Available Cars Page**  
- Display all available cars in a grid or card format.  
- Search functionality based on car model, brand, or location.  
- Toggle button to switch between grid and list views.  
- Sorting options: Date Added (Newest/Oldest) or Price (Lowest/Highest).  

### **Add Car Page (Private Route)**  
- Form for adding cars with fields:  
  - Car Model, Daily Rental Price, Availability, Vehicle Registration Number, Features, Description, Image File, Location.  
- Data stored in the database with toast notifications for success or failure.  

### **My Cars Page (Private Route)**  
- Tabular view of all cars added by the user.  
- Columns: Car Image, Car Model, Daily Rental Price, Booking Count, Availability, Date Added.  
- Actions: Update (via modal) and Delete (with confirmation modal).  
- Sorting options: Date Added (Newest/Oldest) or Price (Lowest/Highest).  

### **Car Details Page**  
- Detailed information about the selected car: Model, Price Per Day, Availability, Features, Images, Description.  
- "Book Now" button opens a confirmation modal summarizing booking details.  

### **My Bookings Page (Private Route)**  
- Tabular layout displaying all bookings made by the user.  
- Columns: Car Image, Car Model, Booking Date, Total Price, Booking Status, Actions (Modify Date, Cancel Booking).  
- Data visualization: Charts showing daily rental prices using Recharts.  

### **Authentication System**  
- **Login Page**:  
  - Email/Password or Google Sign-In.  
  - Redirects to the homepage upon successful login.  
- **Registration Page**:  
  - Fields: Name, Email, Password, Photo URL.  
  - Redirects to the login page upon successful registration.  
- **Private Routes**:  
  - Protect pages like "Add Car," "My Cars," "My Bookings," and "Manage Cars."  

---

## Technologies Used 🛠️  
- **Frontend**: React, React Router, Tailwind CSS.  
- **Backend**: Node.js, Express.js, MongoDB.  
- **Authentication**: Firebase Authentication with Google login support.  
- **Data Visualization**: Recharts for visualizing daily rental prices.  
- **Hosting**: Netlify for the client-side, Vercel for the server-side.  

---

## Additional Features 🚀  
- **Environment Variables**: Securely manage Firebase config keys and MongoDB credentials.  
- **404 Page**: User-friendly page with a "Back to Home" button for incorrect routes.  
- **Loading Spinner**: Visible when data is being fetched.  
- **Pagination**: Server-side pagination on the "My Cars" page (optional).  
- **Incremental Booking Updates**: Use MongoDB operators like `$inc` to track booking counts.  

---

## Optional Requirements 🌟  
1. **Server-Side Pagination**: Display five cars per page on the "My Cars" page.  
2. **Dynamic Search**: Search across all car data fields dynamically querying the backend. 