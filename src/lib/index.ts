import "../global.d.ts"; // eslint-disable-line import-alias/import-alias
import "../modules.d.ts"; // eslint-disable-line import-alias/import-alias

export * as api from "./api";
export * as fonts from "./fonts";
export * as plugins from "./plugins";
export * as themes from "./themes";
export * as ui from "./ui";
export * as utils from "./utils";
export * as metro from "@metro";

import * as fonts from "./fonts";
import * as plugins from "./plugins";
import * as themes from "./themes";

/** @internal */
export * as _jsx from "react/jsx-runtime";

import { proxyLazy } from "./utils/lazy";

export const managers = proxyLazy(() => {
    console.warn("bunny.managers.* is deprecated, and moved the top level (bunny.*). bunny.managers will be eventually removed soon");

    return {
        get fonts() { return fonts; },
        get plugins() { return plugins; },
        get themes() { return themes; }
    };
}, { hint: "object" });

const _disposer = [] as Array<() => unknown>;

export function unload() {
    for (const d of _disposer) if (typeof d === "function") d();
    // @ts-expect-error
    delete window.bunny;
}

/**
 * For internal use only, do not use!
 * @internal
 */
unload.push = (fn: typeof _disposer[number]) => {
    _disposer.push(fn);
};
