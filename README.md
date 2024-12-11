This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Create a .env.local file at the root of the project. Copy the contents of .env.sample. to .env.local file. Provide appropriate values related to your project for the environment variables.

```
NEXT_PUBLIC_API_ENDPOINT='<Your Development Backend API baseurl>'      //eg. https:/api.v1.dev-patientnarration.com
NEXT_PUBLIC_APP_NAME='<Your Application Name>'        //Default is 'Patient Narration Assistant'
```

Start and run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## NextJs Documentation

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on AWS Amplify

To deploy on Amplify, connect the repository to Amplify, and deploy a selected branch. Add environment variables mentioned in
.env.sample in Amplify console. No additional settings needed for deployment. For additional information, please refer AWS Amplify documentation.

- [Amplify NextJs deployment documentation](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-app.html)
- 
