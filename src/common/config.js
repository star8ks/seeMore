const CONFIG = {
  selectionMaxLength: 200,
  translateMaxLength: 80,
  engineTypes: {
    1: {name: 'Search Engine', order: 1, default: true},
    2: {name: 'Video', order: 2, default: true},
    3: {name: 'Translate', order: 3, default: true},
    4: {name: 'EBook', order: 4, default: true},
    5: {name: 'Shopping', order: 5, default: true},
    6: {name: 'Development', order: 6, default: true},
    7: {name: 'Sub', order: 7, default: true},
    8: {name: 'Torrents', order: 8, default: true},
    101: {name: 'Search Engine', order: 1},
    102: {name: 'Video', order: 2},
    103: {name: 'Translate', order: 3},
    104: {name: 'EBook', order: 4},
    105: {name: 'Development', order: 5},
    106: {name: 'Shopping', order: 6}
  },
  engines: {
    // Search engines
    google: {
      order: 100,
      typeId: 101,
      defaultTypeId: 1,
      displayName: 'Google',
      open: true,
      // view-source:https://www.google.com/supported_domains
      hosts: [
        'ipv4.google.com',
        'ipv6.google.com',
        'ipv6.google.com.hk',
        'www.google.com',
        'www.google.ad',
        'www.google.ae',
        'www.google.com.af',
        'www.google.com.ag',
        'www.google.com.ai',
        'www.google.al',
        'www.google.am',
        'www.google.co.ao',
        'www.google.com.ar',
        'www.google.as',
        'www.google.at',
        'www.google.com.au',
        'www.google.az',
        'www.google.ba',
        'www.google.com.bd',
        'www.google.be',
        'www.google.bf',
        'www.google.bg',
        'www.google.com.bh',
        'www.google.bi',
        'www.google.bj',
        'www.google.com.bn',
        'www.google.com.bo',
        'www.google.com.br',
        'www.google.bs',
        'www.google.bt',
        'www.google.co.bw',
        'www.google.by',
        'www.google.com.bz',
        'www.google.ca',
        'www.google.cd',
        'www.google.cf',
        'www.google.cg',
        'www.google.ch',
        'www.google.ci',
        'www.google.co.ck',
        'www.google.cl',
        'www.google.cm',
        'www.google.cn',
        'www.google.com.co',
        'www.google.co.cr',
        'www.google.com.cu',
        'www.google.cv',
        'www.google.com.cy',
        'www.google.cz',
        'www.google.de',
        'www.google.dj',
        'www.google.dk',
        'www.google.dm',
        'www.google.com.do',
        'www.google.dz',
        'www.google.com.ec',
        'www.google.ee',
        'www.google.com.eg',
        'www.google.es',
        'www.google.com.et',
        'www.google.fi',
        'www.google.com.fj',
        'www.google.fm',
        'www.google.fr',
        'www.google.ga',
        'www.google.ge',
        'www.google.gg',
        'www.google.com.gh',
        'www.google.com.gi',
        'www.google.gl',
        'www.google.gm',
        'www.google.gp',
        'www.google.gr',
        'www.google.com.gt',
        'www.google.gy',
        'www.google.com.hk',
        'www.google.hn',
        'www.google.hr',
        'www.google.ht',
        'www.google.hu',
        'www.google.co.id',
        'www.google.ie',
        'www.google.co.il',
        'www.google.im',
        'www.google.co.in',
        'www.google.iq',
        'www.google.is',
        'www.google.it',
        'www.google.je',
        'www.google.com.jm',
        'www.google.jo',
        'www.google.co.jp',
        'www.google.co.ke',
        'www.google.com.kh',
        'www.google.ki',
        'www.google.kg',
        'www.google.co.kr',
        'www.google.com.kw',
        'www.google.kz',
        'www.google.la',
        'www.google.com.lb',
        'www.google.li',
        'www.google.lk',
        'www.google.co.ls',
        'www.google.lt',
        'www.google.lu',
        'www.google.lv',
        'www.google.com.ly',
        'www.google.co.ma',
        'www.google.md',
        'www.google.me',
        'www.google.mg',
        'www.google.mk',
        'www.google.ml',
        'www.google.com.mm',
        'www.google.mn',
        'www.google.ms',
        'www.google.com.mt',
        'www.google.mu',
        'www.google.mv',
        'www.google.mw',
        'www.google.com.mx',
        'www.google.com.my',
        'www.google.co.mz',
        'www.google.com.na',
        'www.google.com.nf',
        'www.google.com.ng',
        'www.google.com.ni',
        'www.google.ne',
        'www.google.nl',
        'www.google.no',
        'www.google.com.np',
        'www.google.nr',
        'www.google.nu',
        'www.google.co.nz',
        'www.google.com.om',
        'www.google.com.pa',
        'www.google.com.pe',
        'www.google.com.pg',
        'www.google.com.ph',
        'www.google.com.pk',
        'www.google.pl',
        'www.google.pn',
        'www.google.com.pr',
        'www.google.ps',
        'www.google.pt',
        'www.google.com.py',
        'www.google.com.qa',
        'www.google.ro',
        'www.google.ru',
        'www.google.rw',
        'www.google.com.sa',
        'www.google.com.sb',
        'www.google.sc',
        'www.google.se',
        'www.google.com.sg',
        'www.google.sh',
        'www.google.si',
        'www.google.sk',
        'www.google.com.sl',
        'www.google.sn',
        'www.google.so',
        'www.google.sm',
        'www.google.sr',
        'www.google.st',
        'www.google.com.sv',
        'www.google.td',
        'www.google.tg',
        'www.google.co.th',
        'www.google.com.tj',
        'www.google.tk',
        'www.google.tl',
        'www.google.tm',
        'www.google.tn',
        'www.google.to',
        'www.google.com.tr',
        'www.google.tt',
        'www.google.com.tw',
        'www.google.co.tz',
        'www.google.com.ua',
        'www.google.co.ug',
        'www.google.co.uk',
        'www.google.com.uy',
        'www.google.co.uz',
        'www.google.com.vc',
        'www.google.co.ve',
        'www.google.vg',
        'www.google.co.vi',
        'www.google.com.vn',
        'www.google.vu',
        'www.google.ws',
        'www.google.rs',
        'www.google.co.za',
        'www.google.co.zm',
        'www.google.co.zw',
        'www.google.cat'
      ],
      url: 'https://www.google.com.hk/search?q=%s',
      resultPageRegex: /\/(search|webhp)/.source // it should be a valid regex source, if not set, will use .url.pathname to match
    },
    aol: {
      order: 400,
      typeId: 101,
      defaultTypeId: 1,
      displayName: 'Aol Search',
      open: false,
      hosts: ['www.aolsearch.com', 'search.aol.com'],
      url: 'http://www.aolsearch.com/search?q=%s'
    },
    baidu: {
      order: 200,
      typeId: 101,
      defaultTypeId: 1,
      displayName: 'Baidu',
      open: true,
      hosts: ['www.baidu.com'],
      siteKeywords: ['Baidu', '百度'],
      url: 'https://www.baidu.com/s?wd=%s'
    },
    bing: {
      order: 300,
      typeId: 101,
      defaultTypeId: 1,
      displayName: 'Bing',
      open: true,
      hosts: [
        'www.bing.com', 'bing.co', 'bing.co.uk', 'bing.com', 'be.bing.com', 'br.bing.com', 'ca.bing.com', 'cn.bing.com', 'de.bing.com', 'fr.bing.com', 'hk.bing.com', 'it.bing.com', 'jp.bing.com', 'm.bing.com', 'nz.bing.com', 'ssl.bing.com', 'uk.bing.com'
      ],
      url: 'https://cn.bing.com/search?q=%s'
    },
    yahoo: {
      order: 500,
      typeId: 101,
      defaultTypeId: 1,
      displayName: 'Yahoo',
      open: false,
      hosts: [
        'at.search.yahoo.com', 'au.search.yahoo.com', 'br.search.yahoo.com', 'ca.search.yahoo.com', 'qc.search.yahoo.com', 'ch.search.yahoo.com', 'chfr.search.yahoo.com', 'chit.search.yahoo.com', 'cl.search.yahoo.com', 'cn.search.yahoo.com', 'yahoo.cn', 'co.search.yahoo.com', 'espanol.search.yahoo.com', 'search.yahoo.com', 'de.search.yahoo.com', 'dk.search.yahoo.com', 'es.search.yahoo.com', 'fi.search.yahoo.com', 'fr.search.yahoo.com', 'gr.search.yahoo.com', 'hk.search.yahoo.com', 'id.search.yahoo.com', 'in.search.yahoo.com', 'it.search.yahoo.com', 'maktoob.search.yahoo.com', 'search.yahoo.co.jp', 'kr.search.yahoo.com', 'mx.search.yahoo.com', 'malaysia.search.yahoo.com', 'nl.search.yahoo.com', 'no.search.yahoo.com', 'nz.search.yahoo.com', 'pe.search.yahoo.com', 'ph.search.yahoo.com', 'pl.search.yahoo.com', 'ru.search.yahoo.com', 'se.search.yahoo.com', 'sg.search.yahoo.com', 'th.search.yahoo.com', 'tr.search.yahoo.com', 'tw.search.yahoo.com', 'uk.search.yahoo.com', 've.search.yahoo.com', 'vn.search.yahoo.com'
      ],
      url: 'https://search.yahoo.com/search?p=%s'
    },
    sogou: {
      order: 600,
      typeId: 101,
      defaultTypeId: 1,
      displayName: 'Sogou',
      open: false,
      hosts: ['www.sogou.com'],
      url: 'https://www.sogou.com/web?query=%s'
    },
    360: {
      order: 700,
      typeId: 101,
      defaultTypeId: 1,
      displayName: '360',
      open: false,
      hosts: ['www.so.com'],
      url: 'https://www.so.com/s?q=%s'
    },
    duck: {
      order: 800,
      typeId: 101,
      defaultTypeId: 1,
      displayName: 'DuckDuckGo',
      open: true,
      hosts: ['duckduckgo.com'],
      url: 'https://duckduckgo.com/?q=%s'
    },
    // Movie, Video, Sub
    doubanMovie: {
      order: 900,
      typeId: 102,
      defaultTypeId: 2,
      displayName: '豆瓣电影',
      open: true,
      hosts: ['movie.douban.com'],
      url: 'https://movie.douban.com/subject_search?search_text=%s'
    },
    RARBG: {
      order: 1000,
      typeId: 102,
      defaultTypeId: 8,
      displayName: 'RARBG',
      open: true,
      hosts: ['rarbg.to'],
      url: 'https://rarbg.to/torrents.php?search=%s'
    },
    AcFun: {
      order: 1100,
      typeId: 102,
      defaultTypeId: 2,
      displayName: 'AcFun',
      open: false,
      hosts: ['www.acfun.tv'],
      url: 'http://www.acfun.tv/search/#query=%s'
    },
    bilibili: {
      order: 1200,
      typeId: 102,
      defaultTypeId: 2,
      displayName: 'bilibili',
      open: true,
      siteKeywords: ['哔哩哔哩', 'Bilibili', 'B站', '弹幕'],
      hosts: ['search.bilibili.com'],
      url: 'http://search.bilibili.com/all?keyword=%s'
    },
    tencentVideo: {
      order: 1300,
      typeId: 102,
      defaultTypeId: 2,
      displayName: '腾讯视频',
      open: true,
      hosts: ['v.qq.com'],
      url: 'http://v.qq.com/x/search/?q=%s'
    },
    youtube: {
      order: 1400,
      typeId: 102,
      defaultTypeId: 2,
      displayName: 'YouTube',
      open: true,
      hosts: ['www.youtube.com'],
      url: 'https://www.youtube.com/results?search_query=%s'
    },
    subHD: {
      order: 1500,
      typeId: 102,
      defaultTypeId: 7,
      displayName: 'Sub HD',
      siteKeywords: ['Sub HD', 'SubHD', '字幕', '字幕翻译', '字幕下载', "电影字幕", "中文字幕", "电影字幕下载", "中文字幕下载", "字幕组", "射手网", "美剧字幕下载", "英剧字幕下载", "双语字幕下载", "美剧", "电影", "美剧下载", "英剧下载", "电影下载", "美剧字幕", "英剧字幕"],
      open: true,
      hosts: ['subhd.com'],
      url: 'http://subhd.com/search/%s'
    },
    zimuku: {
      order: 1600,
      typeId: 102,
      defaultTypeId: 7,
      displayName: 'zimuku',
      open: false,
      hosts: ['www.zimuku.net'],
      url: 'http://www.zimuku.net/search?q=%s'
    },
    // Dictionary
    iciba: {
      order: 1700,
      typeId: 103,
      defaultTypeId: 3,
      displayName: '爱词霸',
      open: true,
      hosts: ['www.iciba.com'],
      url: 'http://www.iciba.com/%s'
    },
    youdaoTranslate: {
      order: 1710,
      typeId: 103,
      defaultTypeId: 3,
      displayName: '有道翻译',
      open: false,
      hosts: ['fanyi.youdao.com'],
      url: 'http://fanyi.youdao.com/translate?i=%s'
    },
    youdaoDict: {
      order: 1720,
      typeId: 103,
      defaultTypeId: 3,
      displayName: '有道词典',
      open: true,
      hosts: ['dict.youdao.com'],
      url: 'http://dict.youdao.com/w/%s'
    },
    zdic: {
      order: 1750,
      typeId: 103,
      defaultTypeId: 3,
      displayName: '汉典',
      open: true,
      hosts: ['www.zdic.net'],
      url: 'http://www.zdic.net/search/?c=3&q=%s'
    },
    // EBook
    readFree: {
      order: 1800,
      typeId: 104,
      defaultTypeId: 4,
      displayName: 'readFree',
      open: true,
      hosts: ['readfree.me'],
      url: 'http://readfree.me/search/?q=%s'
    },
    ITeBooks: {
      order: 1900,
      typeId: 104,
      defaultTypeId: 4,
      displayName: 'IT eBooks',
      open: true,
      hosts: ['it-ebooks.info'],
      url: 'https://cse.google.com/cse?cx=013493258683483688568:xhfa6ctm1ki&q=%s#gsc.tab=0&gsc.q=%s'
    },
    // Development
    explainShell: {
      order: 2000,
      typeId: 105,
      defaultTypeId: 6,
      displayName: 'explainShell',
      open: true,
      hosts: ['explainShell.com'],
      url: 'http://explainshell.com/explain?cmd=%s'
    },
    mdn: {
      order: 2100,
      typeId: 105,
      defaultTypeId: 6,
      displayName: 'MDN',
      open: true,
      hosts: ['developer.mozilla.org'],
      url: 'https://developer.mozilla.org/search?q=%s'
    },
    gitHub: {
      order: 2200,
      typeId: 105,
      defaultTypeId: 6,
      displayName: 'GitHub',
      open: true,
      hosts: ['github.com'],
      url: 'https://github.com/search?utf8=%E2%9C%93&q=%s'
    },
    htmlPreview: {
      order: 2300,
      typeId: 105,
      defaultTypeId: 6,
      displayName: 'HTMLPreview',
      open: true,
      hosts: ['htmlpreview.github.io'],
      url: 'http://htmlpreview.github.io/?%s'
    },
    devDocs: {
      order: 2400,
      typeId: 105,
      defaultTypeId: 6,
      displayName: 'DevDocs',
      open: true,
      hosts: ['devdocs.io'],
      url: 'http://devdocs.io/#q=%s'
    },
    stackoverflow: {
      order: 2500,
      typeId: 105,
      defaultTypeId: 6,
      displayName: 'stackoverflow',
      open: true,
      hosts: ['stackoverflow.com'],
      url: 'https://stackoverflow.com/search?q=%s',
      resultPageRegex: /\/search/.source
    },
    //Shopping
    etao: {
      order: 2600,
      typeId: 106,
      defaultTypeId: 5,
      displayName: 'etao',
      open: false,
      hosts: ['s.etao.com'],
      url: 'http://s.etao.com/search?q=%s'
    },
    tmall: {
      order: 2700,
      typeId: 106,
      defaultTypeId: 5,
      displayName: '天猫',
      open: true,
      hosts: ['list.tmall.com'],
      url: 'https://list.tmall.com/search_product.htm?q=%s'
    },
    jd: {
      order: 2800,
      typeId: 106,
      defaultTypeId: 5,
      displayName: '京东',
      open: true,
      hosts: ['search.jd.com'],
      url: 'http://search.jd.com/Search?keyword=%s&enc=utf-8'
    },
    amazon: {
      order: 2900,
      typeId: 106,
      defaultTypeId: 5,
      displayName: '亚马逊',
      open: true,
      hosts: ['list.tmall.com'],
      url: 'https://www.amazon.cn/s/?field-keywords=%s'
    },
    taobao: {
      order: 3000,
      typeId: 106,
      defaultTypeId: 5,
      displayName: '淘宝',
      open: true,
      hosts: ['s.taobao.com'],
      url: 'https://s.taobao.com/search?q=%s'
    }
  },
  devMode: true
};

export default CONFIG;