export const markerRenderConfigFactory = (mapUtils) => {
  return {
    setMap: true,
    getItem(data) {
      return mapUtils.getMarker()
    },
    getBounds(item, bounds?) {
      return mapUtils.extendBounds(item, bounds)
    },
    update(entity) {
      let position = entity.getPosition();
      mapUtils.updatePosition(entity.item, position);
    },
    remove(item) {
      mapUtils.clearItem(item)
    },
  }

};