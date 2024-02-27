import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: "../server/swagger.json",
  apiFile: "./src/store/api/baseApi.ts",
  apiImport: "baseApi",
  argSuffix: "Args",
  hooks: true,
  responseSuffix: "Response",
  outputFiles: {
    "./src/store/api/gen/room.ts": {
      filterEndpoints: [/roomController/],
    },
    "./src/store/api/gen/user.ts": {
      filterEndpoints: [/userController/],
    },
    "./src/store/api/gen/billable.ts": {
      filterEndpoints: [/billableController/],
    },
    "./src/store/api/gen/auth.ts": {
      filterEndpoints: [/appController/],
    },
  },
};

export default config;
