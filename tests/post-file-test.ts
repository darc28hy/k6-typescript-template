import { sleep, check } from 'k6'
import http, { StructuredRequestBody } from 'k6/http'
import { Options } from 'k6/options'
import { outputReport } from '../lib/report'
import type { Data } from '../lib/type'

const testName = 'post-file-test'

const binFile = open('../assets/test.png', 'b')
const url = `https://httpbin.org/post`

export const options: Options = {
  vus: 5,
  duration: '10s',
}

export default (): void => {
  const postData: StructuredRequestBody = { file: http.file(binFile) }
  const response = http.post(url, postData)

  check(response, {
    'status is 200': (r) => r.status === 200,
  })

  sleep(1)
}

export const handleSummary = (data: Data) => {
  return outputReport(testName, data)
}
