import { config } from "dotenv";

config({quiet : true}); //does not show the count in terminal

export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV : process.env.NODE_ENV,
  DB_URI : process.env.DB_URI
};
