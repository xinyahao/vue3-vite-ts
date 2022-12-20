import dotenv from 'dotenv'
import fs from 'fs'

function diff(arrA: Array<string>, arrB: Array<string>): Array<string> {
  return arrA.filter((item: string) => !arrB.includes(item))
}

function compact(obj: object): object {
  const ret = {}
  Object.keys(obj).forEach((k: string) => {
    if (obj[k]) {
      ret[k] = obj[k]
    }
  })
  return ret
}

export default (
  target: string,
  sample: string,
  allowEmpty = false
): boolean => {
  const processEnv = allowEmpty ? process.env : compact(process.env)
  const exampleVars = dotenv.parse(fs.readFileSync(sample))
  const missing = diff(Object.keys(exampleVars), Object.keys(processEnv))

  if (missing.length > 0) {
    throw new Error(`
      \n============================
      \n  Config found in example env but missing in ${
        process.env.NODE_ENV
      }: ${missing.join(', ')}.
      \n  Check your .env.${process.env.NODE_ENV} file.
      \n============================\n
      `)
    return false
  }
  return true
}
