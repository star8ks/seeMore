var CONFIG = {
  engines: {
    google: {
      displayName: 'Google',
      open: true,
      // view-source:https://www.google.com/supported_domains
      hostName: 'google',
      hosts: ['ipv4.google.com', 'ipv6.google.com', 'ipv6.google.com.hk', 'www.google.com'],
      url: 'https://www.google.com.hk/search?q=%s'
    },
    baidu: {
      displayName: '百度',
      open: true,
      hostName: 'baidu',
      hosts: ['www.baidu.com'],
      url: 'https://www.baidu.com/s?wd=%s'
    },
    360: {
      displayName: '360搜索',
      open: false,
      hostName: '360',
      hosts: ['www.so.com'],
      url: 'https://www.so.com/s?q=%s'
    }
  },
  devMode: true
};