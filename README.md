# Flashify
## Introduction
Our project is named Flashify. Flashify is an ad-free study platform that helps students learn material quickly through the use of custom flashcards.

## Architecture
Backend Architecture: 

<img width="512" alt="image" src="https://github.com/ZhengBenjamin/Flashify/blob/main/client/src/assets/images/backend.png" />

Frontend Architecture: 

<img width="512" alt="image" src="https://github.com/ZhengBenjamin/Flashify/blob/main/client/src/assets/images/frontend2.png" />

Database Schema: 

<img width="512" alt="image" src="https://github.com/user-attachments/assets/67dccf66-6c83-4c28-bb4c-9af494d8d298" />

## Installation:
### Cloning the project
* Open the [main project branch](https://github.com/ZhengBenjamin/Flashify/tree/main) in VSCode

### To run server/backend:
* install node.js
* Have mongoDB and the FlashifyDB available.
* cd server
* npm install
* node server.js

### To run client/frontend: 
* install npm
* cd client
* npm i
* npm run dev
* click the link to open the GUI

## Usage:
First either create an account or login to an existing account. Then choose from the following options:

**Create a study set:**
1) Select the study button in the navigation bar at the top
2) Create a new subject or select an existing subject to place the study set in
3) Select "Create Flashcard Deck" and follow the prompts

**Delete a study set:**
1) Find the study set within the subject it is located in and hover the mouse over it
2) A red delete button should pop up. Select that button

**Edit a study set:**
1) Find the study set within the subject it is located in and hover the mouse over it
2) A blue edit button should pop up. Follow the prompts

**Study a study set:**
1) Select your set to study
2) Click the flashcard to reveal the other side
3) Select the "I know it" or "Don't know" button depending on if you got the flashcard correct
4) Repeat step 3 until all terms have been studied in the round
5) See your statistics for both how well you did in this round or how well you've progressed over the entire material
6) Select continue to continue your progress or restart progress to restart your statistics

## Folder structure overview

### Flashify Directory:
* client directory
* server directory
* .gitignore
* README.md --> this file
* testing.md --> Describes where tests are written and explains the test coverage

### client directory:
* client/node_modules --> local dependencies to be installed through our installation process
* client/src directory --> contains the code for the project that will be run locally
* client/src/main.jsx --> main project file to be run with the npm run dev command
* client/src/App.jsx --> contains the local routing
* client/src/assets --> Directory containing code for 
* client/src/assets/components/jsx --> contains all the GUI interactions and event handlers.
* client/src/assets/components/css --> Contains the styling components
* client/src/assets/images --> contains the images that will be displayed by the program
* client/src/assets/pages --> displays the pages for the platform

### server directory:
* server/server.js Main server entry point
* server/routes API functions for CRUD operations on the database
* server/models database schemas to store users, flashcards, and flashdecks

## Dependencies
* MongoDB and Mongoose
* Node.js and Express
* Mantine and React

## Contribution
The team members involved are:
* Ari Glockner: Frontend
* Benjamin Zheng: Frontend
* David Cho: Backend
* Franklin Wang: Backend

We used a divide and conquer approach and we collaborated with each other by using Pair Programming, Code Reviews, and our File Documentation.

You can find our documents (viewable for those affiliated with Case Western Reserve University) [here.](https://drive.google.com/drive/folders/1Mp9yC2VNtGyMmL1CG0DQPc57iob_h0mn?usp=drive_link)
Here is the [trello.](https://trello.com/invite/b/679d347b3bcd25e792f98659/ATTIb64458f639ce415414ade7ec2de411b65CB6C203/flashify)

## Development retrospective
Here were a couple of mistakes we made in developing our project:
1) When we initially created the study flashcards we used a hardcoded placeholder array for storing the flashcards we were using until we got the backend set up. While both the system that we used for the frontend and the backend initially worked individually, when we integrated the two systems together the system broke so we modified our frontend to become compatible with the backend. We could have made this more efficient by starting with the backend and having the frontend work around the system of the backend here so we wouldn't have needed to redo it, but it didn't end up costing us _that_ much time
2) We had some issues on the backend with computer security involving confidentiality. Originally we had problems that every user shared the same set of flashcard sets and after some debugging we were able to get this problem fixed. We could have been slightly more efficient with thinking

Overall we were extremely effective at working together as a team and there's not that much we would do differently if we were to do this project again.

## License
MIT
