import { app } from "./src/application/web.js";
import { logger } from "./src/application/logging.js";

app.listen(3009, () => {
    logger.info("App start")
})