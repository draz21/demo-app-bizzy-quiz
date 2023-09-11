const BabelConfig = {
  presets: [
    '@babel/preset-env',
    ["@babel/preset-react", {
      "runtime": "automatic"
    }],
    '@babel/preset-typescript'
  ],
};

export default BabelConfig