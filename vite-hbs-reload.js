export default function HandlebarUpdate() {
  return {
    name: "HandlebarUpdate",
    enforce: "post",
    handleHotUpdate({ file, server }) {
      if (file.endsWith(".hbs")) {
        server.ws.send({
          type: "full-reload",
          path: "*",
        });
      }
    },
  };
}
