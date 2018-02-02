import {Style} from "./style";

export const Assets: IAssets = {
    destination: require("./assets/destination-eta.png"),
    destinationNoEta:  require("./assets/destionation-no-eta.png"),
    startPosition: require("./assets/start-position-marker.png"),
    endPosition: require("./assets/end-position-marker.png"),
    motorcycle: require("./assets/vehicle-motorcycle.png"),
    vehicleCar: require("./assets/vehicle-car.png"),
    defaultHeroMarker: require("./assets/default-hero-marker.png"),
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