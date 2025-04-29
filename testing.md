# Testing Overview
For frontend testing, a manual test will use a TestUser who will simulate a person using Flashify for the first time. The test design will use the TestUser account to accomplish all tasks that any typical user will do with the platform; these tasks are outlined in section 4. For each task and subtask,if present, the procedure of the task will be documented (the user story or what they are trying to accomplish), the expected result, and the verdict of whether the task has been completed or not. If the task was not completed, then the test will be flagged, and further investigation will be conducted. The results of these tests can be found in the Functional Testing Document.

For backend testing, the rest of this document provides an overview of the unit tests written for the API routes. Each test suite is dedicated to a specific route file and covers various scenarios, including successful responses, error handling, and edge cases. The files are found in \_\_tests\_\_ directory

## Test Coverage for API Routes

### 1. **Auth Routes (`authRoutes.test.js`)**

**Test Coverage:**
- **POST /register**: 
  - Tests for missing fields (username, email, password).
  - Tests for username and email already existing.
  - Tests for successful user registration.
  
- **POST /login**: 
  - Tests for invalid username.
  - Tests for invalid password.
  - Tests for successful login and token generation.

- **GET /**: 
  - Tests for retrieving all users (successful response).

- **DELETE /:id**: 
  - Tests for user deletion when the user is not found.
  - Tests for successful deletion of a user.

### 2. **Subject Routes (`subjectRoutes.test.js`)**

**Test Coverage:**
- **POST /create**: 
  - Tests for missing fields (username, subject name, color).
  - Tests for successful subject creation.

- **GET /:username**: 
  - Tests for retrieving all subjects for a specific user.

- **DELETE /:id**: 
  - Tests for deleting a subject when no subject is found.
  - Tests for successful deletion of a subject, including its related decks and flashcards.

### 3. **Flashdeck Routes (`deckRoutes.test.js`)**

**Test Coverage:**
- **POST /**: 
  - Tests for successful flashdeck creation with provided data (username, title, subject_id).
  
- **GET /**: 
  - Tests for retrieving all flashdecks for a user, with optional filtering by subject.
  
- **PUT /:id**: 
  - Tests for missing title when updating a flashdeck.
  - Tests for successful update of a flashdeck title.

- **DELETE /:deck_id**: 
  - Tests for attempting to delete a non-existent deck.
  - Tests for successful deletion of a flashdeck, including its associated flashcards.

### 4. **Flashcard Routes (`cardRoutes.test.js`)**

**Test Coverage:**
- **POST /**: 
  - Tests for creating a new flashcard for a deck.

- **GET /**: 
  - Tests for retrieving all flashcards for a specific deck.

- **PUT /:id**: 
  - Tests for updating the flashcard content or data.
  
- **DELETE /:id**: 
  - Tests for attempting to delete a flashcard that doesn't exist.
  - Tests for successful deletion of a flashcard.

## Test Suite Organization

Each test file corresponds to a specific route file and is located in the `__tests__` directory.

- **`authRoutes.test.js`**: Contains tests for user-related API routes (e.g., registration, login, user deletion).
- **`subjectRoutes.test.js`**: Contains tests for creating, retrieving, and deleting subjects.
- **`deckRoutes.test.js`**: Contains tests for managing flashdecks (creating, retrieving, updating, and deleting decks).
- **`cardRoutes.test.js`**: Contains tests for managing flashcards (creating, retrieving, updating, and deleting flashcards).

## Test Setup

All the tests are written using the following testing tools:
- **Jest**: For running the tests and assertions.
- **Supertest**: For making HTTP requests to the API and testing the responses.
- **Mongoose**: For interacting with the MongoDB models (mocked in the tests).
- **Mocking**: Used to mock database operations, allowing us to focus on testing the logic and routes, independent of actual database interactions.

### Mocked Models:
- `UserModel`
- `SubjectModel`
- `FlashdeckModel`
- `FlashcardModel`
- `bcryptjs`
- `jsonwebtoken`

### Example Test Structure:
```js
describe('POST /register', () => {
  it('should return 400 if fields are missing', async () => {
    const res = await request(app).post('/register').send({ username: 'user' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('All fields are required');
  });
  // More tests...
});
```


### Test Execution
npm intall the necessary modules in the \_\_test\_\_ directory inlcuding
- npm install --save-dev jest supertest
- npm install mongoose
- npm install express
- npm install uuid

To run the tests, use this command `npm test`







