const apis: string[] = ['partner'];

const configs: {
  [key: string]: any;
} = {};

apis.forEach((api: string) => {
  configs[api] = {
    input: `./open-apis/${api}.custom.json`,
    output: {
      mode: 'split',
      target: `./src/@api/${api}.ts`,
      client: 'react-query',
      mock: false,
      override: {
        title: (title: string) => `${title}Api`,
        mutator: {
          path: './src/@api/use-custom-instance.ts',
          name: 'useCustomInstance',
        },
        formData: {
          path: './src/@api/custom-form-data.ts',
          name: 'customFormData',
        },
        header: () => [`eslint-disable`],
      },
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write'],
    },
  };
});

module.exports = {
  ...configs,
};
