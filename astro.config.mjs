import { defineConfig, passthroughImageService } from "astro/config";
import icon from "astro-icon";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), vue()],
  image: {
    service: passthroughImageService()
  }
});
