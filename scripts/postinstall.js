const process = require('process')

const id = (message) => message

/**
 *
 * @param {string} message
 * @param {Array<chalk['Color'] | chalk['Modifiers']>} styles
 * @returns
 */
const format = (message, styles) => {
  let func = id
  try {
    // this fails sometimes on outdated npm versions
    // eslint-disable-next-line node/global-require
    func = require('chalk')
    styles.forEach((style) => {
      func = func[style]
    })
  } catch {}
  return func(message)
}

const postInstall = () => {
  // yarn plug and play seems to have an issue with reading an esm file by building up the cache.
  // as yarn pnp analyzes everything inside the postinstall
  if (!process.env._.includes('yarn')) {
    const { createMainCommand } = require('../src/commands')
    const { createAutocompletion } = require('../src/lib/completion')

    // create or update the autocompletion definition
    const program = createMainCommand()
    createAutocompletion(program)
  }

  console.log('')
  console.log(format('Success! Netlify CLI has been installed!', ['greenBright', 'bold', 'underline']))
  console.log('')
  console.log('Your device is now configured to use Netlify CLI to deploy and manage your Netlify sites.')
  console.log('')
  console.log('Next steps:')
  console.log('')
  console.log(
    `  ${format('netlify init', ['cyanBright', 'bold'])}     Connect or create a Netlify site from current directory`,
  )
  console.log(`  ${format('netlify deploy', ['cyanBright', 'bold'])}   Deploy the latest changes to your Netlify site`)
  console.log('')
  console.log(`For more information on the CLI run ${format('netlify help', ['cyanBright', 'bold'])}`)
  console.log(`Or visit the docs at ${format('https://cli.netlify.com', ['cyanBright', 'bold'])}`)
  console.log('')
}

postInstall()
