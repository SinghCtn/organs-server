import { ServerConfig } from "./config/serverConfig";
import { graphqlServerSetup } from "./graphql";

const server = async () => {
  const PORT = Number(process.env.PORT || 8000);
  const app = await ServerConfig();

  if (app) {
    graphqlServerSetup(app);

    app.listen(PORT, () =>
      console.log(`Server is Up 🚀 and Running on port: ${PORT}`)
    );
  }
};

server();
