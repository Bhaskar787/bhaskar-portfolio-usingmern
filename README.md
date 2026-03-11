Bhaskar Portfolio (MERN + Next.js)
- A modern full-stack developer portfolio built using Next.js, React, Node.js, Express.js, and MongoDB.
- 🌐 Public portfolio website
- 🔐 Admin authentication system
- 📁 Project management dashboard
- 📬 Contact message management
- ⚡ Deployed frontend and backend

Live Demo
Frontend (Deployed on Vercel)
<a href="(https://bhaskar-portfolio-usingmern.vercel.app/)" target="_blank">
<img width="800" height="800" alt="image" src="https://github.com/user-attachments/assets/5df8d456-c0b6-4fec-b47e-1462e14a2a8a" />
<a/>

Backend API (Deployed on Render)
- https://bhaskar-portfolio-usingmern.onrender.com/


Tech Stack
Frontend
| Technology     | Purpose                                               |
| -------------- | ----------------------------------------------------- |
| Next.js        | React framework for server-side rendering and routing |
| React          | Building user interface components                    |
| Tailwind CSS   | Utility-first CSS framework for styling               |
| Framer Motion  | Animations and UI transitions                         |
| React Toastify | Toast notifications                                   |
| React Icons    | Icon library                                          |
| Axios          | HTTP requests to backend APIs                         |



Backend
| Technology     | Purpose                         |
| -------------- | ------------------------------- |
| Node.js        | JavaScript runtime for backend  |
| Express.js     | Backend framework for APIs      |
| MongoDB        | NoSQL database                  |
| Mongoose       | MongoDB ODM for schema modeling |
| JSON Web Token | Secure authentication           |
| bcrypt         | Password hashing                |


Project Structure
| Folder / File            | Description                                     |
| ------------------------ | ----------------------------------------------- |
| **client/**              | Next.js Frontend                                |
| `client/src/`            | Source files                                    |
| `client/src/app/`        | Application pages                               |
| `client/src/components/` | React components                                |
| `client/src/lib/`        | Utility functions / API calls                   |
| `client/src/styles/`     | CSS / Tailwind styles                           |
| `client/public/`         | Public assets (images, icons, etc.)             |
| `client/package.json`    | Frontend dependencies and scripts               |
| **server/**              | Express Backend                                 |
| `server/config/`         | Configuration files (DB, env, etc.)             |
| `server/controllers/`    | Route controllers / business logic              |
| `server/middleware/`     | Express middleware (auth, error handling, etc.) |
| `server/models/`         | Mongoose models / database schemas              |
| `server/routes/`         | API routes                                      |
| `server/server.js`       | Main backend entry point                        |
| `server/package.json`    | Backend dependencies and scripts                |
| **README.md**            | Project documentation                           |


Features
Portfolio Website
| Feature         | Description                         |
| --------------- | ----------------------------------- |
| Admin Login     | Secure authentication               |
| Add Projects    | Admin can add new projects          |
| Edit Projects   | Update existing project information |
| Delete Projects | Remove projects                     |
| Manage Contacts | View and delete contact messages    |



Admin Dashboard
| Feature         | Description                         |
| --------------- | ----------------------------------- |
| Admin Login     | Secure authentication               |
| Add Projects    | Admin can add new projects          |
| Edit Projects   | Update existing project information |
| Delete Projects | Remove projects                     |
| Manage Contacts | View and delete contact messages    |


Contact System
| Function       | Description                                         |
| -------------- | --------------------------------------------------- |
| Submit Message | Visitors can send messages through the contact form |
| Store Data     | Messages are saved in the MongoDB database          |
| Admin Access   | Admin can view and delete messages                  |



Authentication
| Technology           | Usage                   |
| -------------------- | ----------------------- |
| JSON Web Token (JWT) | Secure login sessions   |
| bcrypt               | Encrypt admin passwords |

- Installation
- Clone Repository
- git clone https://github.com/Bhaskar787/bhaskar-portfolio-usingmern.git
- cd bhaskar-portfolio-usingmern


Install Dependencies
| Part     | Command                    |
| -------- | -------------------------- |
| Backend  | `cd server && npm install` |
| Frontend | `cd client && npm install` |


Environment Variables
| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Server port               |
| MONGO_URI  | MongoDB connection string |
| JWT_SECRET | Secret key for JWT        |
  - PORT=5000
  - MONGO_URI=your_mongodb_connection
  - JWT_SECRET=your_secret_key

Frontend (client/.env)

| Variable            | Description     |
| ------------------- | --------------- |
| NEXT_PUBLIC_API_URL | Backend API URL |
- NEXT_PUBLIC_API_URL=http://localhost:5000/api


Running the Project
| Service  | Command                          | URL                                            |
| -------- | -------------------------------- | ---------------------------------------------- |
| Backend  | `cd server && nodemon server.js` | [http://localhost:5000](http://localhost:5000) |
| Frontend | `cd client && npm run dev`       | [http://localhost:3000](http://localhost:3000) |


Deployment
| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |


Screenshots
| Page            | Image Path                         |
| --------------- | ---------------------------------- |
| Home Page       | <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/3edefba5-b9de-45d0-b70a-ce7f044a9be6" />|
| Admin Dashboard | <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/f5628ed8-a8d0-437d-9011-f3b659c55390" />|
| Projects Page   | <img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/6b5579f0-e2eb-4c5b-b2b5-c30918637445" />|


Learning Outcomes
| Skill                  | Description                       |
| ---------------------- | --------------------------------- |
| Full-stack development | Built frontend and backend        |
| REST APIs              | Created API endpoints             |
| Authentication         | Implemented JWT security          |
| CRUD Operations        | Create, Read, Update, Delete data |
| Deployment             | Hosted app on cloud platforms     |


Contact
| Platform  | Link                                                    |
| --------- | --------------------------------------------------------|
| GitHub    | https://github.com/Bhaskar787                           |
| Portfolio | https://bhaskar-portfolio-usingmern.vercel.app/projects |













