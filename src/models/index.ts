import mongoose from 'mongoose';

const successMessage = 'Successfully connected to database';
const errorMessage = 'Database connection failed. Exiting now...';
const errorExitCode = 1;

const connectParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}

function connectToDB(uri: string) {
  mongoose
    .connect(uri, connectParams)
    .then(() => {
      console.log(successMessage);
    })
    .catch((error: any) => {
      console.error(`${errorMessage}\n${error}`);
      process.exit(errorExitCode);
    })
}

export {
  connectToDB
}
