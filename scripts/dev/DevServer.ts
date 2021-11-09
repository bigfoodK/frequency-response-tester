import fastify from "fastify";
import ws from "ws";
import fastifyWebsocket from "fastify-websocket";
import fastifyStatic from "fastify-static";

type DevServerProps = {
  root: string;
};

export default class DevServer {
  private readonly server = fastify();
  private readonly websockets: Set<ws> = new Set();

  constructor(props: DevServerProps) {
    this.server.register(fastifyWebsocket);
    this.server.register(fastifyStatic, {
      root: props.root,
    });
    this.routeHotReload();
  }

  public async start(port: number = 1234) {
    return await this.server.listen(port);
  }

  public emitHotReload() {
    this.websockets.forEach((websocket) => websocket.send("hotReload"));
  }

  private routeHotReload() {
    this.server.get(
      "/hotReload",
      { websocket: true },
      async (request, reply) => {
        const websocket = request.socket as ws;
        this.websockets.add(websocket);
        websocket.on("close", () => {
          this.websockets.delete(request.socket);
        });
      }
    );
  }
}
