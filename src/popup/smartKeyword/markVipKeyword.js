/**
 * mark very important keywords, which are:
 * 1. English words(at least 2 [a-zA-Z] characters) surrounded by CJK characters
 * 2. Uppercase words(at least first 2 character are uppercase)
 * 3. Names(at least 2 words, and every word has capitalized first letter)
 * @author ray7551@gmail.com
 */
import {regex} from '../../common/base';
import {CJK, CJK_PUNCT, PUNCT, KEYWORD_BLACKLIST} from './const';
// ASCII characters those not break word meaning
const ASCII_CHAR = String.raw`a-zA-Z\d~&*+'\-`;
const ASCII_PUNCT = String.raw`/_,\.<>\?\`!@#\$%\^=";\:\[\]{}\|\(\)\\`;
const lGuimets = PUNCT.guillemets.left.reduce((all, current) => {
  all += current;
  return all;
}, '');
const rGuimets = PUNCT.guillemets.right.reduce((all, current) => {
  all += current;
  return all;
}, '');

let markUpperWord = function (str) {
  // let upperSubstrRegex = new RegExp(String.raw`(^|[^${CJK}a-zA-Z${lGuimets}]|[${CJK_PUNCT}。.\s])([A-Z]{2,}[${ASCII_CHAR}]*(?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*)([^${CJK}A-Z${rGuimets}]|[${CJK_PUNCT}.\s]|$)`, 'g'); // ?《YEAH》。MAGIC 《LEAP》    ?《YEAH》.MAGIC 《LEAP》
  // let upperSubstrRegex = new RegExp(String.raw`(^|[^${CJK}a-zA-Z${lGuimets}]|\b)([A-Z]{2,}[${ASCII_CHAR}]*(?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*)([^${CJK}A-Z${rGuimets}]|\b|$)`, 'g'); // 的《MAX》是    Is 《《MAGIC》》 leap
  // (?<![a-zA-Z‹«《〈『])\b([A-Z]{2,}[a-zA-Z\d~@&*()_+'\-]*(?:\s+[A-Z]{2,}[a-zA-Z\d~@&*()_+'\-]*)*)\b([^A-Z›»》〉』。]|[。]|$)
  // console.log(upperSubstrRegex)
  // let upperSubstrRegex = new RegExp(String.raw`(^|[^${CJK}a-zA-Z${lGuimets}]|\b)\b([A-Z]{2,}[${ASCII_CHAR}]*(?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*)\b([^${CJK}A-Z${rGuimets}]|$)`, 'g'); // should ignore upper word surrounded by CJK characters
  // return str.replace(upperSubstrRegex, '$1《$2》$3');
  // let upperSubstrRegex = new RegExp(String.raw`(^|[^${CJK}a-zA-Z${lGuimets}])([A-Z]{2,}[${ASCII_CHAR}]*(?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*)\b`, 'g');
  // return str.replace(upperSubstrRegex, '$1《$2》');

  // let upperSubstrRegex = new RegExp(String.raw`(^|[^${CJK}a-zA-Z${lGuimets}])(\s*)([A-Z]{2,}[${ASCII_CHAR}]*(?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*)\b(.*)`, 'g');
  // return str.replace(upperSubstrRegex, (...args) => {
  //   let p1 = args[1], p2 = args[2] || '', p3 = args[3], p4 = args[4] || '', offset = args[5], string = args[6];
  //   if(p4 && new RegExp(`[${CJK}]`).test(p4)) {
  //     console.log(string);
  //     return `${p1}${p2}${p3}${p4}`;
  //   }
  //   // avoid 服TAXI MAN => 服TAXI 《MAN》
  //   if (/\s/.test(p1)) {
  //     return `${p1}${p2}${p3}${p4}`;
  //   }
  //   return `${p1}${p2}《${p3}》${p4}`;
  // });

  let upperSubstrRegex = new RegExp(String.raw`(^|[^${CJK}a-zA-Z${lGuimets}])([A-Z]{2,}[${ASCII_CHAR}]*(?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*)\b(?![${CJK}])`, 'g');// ((\s+(?![A-Z]))?)
  return str.replace(upperSubstrRegex, '$1《$2》');
  // return str.replace(upperSubstrRegex, (match, p1, p2, p3='') => {
  //   return `${p1}《${p2}》${p3}`;
  // });
};

let markEnWord = function (str) {
  // let vipSubstrRegex = new RegExp(String.raw`(^|[${CJK}${CJK_PUNCT}${rGuimets}]|\s)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)([${CJK}${CJK_PUNCT}${lGuimets}]|\s)`, 'ig');
  let vipSubstrRegex0 = new RegExp(String.raw`(^)(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)(_*)\b(\s*|[${ASCII_PUNCT}]*)([${CJK}])`, 'ig');
  let vipSubstrRegex1 = new RegExp(String.raw`([${CJK}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)\b`, 'ig');
  let vipSubstrRegex2 = new RegExp(String.raw`([${rGuimets}${CJK_PUNCT}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)\b([^${ASCII_PUNCT}\s])`, 'ig');
  let vipSubstrRegex3 = new RegExp(String.raw`([${ASCII_PUNCT}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)(_*)\b(\s*|[${ASCII_PUNCT}]*)([${CJK}])`, 'ig');
  let modify = function(match, p1, p2, p3, p4) {
    return p2 ? `${p1}${p2}《${p3}》${p4}` : `${p1}《${p3}》${p4}`;
  };
  return str.replace(vipSubstrRegex0, (match, p1, p2='', p3, p4='', p5='', p6) => {
    return `${p1}${p2}《${p3}》${p4}${p5}${p6}`;
  }).replace(vipSubstrRegex1, (match, p1, p2, p3) => {
    return p2 ? `${p1}${p2}《${p3}》` : `${p1}《${p3}》`;
  }).replace(vipSubstrRegex2, modify).replace(vipSubstrRegex3, (match, p1, p2='', p3, p4='', p5='', p6) => {
    return `${p1}${p2}《${p3}》${p4}${p5}${p6}`;
  });
};

let markEnds = function (str) {
  let beginRegex = new RegExp(String.raw`^([${ASCII_CHAR}]+)》`);
  let tailRegex = new RegExp(String.raw`《([${ASCII_CHAR}]+)$`);
  return str.replace(beginRegex, '《$1》').replace(tailRegex, '《$1》');
};

let markName = function (str) {
  let validCharacter = String.raw`a-zÀ-ÿ`;
  let name = String.raw`[A-Z][${validCharacter}]+`;
  let subElement = regex`(?:[Nn]o.\s?\d+)|(?:${name})`;
  let nameRegex1 = new RegExp(String.raw`(^|[^${CJK}a-zA-Z${lGuimets}])((?:${subElement})(?:\s+(?:${subElement}))+)\b(?![${CJK}])`, 'g');// ((\s+(?![A-Z]))?)
  // /[A-Z][a-z]+\s*[-_/]\s*[A-Z][a-z]+/.test('javascript - Mocha / Chai expect.se')
  let nameRegex2 = new RegExp(regex`(^|[^${CJK}a-zA-Z${lGuimets}])((?:${subElement})(?:\s*[-_/]\s*(?:${subElement}))+)(?![${CJK}])`, 'g');
  // let nameRegex2 = new RegExp(regex`
  // (^|[-_/]|\s)
  // ( # p2: the 《name》
  //   (?:${subElement})
  //   (?:
  //     \s+(?:${subElement})
  //   )*
  // )
  // (?=[-_/]|$)
  // `, 'g');
  return str.replace(nameRegex1, (match, p1, p2) => {
    let dividedName = p2.split(/\s+/g);
    for(let name of dividedName) {
      if(KEYWORD_BLACKLIST.includes(name.toLowerCase())) return match;
    }
    return `${p1}《${p2}》`;
  }).replace(nameRegex2, (match, p1='', p2, p3='') => {
    let dividedName = p2.split(/[-_/]+|\s+/g);
    for(let name of dividedName) {
      if(KEYWORD_BLACKLIST.includes(name.toLowerCase())) return match;
    }
    if(/\//.test(p2)) {
      p2 = p2.replace(/(\s*)\/(\s*)/, '》$1/$2《');
    }
    return `${p1}《${p2}》`;
  });
};

// 《p1》\s*《p2》 -> 《p1\s?p2》
let concat = function (str) {
  return str.replace(/》(\s*)《/g, ' ');
};

let markVipKeyword = function (str) {
  return concat(markName(markEnWord(markUpperWord(str))));
};

export default markVipKeyword;
export {markVipKeyword, markUpperWord, markEnWord, markEnds, markName};