import '../../dirtyShould';
import Url from '../../../src/common/Url';
import smart from '../../../src/popup/smartKeyword/smartKeyword';

// http://www.iqiyi.com/v_19rrkf7vt0.html?fromvsogou=1
// test data format: [tabUrl, meta, title, h1, h2]
let tData = [];
// let tData = [
//   ["http://www.iqiyi.com/v_19rrkf7vt0.html?fromvsogou=1",["第三個人电影","第三個人高清完整版","第三個人在线观看"],"第三個人-电影-高清完整版视频在线观看–爱奇艺","第三個人 7.4",["猜你喜欢","爱奇艺热播","电影榜","视频推荐"]],
//   ["https://movie.douban.com/subject/1484091/questions/21123/?from=subject",["不懂 最后 Jeff 自杀 高人 解惑 一下 水果硬糖 解析 解读 理解"],"《水果硬糖》 我不懂最后Jeff为什么要自杀？有高人可以解惑一下么？ - 豆瓣电影","我不懂最后Jeff为什么要自杀？有高人可以解惑一下么？",["关于《水果硬糖》的问题 ( 全部22个 )","其它热门问题"]],
//   ["http://v.sogou.com/movie/wxt5hmbawxnmr7ny63emw.html",["《第三个人》","《第三个人》在线观看","《第三个人》电影","《第三个人》下载"],"《第三个人》全集-高清电影完整版-在线观看-搜狗影视","",[]],
//   ["https://movie.douban.com/review/8229131/#comments",["评论","影评","观后感","罗曼蒂克消亡史"],"消亡的罗曼蒂克是什么？罗曼蒂克怎么消亡的？（罗曼蒂克消亡史）影评","消亡的罗曼蒂克是什么？罗曼蒂克怎么消亡的？",["更多罗曼蒂克消亡史的影评 · · · · · ·"]],
//   ["https://movie.douban.com/subject/24751763/",["罗曼蒂克消亡史","罗曼蒂克消亡史","罗曼蒂克消亡史影评","剧情介绍","电影图片","预告片","影讯","在线购票","论坛"],"罗曼蒂克消亡史 (豆瓣)","罗曼蒂克消亡史 (2016)",["罗曼蒂克消亡史的剧情简介  ·  ·  ·  ·  ·  ·","罗曼蒂克消亡史的预告片和图片 · · · · · · ( 预告片14 |  图片376 |  添加图片 )","喜欢这部电影的人也喜欢 · · · · · ·","罗曼蒂克消亡史的短评 · · · · · · ( 全部 30040 条 )","关于《罗曼蒂克消亡史》的问题 · · · · · · ( 全部115个 )","罗曼蒂克消亡史的影评 · · · · · · (全部 1419 条)","> 去这部影片的讨论区（全部171条）","豆瓣成员常用的标签 · · · · · ·","以下豆列推荐 · · · · · · ( 全部 )","谁在看这部电影 · · · · · ·"]],
//   ["http://exploringjs.com/es6/ch_template-literals.html",[],"8. Template literals","",["8. Template literals"]],
//   ["http://blog.mgechev.com/posts/",[],"All Posts – Minko Gechev's blog","All Posts",["Ahead-of-Time Compilation in Angular","2.5X Smaller Angular 2 Applications with Google Closure Compiler","Using Stripe with Angular 2","Building an Angular 2 Application for Production","Implementing the Missing \"resolve\" Feature of the Angular 2 Router","Scalable Single-Page Application Architecture","Managing ambient type definitions and dealing with the \"Duplicate identifier\" TypeScript error","Static Code Analysis of Angular 2 and TypeScript Projects","Enforcing Best Practices with Static Code Analysis of Angular 2 Projects","ViewChildren and ContentChildren in Angular 2","Dynamically Configuring the Angular's Router","Angular 2 Hot Loader","Lazy Loading of Route Components in Angular 2","Aspect-Oriented Programming in JavaScript","Flux in Depth. Store and Network Communication.","Using JSX with TypeScript","Flux in Depth. Overview and Components.","Even Faster AngularJS Data Structures","Boost the Performance of an AngularJS Application Using Immutable Data - Part 2","Angular2 - First Impressions","Build Your own Simplified AngularJS in 200 Lines of JavaScript","Persistent State of ReactJS Component","Boost the Performance of an AngularJS Application Using Immutable Data","Processing Binary Protocols with Client-Side JavaScript","Stream your Desktop to HTML5 Video Element","Multi-User Video Conference with WebRTC","Asynchronous calls with ES6 generators","Binary Tree iterator with ES6 generators","WebRTC chat with React.js","AngularJS in Patterns (Part 3)","AngularJS in Patterns (Part 2). Services.","Using GitHub Pages with Jekyll!","AngularJS in Patterns (Part 1). Overview of AngularJS","Singleton in JavaScript","Express over HTTPS","What I get from the JavaScript MV* frameworks","Remote Desktop Client with AngularJS and Yeoman","The magic of $resource (or simply a client-side Active Record)","AngularJS Inheritance Patterns","AngularAOP v0.1.0","Advanced JavaScript at Sofia University","AngularJS style guide","Lazy prefetching of AngularJS partials","VNC client on 200 lines of JavaScript","Aspect-Oriented Programming with AngularJS","CSS3 flipping effect","Why I should use publish/subscribe in JavaScript","Practical programming with JavaScript","JavaScript, the weird parts","Functional programming with JavaScript","plainvm","Looking for performance? Probably you should NOT use [].sort (V8)","JavaScript image scaling","ELang","Caching CSS with localStorage","Self-invoking functions in JavaScript (or Immediately Invoked Function Expressions)","Asus N56VZ + Ubuntu 12.04 (en)","Asus N56VZ + Ubuntu 12.04","Debian Squeeze + LXDE on Google Nexus S (or having some fun while suffering)","HTML5 image editor","Курсови проекти – ФМИ","SofiaJS…","Carousel Gallery","Color animation plugin for jQuery","SofiaJS","Sound notification in web page","f8…","f8","Google+ API","Ajax without jQuery for beginners","Blogger image resize","Hello world!"]
//   ],
//   ["https://en.wikipedia.org/wiki/JavaScript",[],"JavaScript - Wikipedia","JavaScript",["Contents","History[edit]","Trademark[edit]","Features[edit]","Syntax[edit]","Use in Web pages[edit]","Security[edit]","Uses outside Web pages[edit]","Development tools[edit]","Benchmark tools for developers[edit]","Version history[edit]","Related languages and features[edit]","References[edit]","Further reading[edit]","External links[edit]","Navigation menu"]
//   ]
// ];
tData.result = [
  [{"word":"第三個人","confidence":4}],
  [{"word":"Jeff","confidence":1.88},{"word":"水果硬糖","confidence":1.09}],
  [{"word":"《第三个人》","confidence":1}],
  [{"word":"罗曼蒂克消亡史","confidence":1.01}],
  [{"word":"罗曼蒂克消亡史","confidence":4.099999999999998},{"word":"预告片","confidence":0.01}],
  [{"word":"","confidence":0}]
  // http://stackoverflow.com/questions/27336663/for-statement-does-not-loop-contact-application
];

describe('smartKeyword', () => {
  describe('overall', () => {
    let r = [];
    for(let data of tData) {
      let url = new Url(data[0]);
      r.push(smart(url, ...data.splice(1, data.length)));
    }
    console.log(JSON.stringify(r));
    // smart(...tData[0]).should.equal([]);
  });
});