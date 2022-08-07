const Hapi = require("@hapi/hapi");

const init = async () => {
  const server = Hapi.server({
    port: 3009,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
      files: {
        relativeTo: "./public",
      },
      validate: {
        failAction(request, h, err) {
          return err;
        },
      },
    },
  });

  await server.register(require("@hapi/inert"));

  // 静态目录
  await server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
      },
    },
    config: {
      auth: false,
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
