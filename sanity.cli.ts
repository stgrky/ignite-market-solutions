import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "icc-company-site",
  deployment: { autoUpdates: true, appId: "hx5xy6mzqm86pituyl7ptrnp" },
});
