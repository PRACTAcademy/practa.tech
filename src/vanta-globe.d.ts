declare module "vanta/dist/vanta.globe.min" {
    import type * as THREE from "three";
    type VantaGlobeEffect = {
        setOptions: (options: Record<string, unknown>) => void;
        destroy: () => void;
    };
    type GlobeOptions = {
        el: HTMLElement;
        THREE: typeof THREE;
        [key: string]: unknown;
    };
    function GLOBE(options: GlobeOptions): VantaGlobeEffect;
    export default GLOBE;
}