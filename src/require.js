import {require as requireDefault, requireFrom} from "@quarto/external-d3-d3-require";

export default function(resolve) {
  return resolve == null ? requireDefault : requireFrom(resolve);
}
