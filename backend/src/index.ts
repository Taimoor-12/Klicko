import createApp from "./setup/app.js";
import { config } from "./config/index.js";

async function main() {
  const app = createApp();

  app.listen(config.app.port, () => {
    console.log(`Server running on ${config.app.baseUrl}`)
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
});
