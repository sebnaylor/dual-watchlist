import { createInertiaApp } from "@inertiajs/react";
import { createElement, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { ThemeProvider } from "../context/ThemeContext";
import { NavProps } from "../components/shared/Nav";

interface PageProps {
  nav?: NavProps;
  [key: string]: unknown;
}

type ResolvedComponent = {
  default: React.ComponentType<PageProps> & {
    layout?: (page: ReactNode) => ReactNode;
  };
};

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob<ResolvedComponent>("../pages/**/*.tsx", {
      eager: true,
    });

    const page = pages[`../pages/${name}.tsx`];
    if (!page) {
      console.error(`Missing Inertia page component: '${name}.tsx'`);
    }

    if (page?.default && !page.default.layout) {
      page.default.layout = (pageNode: ReactNode) => {
        const props = (pageNode as React.ReactElement<PageProps>).props;
        return createElement(DefaultLayout, { nav: props?.nav, children: pageNode }, pageNode);
      };
    }

    return page;
  },

  setup({ el, App, props }) {
    if (el) {
      createRoot(el).render(
        createElement(ThemeProvider, null, createElement(App, props))
      );
    } else {
      console.error(
        "Missing root element.\n\n" +
          "If you see this error, it probably means you load Inertia.js on non-Inertia pages.\n" +
          'Consider moving <%= vite_typescript_tag "inertia" %> to the Inertia-specific layout instead.'
      );
    }
  },
});
