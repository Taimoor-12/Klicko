import createApp from "./setup/app.js";
import getEnv from "./shared/utils/getEnv.js";

const PORT = getEnv('PORT');
const BASE_URL = getEnv('APP_BASE_URL');

async function main() {
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server running on ${BASE_URL}`)
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
});
