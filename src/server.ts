import app from "./app";
import config from "./config";
// import "../src/modules/jobs/cleanup.job";

const port = config.port || 5000;

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
