import 'dotenv/config'
import { defineConfig } from "orval";
import { links } from "./src/config/links";

const orvalConfig = defineConfig({
  // meu-website API
  "meu-website": {
    output: {
      mode: "tags",
      target: "src/api/endpoints/index.ts",
      schemas: "src/api/models",
      client: "react-query",
      override: {
        query: {
          useInfinite: true,
          usePrefetch: true,
          options: {
            retry: 3,
            retryDelay: 1000,
          }
        },
        mutator: {
          path: "src/api/mutator/custom-client.ts",
          name: "useCustomClient",
        },
      }
    },
    input: {
      target: `${links.apiEndpoint}/swagger-output.json`,
      filters: {
        tags: undefined,
      },
    },
  },
});

export default orvalConfig
