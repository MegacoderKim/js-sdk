// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  isDeployed: false,
  tileUrl: "",
  mapKey: "",
  tokenName: 'ht-token-prod',
  domain: "localhost",
  bk: [],
  mapUrl: "https://api.mapbox.com/styles/v1/devopshypertrack/cix0ofof8002f2pnwhwfzpco4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGV2b3BzaHlwZXJ0cmFjayIsImEiOiJjaXZ3Mjh2YnAwMHQ3MnpvdXgxa3ZoNTZwIn0.Vn-Pr8mFaHy3pxQjG29DNA",
  stripeKey: ""
};
