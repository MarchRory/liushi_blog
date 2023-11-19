import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

if (process.client) {
  gsap.registerPlugin(MorphSVGPlugin);
}