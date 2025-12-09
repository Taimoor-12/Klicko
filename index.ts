import "dotenv/config";
import createApp from "./setup/app.js";
const port = process.env.PORT;

async function main() {
  const app = createApp();

  app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  });