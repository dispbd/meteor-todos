Package.describe({
  name: 'dispatch:login-token',
  version: '0.1.2',
  summary:
    'Log the user in if they have the correct single-use token ' + 'in the URL',
  git: 'https://github.com/DispatchMe/meteor-login-token',
})

Npm.depends({
  hat: '0.0.3',
})

Package.onUse(function (api) {
  api.use(
    [
      'tracker',
      'check',
      'accounts-base',
      'ecmascript',
      'mongo',
      'underscore',
      'http',
      'raix:eventemitter',
    ],
    ['client', 'server']
  )

  api.addFiles('namespace.js', ['client', 'server'])
  api.addFiles('client.js', 'client')
  api.addFiles('server.js', 'server')

  api.export('LoginToken', ['client', 'server'])
})
