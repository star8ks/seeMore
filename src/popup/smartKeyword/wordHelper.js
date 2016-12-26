/**
 * mark very important keywords, which are:
 * 1. English words(at least 2 [a-zA-Z] characters) surrounded by CJK characters
 * 2. Uppercase words(at least first 2 character are uppercase)
 * 3. Names(at least 2 words, and every word has capitalized first letter)
 * @author ray7551@gmail.com
 */
import {regex, match as matchAll} from '../../common/base';
import {CJK, CJK_PUNCT, PUNCT, KEYWORD_BLACKLIST} from './const';
// ASCII characters those not break word meaning
const ASCII_CHAR = regex`a-zA-Z\d~&*+'\-`;
const ASCII_PUNCT = regex`/_,\.<>\?\`!@#\$%\^=";\:\[\]{}\|\(\)\\`;
const lGuimets = PUNCT.guillemets.left.reduce((all, current) => {
  all += current;
  return all;
}, '');
const rGuimets = PUNCT.guillemets.right.reduce((all, current) => {
  all += current;
  return all;
}, '');

let markUpperWord = function (str) {
  let upperSubstrRegex = new RegExp(regex`(^|[^${CJK}a-zA-Z${lGuimets}])([A-Z]{2,}[${ASCII_CHAR}]*(?:\s+[A-Z]{2,}[${ASCII_CHAR}]*)*)\b(?![${CJK}])`, 'g');// ((\s+(?![A-Z]))?)
  return str.replace(upperSubstrRegex, '$1《$2》');
};

let markEnWord = function (str) {
  // let vipSubstrRegex = new RegExp(regex`(^|[${CJK}${CJK_PUNCT}${rGuimets}]|\s)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)([${CJK}${CJK_PUNCT}${lGuimets}]|\s)`, 'ig');
  let vipSubstrRegex0 = new RegExp(regex`(^)(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)(_*)\b(\s*|[${ASCII_PUNCT}]*)([${CJK}])`, 'ig');
  let vipSubstrRegex1 = new RegExp(regex`([${CJK}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)\b`, 'ig');
  let vipSubstrRegex2 = new RegExp(regex`([${rGuimets}${CJK_PUNCT}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)\b([^${ASCII_PUNCT}\s])`, 'ig');
  let vipSubstrRegex3 = new RegExp(regex`([${ASCII_PUNCT}])(\s*)([a-z]{2,}[${ASCII_CHAR}]*(?:\s+[${ASCII_CHAR}]+)*)(_*)\b(\s*|[${ASCII_PUNCT}]*)([${CJK}])`, 'ig');
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
  let beginRegex = new RegExp(regex`^([${ASCII_CHAR}]+)》`);
  let tailRegex = new RegExp(regex`《([${ASCII_CHAR}]+)$`);
  return str.replace(beginRegex, '《$1》').replace(tailRegex, '《$1》');
};

let markName = function (str) {
  let validCharacter = regex`a-zÀ-ÿ`;
  let name = regex`[A-Z][${validCharacter}]+`;
  let subElement = regex`(?:[Nn]o.\s?\d+)|(?:${name})`;
  let nameRegex1 = new RegExp(regex`
    (^|[^${CJK}a-zA-Z${lGuimets}])
    (
      (?:${subElement})
      (?:\s+(?:${subElement}))+
    )
    \b
    (?![${CJK}])
  `, 'g');// ((\s+(?![A-Z]))?)
  // /[A-Z][a-z]+\s*[-_/]\s*[A-Z][a-z]+/.test('javascript - Mocha / Chai expect.se')
  let nameRegex2 = new RegExp(regex`
    (^|[^${CJK}a-zA-Z${lGuimets}])
    (
      (?:${subElement})
      (?:\s*[-_/]\s*(?:${subElement}))+
    )
    (?![${CJK}])
  `, 'g');
  return str.replace(nameRegex1, (match, p1, p2) => {
    let dividedName = p2.split(/\s+/g);
    for(let name of dividedName) {
      if(KEYWORD_BLACKLIST.includes(name.toLowerCase())) return match;
    }
    return `${p1}《${p2}》`;
  }).replace(nameRegex2, (match, p1='', p2) => {
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

let divide = function (str) {
  // dividers, not include \s
  let commonDivider = regex`\.,，。\<\>《》、\/`;
  let regLeft = new RegExp(regex`
    ([${CJK}])\s+(.)
  `, 'g');
  let regRight = new RegExp(regex`
    (.)\s+([${CJK}])
  `, 'g');
  let require = new RegExp(regex`[${commonDivider}]+`, 'g');
  return str.replace(regLeft, '$1|$2').replace(regRight, '$1|$2')
    .replace(require, '|').split('|');
};

let removeMarked = function(str) {
  return str.replace(/《[^》]*》/g, ' ');
};

let forEachMarked = function (str, fn) {
  let matched = matchAll(str, /《([^《》]+)》/g) || [];
  matched.forEach(match => {
    fn(match[1]);
  })
};

export default markVipKeyword;
export {markVipKeyword, markUpperWord, markEnWord, markEnds, markName, divide, removeMarked, forEachMarked};