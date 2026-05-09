# Field Equipment Tracker

A full stack internal tool for construction teams to track equipment across job sites. Users can view all assets and job sites, assign equipment to active sites, and return it when the job is done. New functionality: Now assets can be deleted from the table!

Built with PostgreSQL, Express, React, and Node.js (PERN stack).

---

I built this to prepare for an upcoming interview with a construction firm, and to gain hands-on experience with PostgreSQL and relational databases. I'd not used SQL before this project.

## Preview of asset table

![Asset Table Preview](https://github.com/DavidBraswell/field-equipment-tracker/blob/main/blob/assetPreview.png)

## Features

- View all equipment assets and their current status (available / deployed)
- View all active job sites
- Assign an asset to a job site via modal
- Return a deployed asset back to available
- Delete an unassigned asset from the table
- Status badges update in real time after each action

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| HTTP Client | Axios |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /assets | Fetch all assets |
| POST | /assets | Create a new asset |
| DELETE | /assets/:id | Delete an asset |
| GET | /job_sites | Fetch all job sites |
| POST | /job_sites | Create a new job site |
| DELETE | /job_sites/:id | Delete a job site |
| GET | /assignments | Fetch all active assignments |
| POST | /assignments | Assign an asset to a job site |
| PATCH | /assignments/:id/return | Return a deployed asset |

---

