# EventHopper 1.0.0

Welcome to **EventHopper** – your go-to place for discovering exciting events, publishing your own, and booking tickets with ease.

---

## Pre-Requisites

1. **Internet Connection**
2. **Docker and Docker Compose Installed**

---

## Pre-Required Actions

1. Load the `.env` file provided along with the project and move it to the project root.
    - Docker Compose is configured to automatically fetch environment credentials from this file and load them for usage by different services.

---

## Tech Stack Used

1. **Language**: JavaScript (ES6 Modules)
2. **Runtime**: Node.js
3. **Frameworks**: Express.js
4. **Primary Database**: PostgreSQL
5. **Secondary Database**: MongoDB
6. **Message Queue**: Redis
7. **Search**: Elasticsearch
8. **Reverse Proxy**: Nginx

---

## How to Set Up

1. **Navigate to the Project Root**:
    - After ensuring the pre-requisites are met, locate the bash script `start_dev.sh` in the project root.
    - This bash script is preconfigured to execute terminal commands and initialize Docker Compose to start pulling relevant containers from the registry.

2. **Docker Compose Process**:
    - The bash script will execute `docker-compose.dev.yml` using the `Dockerfile` (both located in the project root).
    - These files will:
        - Pull the necessary containers.
        - Build a project image.
        - Start the project in **development mode** using **nodemon** and **npm**.
        - Install additional tools (e.g., **nano**) in the Docker application (as Alpine Linux, used in this setup, doesn’t come with these preinstalled).

3. **Execution Steps**:
   Once the commands in the bash script are executed, the following tasks will be completed:

    - **3A**: Pull all required dependencies from the registry.
    - **3B**: Bind mount necessary files from the host machine into Docker.
    - **3C**: Set up volumes and mount them for persistence beyond the application lifecycle.
    - **3D**: Load environment credentials from the `.env` file.
    - **3E**: Check for pending migrations in the `src/migrations` directory, and execute them if found.
    - **3F**: Docker Exec into the server container and install `nano` (as Alpine Linux is used).
    - **3G**: Start displaying logs.

4. **Application Startup**:
    - After the above steps, the application should start successfully and serve on the **port defined in the `.env` file**.


## API Documentation

**APIS can be found at:**
**www.example.com**


1. The application uses Express JS to run a restful server while using postgres as primary database and mongodb as secondary database.
2. The applications exposes three types of routes ( endpoints ):
   - **2A**: Users ( for services related to user such as creating a new user. ) | /users
   - **2B**: Events ( for services related to events such as publishing a new event, search, get details of one particular event using it's id, list down all events currently active on the platform. ) /events
   - **2C**: Tickets ( for services related to ticketing and purchasing. ) /tickets
   - **2D**: Reports ( for services related to report generation. ) /report
3. Users ( /users ) 
   -  /users/new
      - Request Type : POST
      - Payload : 
        - "firstName" of type String ( Min : 3 / Max : 20)
        - "lastName" of type String ( Min : 3 / Max : 20)
        - "email" of type String(email) ( Min : 3 / Max : 20)
      - Response : 
        - Returns a message object with an appropriate message and a data property of JSON type which contains the id : UUID
      - Validation : JOI is used to body validation and returns an appropriate message if any of body params is missing or if present is corrupt/validate.
4. Events ( /events )
   -  /events/publish
      - Request Type : POST
      - Payload :
         - "eventName" of type String ( Min : 3 / Max : 20)
         - "eventType" of type String ( Min : 3 / Max : 20)
         - "eventStartDate" of type String(email) ( Min : 3 / Max : 20)
         - "eventEndDate" of type String ( Min : 3 / Max : 20)
         - "streetname" of type String ( Min : 3 / Max : 20)
         - "city" of type String(email) ( Min : 3 / Max : 20)
         - "state" of type String ( Min : 3 / Max : 20)
         - "organizing_entity" of type String ( Min : 3 / Max : 20)
         - "organizing_secondary_contact_email" of type String(email) ( Min : 3 / Max : 20)
         - "organizing_poc" of type String ( Min : 3 / Max : 20)
         - "eventShortDescription" of type String ( Min : 3 / Max : 20)
         - "eventLongDescription" of type String(email) ( Min : 3 / Max : 20)
         - "eventProfileImage" of type String ( Min : 3 / Max : 20)
         - "pricePerUnit" of type String ( Min : 3 / Max : 20)
         - "ticketsAvailable" of type String(email) ( Min : 3 / Max : 20)
      - Response :
         - Returns a message object with an appropriate message and a data property of JSON type which contains the id : UUID
      - Validation : JOI is used to body validation and returns an appropriate message if any of body params is missing or if present is corrupt/validate.

   -  /events/get_event/:event_id
       - Request Type : GET
       - Payload ( query params ) :
           - id of the event.
       - Response :
           - Returns a message object with an appropriate message and a data property of JSON type which contains the details of the events. If not found returns 404
   -  /events/get_events
       - Request Type : GET
       - Response :
           - Returns a message object with an appropriate message and a data property of JSON type which contains a list of all published events.
   -  /events/search/
       - Request Type : GET
       - Payload :
           - "eventName" of type String ( Min : 3 / Max : 20)
       - Response :
           - Returns a message object with an appropriate message and a data property of JSON type, does this by search the event in elastic and returns information about the event.
5. Report ( /report )
    -   /report/generate/:event_id
        - Request Type : GET
        - Payload ( query params ) :
            - "id" of type UUID of the event.  
        - Response :
            - Returns a message object with an appropriate message and a data property of JSON type which contains the a breakup of the revenue generated and number of tickets available and number sold.

6. Ticketing ( /ticket )
    -   /ticket/purchase 
        - Request Type : POST
        - Payload :
            - "event_id" of type UUID of the event.
            - "user_id" of type UUID of the user.
        - Response :
            - Returns a message object with an appropriate message and a data property of JSON type which contains an approproate message telling if the 
                purchase is success or not or if the tickets are already sold.

## How does it work ?

## APIS set

### 1. User Management
- **Endpoint**: `/user/new`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Body Parameters**:
    - `firstName`
    - `lastName`
    - `email`

### 2. Event Management
- **Endpoints**:
    - `/events/publish`:
        - **Method**: `POST`
        - **Description**: Publishes a new event.
        - **Body Parameters**:
            - `eventName`
            - `eventStartDate`
            - `eventEndDate`
            - `startTime`
            - `endTime`
            - `ticketsAvailable`
            - `ticketPrice` and more described above.
    - `/events/get_event/:event_id`:
        - **Method**: `GET`
        - **Description**: Retrieves event details by ID.
    - `/events/get_events`:
        - **Method**: `GET`
        - **Description**: Lists all active events.

### 3. Ticketing System
- **Endpoints**:
    - `/tickets/purchase`:
        - **Method**: `POST`
        - **Description**: Purchases tickets for an event.
        - **Body Parameters**:
            - `user_id`
            - `event_id`
    - `/tickets/:ticket_id`:
        - **Method**: `GET`
        - **Description**: Verifies ticket details by ID.

### 4. Event Reports
- **Endpoint**: `/reports/generate/:event_id`
- **Method**: `GET`
- **Description**: Generates a brief report of an event, including tickets sold and revenue generated.

---

# System Architecture

The application employs a well-thought-out combination of components to ensure scalability, performance, and maintainability:

## Key Components

### 1. **Node.js & Express.js**
- **Node.js** provides a non-blocking, single-threaded runtime environment, ideal for high-performance applications.
- **Express.js** offers a lightweight, battle-tested framework for building RESTful APIs. Its simplicity, compatibility with ORMs/ODMs, and widespread adoption make it an excellent choice.

### 2. **PostgreSQL & MongoDB**
- **PostgreSQL**: Chosen as the primary database for its structured schema support and superior handling of joins, which are critical for tables like users, tickets, and events.
- **MongoDB**: Serves as a secondary database for logging of async tasks due to its flexibility, ability to handle diverse data types, and support for high-throughput operations.

### 3. **Redis as Message Queue**
Redis ensures high availability and performance for asynchronous task execution. Tasks like updating ElasticSearch are handled by workers via Redis queues, keeping the main thread unblocked and enhancing user experience.

### 4. **ElasticSearch for Search**
ElasticSearch enables fast, efficient searches through reverse indexing, offering scalability and future-proofing for high data volumes.

### 5. **Nginx as Reverse Proxy**
Nginx handles traffic routing efficiently, serving as the entry point to the application.

### 6. **Docker for Deployment**
Docker and Docker Compose streamline setup and deployment, ensuring consistency across environments. Volume mounts and bind mounts maintain data persistence, even during container restarts.
