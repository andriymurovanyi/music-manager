import mongoose from 'mongoose';

const errorMessage = 'Database connection failed. Exiting now...';
const errorExitCode = 1;

const connectParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

export default function(uri: string) {
  mongoose
    .connect(uri, connectParams)
    .then(() => {
      console.log(`Successfully connected to database: ${uri}`);
    })
    .catch((error: any) => {
      console.error(`${errorMessage}\n${error}`);
      process.exit(errorExitCode);
    })
}
