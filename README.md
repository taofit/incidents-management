# Incidents monitoring and management

We have several hundreds of unattended machines located in projection rooms in cinemas around the world. These machines usually just works, but sometimes something happens that requires human intervention.
Examples:
- A power outage turns off all equipment in the cinema - including the cinemataztic box. The cinema forgets to turn on cinemataztic box again. Result: the game fails to start at the next show, resulting in black screen for the guests. 
- The machine is disconnected from the projector, and upon connecting again it fails to set the correct image resolution on the video output. Result: The game doesn’t look right when shown to the audience (perhaps cropped or only covering 1/2 of the screen). 
- We regularly push new games to the units in the cinema halls. The units usually just downloads these automatically. However, sometimes this goes wrong e.g. due to bad internet connection in the cinema or capacity issues on our severs. Result: The game is not shown to the cinema audience. 

Whenever something goes wrong with the machines in the cinema, we need to know as soon as possible. Right now we don’t have a central place in our cloud platform to view all these kinds of problems with the machines. This sometimes results in the cinema crew or even worse, the cinema goers, discovering the problem before we do. This is especially bad, if it’s a problem we could have discovered by continuously monitoring the equipment on simple parameters like screen resolution or download status. 

#### Objectives: 
1. Provide a better overview with alerts of problems on our web-based admin platform. This is handled front-end only for now. It should be tracked server side as well, so the right people can be alerted fast. Right now we have to wait for someone to log into cloud and notice the errors. 
2. Track incidents: when a machine goes into a failed state (e.g. wrong resolution or game download errors) the start time of this incident state should be noted. 
3. Notify as fast as possible: someone should be notified about this incident, so they have a better chance of fixing it before next show.

## Scope
The incident management system should only care about tracking the status of the incidents. It does not monitor other services for incidents, but rather wait for other systems to report when a new condition starts that should result in a new incident. 

### Specs
1. Track incidents: open, inProgress, closed
2. Notify by e-mail when a new incident is opened
3. Provide endpoints (or event listeners) allowing other services to open and close incidents
4. Provide endpoints allowing a web-based UI to visualize the tickets
5. Timeline for each incident:
   1. Comments from human agents
   2. Status updates from systems (e.g. reopened by automatic monitoring agent)

# Contributing

### Prerequisites

- SendGrid API key. Get one [here](https://app.sendgrid.com/settings/api_keys)
- mongodb instance: Get one at mongodb atlas or spin up one locally using `docker run -p 27017:27017 mongo`
- Set up a `./server/.env` file (see template `./server/.env.example` for reference). It should include: 
   - DATABASE_ACCESS (mongodb connection string)
   - SG_API_KEY (sendgrid API key)
   - FROM_EMAIL (the sender address of the incident e-mails)
   - TO_EMAIL (fallback e-mail to send the incidents updated to if not otherwise specified on the incidents)

### MongoDB

1.Mongodb is used to store information regarding ongoing incidents with players which are triggered on the field.
2.Mongodb stores the following information with regards to an incident such as the following: 
   a. Ticket ID
   b. Creation Date
   c. Updated Date
   d. Cinema ID
   e. Cinema Name
   f. Screen ID
   g. Screen Name
   h. Error ID
   i. Error Description
A detailed overview of the model used to specify the above mentioned information can be found [here](server/models/incident.model.js).
4.Responded information is used to populate information for incident email-notification and management.

### Nodemailer

1. Nodemailer handles sending emails.
2. Basic usage pertains to installation of the nodemailer package using `npm install nodemailer`.
### SendGrid

1. SendGrid is used as a platform to transport the e-mails about the incidents to the concerned person(s) via email.
2. Basic usage pertains to installation of the SendGrid package using `npm install nodemailer-sendgrid-transport`.


## How do I get started?
### Frontend
The frontend is a React app found in the `./app` directory. 
See `./app/package.json` for available commands. The main command is `npm start` which fires up the dev webpack server.

### Backend
The backend part of the project is an express.js server found in the `./server` directory. 
See `./server/package.json` for available commands. The main command is `npm start` which fires up the development server with hot reloading using nodemon.