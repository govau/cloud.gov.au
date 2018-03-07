import loadable from "loadable-components";

export const HomePage = loadable(() => import("./pages/HomePage"));
export const CodePage = loadable(() => import("./pages/CodePage"));
export const InsightsPage = loadable(() => import("./pages/InsightsPage"));
export const TermsPage = loadable(() => import("./pages/TermsPage"));
export const NotFoundPage = loadable(() => import("./pages/NotFoundPage"));
