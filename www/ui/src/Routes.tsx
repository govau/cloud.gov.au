import loadable from "loadable-components";

export const HomePage = loadable(() => import("./pages/HomePage"));
export const AboutPage = loadable(() => import("./pages/AboutPage"));
export const InsightsPage = loadable(() => import("./pages/InsightsPage"));
export const NotFoundPage = loadable(() => import("./pages/NotFoundPage"));
