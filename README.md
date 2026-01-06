# Garments Order & Production Tracker System

## Project Overview

The Garments Order & Production Tracker System is a web-based platform designed for small and medium-sized garment factories to efficiently manage production workflow. It allows tracking orders from buyers, monitoring production stages (cutting, sewing, finishing), managing inventory, and ensuring timely delivery.

## Live Site Link

https://sunny-axolotl-1dff72.netlify.app

## Features

### Public Pages

* **Home**: Modern landing page with hero banner, product showcase, "How It Works", and customer feedback sections.
* **All Products**: Displays all products in a 3-column grid with essential information and a "View Details" button.
* **Product Details**: Shows detailed product information, images, demo video, price, category, and booking options.
* **About Us**: Information about the platform, vision, and values.
* **Contact**: Contact form, office address, email, and phone.
* **Authentication**: Email/password login and registration for buyers and managers.

### Dashboard Pages

#### Buyer

* **My Orders**: Table of all orders placed with status and payment info.
* **Track Order**: Timeline view of production and shipping updates for a specific order.
* **Profile**: Shows user info with logout option.

#### Manager

* **Add Product**: Form to add new products with images, video, and payment options.
* **Manage Products**: View and manage all products created by the manager.
* **Pending Orders**: Approve or reject orders.
* **Approved Orders**: Add tracking info and view order timeline.
* **Profile**: Manager info with logout option.

#### Admin

* **Manage Users**: View all users and manage roles.
* **All Products**: View and edit all products, toggle visibility on home page.
* **All Orders**: View all orders with details and tracking history.

### Additional Features

* Responsive design across all devices.
* Loading spinners for API calls.
* Toast/SweetAlert notifications for all CRUD actions.
* 404 Not Found page for invalid routes.
* Theme toggling (dark/light).
* JWT/Firebase login with token stored in cookies.
* Pagination on at least one page.
* Admin suspend modal with reason collection.

## Technologies Used

* React.js
* React Router DOM
* React Query
* Firebase Authentication
* MongoDB Atlas
* Express.js
* Node.js
* Stripe for online payments
* TailwindCSS for styling
* React Icons

## Notes

* Ensure Firebase domain is added for authorization if deployed.
* Users cannot place new orders if suspended.
* Existing orders remain viewable for suspended users.
* Manager cannot add new products or approve/reject orders if suspended.