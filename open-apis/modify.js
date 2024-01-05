const _ = require('lodash');
const File = require('fs');
const axios = require('axios');

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTcwNDIwNDc0MH0.JmSjCNX3I33MSP7AHRoxNwFaiwNwNK6AlsQbXH4WjFRBEDUCBhaZ-nIxTz0ganyyNQ7Rxjj8s88aoGp7X2H96A';
const gatewayUrl = 'https://gateway-dev.nexmo.vn';

// const token =
//   'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTcwNDYzNjU3MX0.WW2Lxra2ABD0bcvvT75n4ajMKinsOlDGqqZNLoaavHAK7cfjLh9zh62BPUVnTlLsGHCvm34BaHp1K3L_tvkMWA';
// const gatewayUrl = 'http://192.168.102.13:8080';

let noRemote = false;
process.argv.forEach(val => {
  if (val === '--no-remote') {
    noRemote = true;
  }
});

console.info('noRemote:', noRemote);

const services = ['partner'];
const apis = {};

function dynamicRequire(service) {
  // eslint-disable-next-line import/no-dynamic-require
  apis[service] = require(`./${service}.json`);
}

async function start() {
  await Promise.all(
    services.map(async service => {
      if (noRemote) {
        dynamicRequire(service);
      } else {
        console.log(`Fetching ${service}`);
        const response = await axios.default.get(
          `${gatewayUrl}/services/${service}/v3/api-docs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        await File.writeFileSync(
          `./open-apis/${service}.json`,
          JSON.stringify(response.data, null, 2),
        );
        console.log(`Save to disk: ${service}.json`);
        dynamicRequire(service);
      }
    }),
  );

  console.log('Start modifying apis');
  _.forEach(apis, (api, name) => {
    console.log('Modifying', name);

    const modified = _.cloneDeep(api);

    _.forEach(api.paths, (value, key) => {
      if (key.startsWith('/api/')) {
        modified.paths[`/${name}${key}`] = value;
        delete modified.paths[key];
      }
    });

    File.writeFileSync(
      `./open-apis/${name}.custom.json`,
      JSON.stringify(modified, null, 2),
    );
  });
}

start();
