
auth-front/babel.config.js
module.exports = {
    presets: [
      '@babel/preset-env', // Para compilar el código moderno a una versión más compatible.
      '@babel/preset-react', // Para React.
      '@babel/preset-typescript' // Para TypeScript.
    ],
    plugins: [
      '@babel/plugin-proposal-optional-chaining', // Habilita optional chaining.
      '@babel/plugin-proposal-nullish-coalescing-operator' // Habilita nullish coalescing.
    ]
  };
  