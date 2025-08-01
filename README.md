# 🗺️ OnnWay Tourism Route Optimizer

Smart tourism route planning for Istanbul and Tallinn.

## **Live Demo**
🌐 **Frontend:** https://onnway-tourism-routes.vercel.app

## **Why This Project?**

* **Smart Route Planning**: Optimizes walking routes between attractions
* **Multi-City Support**: Istanbul 🇹🇷 and Tallinn 🇪🇪
* **Personalized Experience**: Filter by activity, budget, and duration
* **Real-time Location**: Uses GPS for optimal starting point
* **Interactive Maps**: Visual route display with attraction details

## **Features**

### **Route Optimization**
* **Activity Types**: Food & Restaurants, Art & History, Social Media Spots, Adventure
* **Budget Ranges**: Budget Friendly, Mid Range, Premium
* **Duration Options**: Short (3-4 hours), Medium (1 day), Long (2+ days)
* **Smart Algorithm**: Nearest neighbor optimization for minimal walking

### **Interactive Experience**
* **Live Maps**: Leaflet-based route visualization
* **Attraction Details**: Full descriptions, costs, and durations
* **External Links**: Google Maps, Street View, TripAdvisor integration
* **Mobile Optimized**: Touch-friendly responsive design

## **Technical Architecture**

### **Frontend Stack**
* **React 18** + TypeScript
* **SCSS** with mobile-first design
* **Leaflet** for interactive mapping
* **Custom hooks** for geolocation

### **Backend Stack**
* **Spring Boot 3.5** + Java 21
* **PostgreSQL** with JPA/Hibernate
* **OSRM** for real walking distances
* **RESTful API** design

## **Quick Start**

### **Frontend**
```bash
npm install
npm start
```

### **Backend**
```bash
cd route
./mvnw spring-boot:run
```

## **API Usage**

### **Create Route**
```json
{
  "startLat": 41.0082,
  "startLon": 28.9784,
  "city": "ISTANBUL",
  "activity": "FOOD",
  "budget": "MID_RANGE",
  "duration": "MEDIUM"
}
```

### **Response**
```json
{
  "optimizedRoute": [
    {
      "order": 1,
      "name": "Galata Tower",
      "address": "Galata, Istanbul",
      "estimatedDuration": 60,
      "walkingTime": "8 min",
      "cost": 15.0
    }
  ],
  "totalDistance": "3.2 km",
  "totalDuration": "4h 30m",
  "totalCost": 45.50
}
```

## **Tech Stack**
* **Frontend**: React + TypeScript + SCSS + Leaflet
* **Backend**: Spring Boot + PostgreSQL + OSRM
* **Deployment**: Vercel + Google Cloud

## **Real-World Usage**

Perfect for:
* Tourism mobile apps
* City walking tours
* Travel planning websites
* Tourism businesses needing route optimization