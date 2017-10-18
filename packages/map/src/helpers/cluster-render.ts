import {markerRenderConfigFactory} from "./marker-render";

export const clusterRenderConfigFactory = (mapUtils, state) => {
  // console.log(test);
  let markerRender = markerRenderConfigFactory(mapUtils);
  console.log(state);
  return {
    ...markerRender,
    update(entity) {
      console.log(this);
      markerRender.update(entity)
    }
    // setMap: false
  }

};