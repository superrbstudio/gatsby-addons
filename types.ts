const options = [
  '@superrb/gatsby-addons-prismic',
  '@superrb/gatsby-addons-filesystem',
]

let module
for (let option of options) {
  try {
    module = import(`${option}/types`)

    break
  } catch (_) {} // Fail silently
}

if (!module) {
  console.error(`
      You must include a type definition package. Please install one of the following options, depending on your choice of CMS:
      * @superrb/gatsby-addons-filesystem
      * @superrb/gatsby-addons-prismic
    `)
}

export default module
