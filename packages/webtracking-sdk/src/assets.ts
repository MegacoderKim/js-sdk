import {Style} from "./style";

export const Assets: IAssets = {
    destination: require("url-loader!./assets/destination-eta.png"),
    destinationNoEta:  require("url-loader!./assets/destionation-no-eta.png"),
    startPosition: require("url-loader!./assets/start-position-marker.png"),
    endPosition: require("url-loader!./assets/end-position-marker.png"),
    motorcycle: require("url-loader!./assets/vehicle-motorcycle.png"),
    vehicleCar: require("url-loader!./assets/vehicle-car.png"),
    defaultHeroMarker: require("url-loader!./assets/default-hero-marker.png"),
};

export const MarkerAssets = {
    startPosition: () => {
        let img = Assets.startPosition;
        return `
          <div style="${Style.startMarker}${Style.noSelect}">
              <img height="20px" src="${img}" alt="">
          </div>
        `;
    },
    endPosition: () => {
        let img = Assets.endPosition;
        return `
            <div style="${Style.endMarker}${Style.noSelect}">
                <img height="20px" src="${img}" alt="">
            </div>
        `;
    }
};

export interface IAssets {
    [key: string]: string;
}