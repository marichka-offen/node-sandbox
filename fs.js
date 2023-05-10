// ▶︎ ▶︎ ▶︎ ▶︎ ▶︎ FS PROMISE ◀︎ ◀︎ ◀︎ ◀︎ ◀︎
const fsPromise = require('node:fs/promises')

const getStatsWithPromise = async (path) => {
  try {
    const stats = await fsPromise.stat(path)
    console.log(stats)
    console.log(`isFile: ${stats.isFile()}`)
    console.log(`isDirectory: ${stats.isDirectory()}`)
  } catch (error) {
    console.error(error)
  }
}

const readFileWithPromise = async (path) => {
  try {
    const contents = await fsPromise.readFile(path, 'utf8')
    console.log(contents)
  } catch (error) {
    console.error(error)
  }
}

const writeFileWithPromise = async (path, newContent) => {
  try {
    await fsPromise.writeFile(path, newContent)
  } catch (error) {
    console.log(error)
  }

  readFileWithPromise(path)
}

// getStatsWithPromise('./text.txt')
// readFileWithPromise('./text.txt')
// writeFileWithPromise('./text.txt', 'Hello, world!')

// ▶︎ ▶︎ ▶︎ ▶︎ ▶︎ FS CALLBACK ◀︎ ◀︎ ◀︎ ◀︎ ◀︎
const { stat, readFile, writeFile, appendFile } = require('node:fs')

const getStatsWithCallback = (path) => {
  stat(path, (err, stats) => {
    if (err) throw err

    console.log(stats)
    console.log(`isFile: ${stats.isFile()}`)
    console.log(`isDirectory: ${stats.isDirectory()}`)
  })
}

const readFileWithCallback = (path) => {
  readFile(path, 'utf-8', (err, data) => {
    if (err) throw err

    console.log(data)
  })
}

const writeFileWithCallback = (path, newContent) => {
  writeFile(path, newContent, (err) => {
    if (err) throw err
  })

  readFileWithCallback(path)
}

const appendFileWithCallback = (path, newContent) => {
  appendFile(path, newContent, (err) => {
    if (err) throw err
  })

  readFileWithCallback(path)
}

// getStatsWithCallback('./text.txt')
// readFileWithCallback('./text.txt')
// writeFileWithCallback('./text.txt', 'Lorem ipsum dolor sit amet')
// appendFileWithCallback('./text.txt', 'New appended text from callback function')
