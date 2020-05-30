// see https://github.com/Selection-Translator/translation.js#2-%E7%BB%99%E6%9C%89%E9%81%93%E7%BF%BB%E8%AF%91%E6%8E%A5%E5%8F%A3%E6%B7%BB%E5%8A%A0-referer-%E8%AF%B7%E6%B1%82%E5%A4%B4
chrome.webRequest.onBeforeSendHeaders.addListener(
  ({ requestHeaders }) => {
    const r = {
      name: 'Referer',
      value: 'https://fanyi.youdao.com'
    }
    const index = requestHeaders.findIndex(
      ({ name }) => name.toLowerCase() === 'referer'
    )
    if (index >= 0) {
      requestHeaders.splice(index, 1, r)
    } else {
      requestHeaders.push(r)
    }
    return { requestHeaders }
  },
  {
    urls: ['https://fanyi.youdao.com/translate_o'],
    types: ['xmlhttprequest']
  },
  ['blocking', 'requestHeaders']
)