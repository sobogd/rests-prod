import PG from "pg";
import dotenv from "dotenv";

dotenv.config();

// for time zone
const types = PG.types;
types.setTypeParser(1114, function (stringValue) {
  return new Date(Date.parse(stringValue + "+0000"));
});

export default new PG.Pool({
  host: process.env.S3_HOST,
  user: process.env.S3_USER,
  password: process.env.S3_PASSWORD,
  database: process.env.S3_DATABASE,
  max: 200,
});
