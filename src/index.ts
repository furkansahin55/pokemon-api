import { main } from "./app";
import { gracefullyShutdown, unexpectedErrorHandler } from "./lib/exit-handler";

/*
 * Start the server
 */
main()
  .then((app) => {
    process.on("uncaughtException", (err) => unexpectedErrorHandler(app, err));
    process.on("unhandledRejection", (err) => unexpectedErrorHandler(app, err));
    process.on("SIGTERM", () => gracefullyShutdown(app));
    process.on("SIGINT", () => gracefullyShutdown(app));

    app
      .listen({ port: app.config.BIND_PORT, host: app.config.BIND_ADDR })
      .then(() => {
        app.log.info("Ready, Waiting for connections...");
      })
      .catch((err) => {
        app.log.error(
          {
            addr: app.config.BIND_ADDR,
            port: app.config.BIND_PORT,
            error: err.message,
          },
          "Failed to start server"
        );
      });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
