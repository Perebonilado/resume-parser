This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev

```



## Architecture

1. Components live in the @shared and @modules folder - The @shared folder consists of two sub folders, components and ui. UI consists of building blockes reused throughout the application whereas the components folder holds larger components that are reused. The @modules folder holds components specific to certain modules/pages in the application. That way, it is easier to find components used in building a specific page

2. Data flow - A repository folder holds the methods used in fetching data from the database. These methods are called in the api endpoints which eventually return data to the client. I utilized interfaces to serve as contracts for each repository, this allows us to switch from an orm like prisma to a different orm without interfering with any other parts of the code except the repository which implements those contracts.

3. Prompts are stored int he prompts folder.

4. Third party integrations such as mistral are stored in the integrations folder

5. The business folder holds the business logic. In this case, the logic for uploading and parsing the resume data

6. The schemas used to enforce the json the ai model returns is stored in the zodschemas folder, allowing for clear separation of json structures returned from the ai model

7. Shared state exist in the features folder which is basically a redux integration.

8. Routes are protected using the proxy.ts which was originally middleware

9. Authorization and error handling on apis are run through middleware structured as HOC's, preventing code duplication.

## Summary
When data is requested, this request is routed to the endpoint which calls a repository method to return the data.
When data needs to be saved to the db and run though some business logic, the request hits the endpoint and a service within the business folder is called to handle this.