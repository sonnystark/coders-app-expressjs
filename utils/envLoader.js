import dotenv from "dotenv";

function envLoader(env = "dev") {
  switch (env) {
    case "test":
      return dotenv.config({ path: ".env.test" });
    case "dev":
      return dotenv.config({ path: ".env.dev" });
    case "prod":
      return dotenv.config({ path: ".env.prod" });
    default:
      return dotenv.config({ path: ".env.dev" });
  }
}

export default envLoader;
