function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context('../../src', true))
importAll(require.context('./specs', true, /\.spec$/))
