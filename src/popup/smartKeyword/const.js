/**
 * Created by ray7551@gmail.com on 12.14 014.
 */
import {getValueDeep} from '../../common/base';

// Punctuations, excluding spaces
// https://en.wikipedia.org/wiki/Punctuation_of_English
const PUNCT = {
  // punctuations
  apostrophe: ["’", "'"],
  brackets: ["[", "]", "(", ")", "{", "}", "⟨", "⟩", "（", "）", "【", "】"],
  colon: [":", "："],
  comma: [",", "،", "、", "，"],
  dash: ["-", "‐", "‒", "–", "—", "―"],
  ellipsis: ["…", "..."],
  exclamation: ["!", "！"],
  period: [".", "。"],
  guillemets: {
    left: ["‹", "«", "《", "〈", "『"],
    right: ["›", "»", "》", "〉", "』"]
  },
  question: ["?", "？"],
  quotation: ["‘", "’", "“", "”", "'", "'", "\"", "「", "」"],
  semicolon: [";", "；"],
  slash: ["/", "⁄", "\\"],
  math: ["`", "+", "=", "<", ">", "°"],
  // word dividers
  interpunct: ["·", "・", "･"],
  block: ["¶", "§"],

  // typography
  verticalBar: ["|", "¦", "‖", "∣"],
  tilde: ["~", "˜", "∼"],
  at: ["@"],
  hash: ["#"],
  currency: ["¤", "￥", "$", "€", "£"],// "₳", "฿", "₵", "¢", "₡", "₢", "₫", "₯", "֏", "₠", "ƒ", "₣", "₲", "₴", "₭", "₺", "ℳ", "₥", "₦", "₧", "₱", "₰", "៛", "₽", "₹", "₨", "₪", "৳", "₸", "₮", "₩"],
  per: ["%", "‰", "‱"],
  caret: ["^", "‸"],
  ampersand: ["&"],
  asterisk: ["*"],
  underscore: ["_"],
  ip: ["©", "℗", "®", "℠", "™"]
};
const SPACES = [" ", " ", " ", "	"];

let PUNCT_FLATTEN = getValueDeep(PUNCT);
/**
 * keyword blacklist
 * @notice all in lower case
 * @see https://en.wikibooks.org/wiki/English_in_Use/Prepositions,_Conjunctions,_and_Interjections
 */
const KEYWORD_BLACKLIST = [
  ...PUNCT_FLATTEN,
  "i", "me", "you", "he", "she", "they", "anybody", "it", "one", "there", "that", "this", "other",
  "my", "your", "his", "her", "there", "own",
  "the", "a", "my", "more", "much", "either",
  "while", "meanwhile",
  "is", "isn't", "isnt", "am", "ain't", "aint", "are", "have", "has", "get", "gets", "got", "was", "wasnt",
  "no", "not", "nor",
  "what", "when", "who", "how", "why",
  "very", "so", "most", "least", "all", "only", "just", "but",
  "do", "doing", "did", "does", "can", "cannot", "can't", 'up',
  // https://en.wikipedia.org/wiki/List_of_English_prepositions
  "about", "above", "across", "after", "against", "along", "amid", "among", "around", "at", "by", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "during", "except", "for", "from", "in", "into", "of", "off", "on", "over", "past", "through", "to", "toward", "towards", "under", "underneath", "until", "with", "without",
  // Conjunctions
  "and", "as", "both", "because", "even", "for", "if", "that", "then", "since", "seeing", "so", "or", "nor", "either", "neither", "than", "though", "although", "yet", "but", "except", "whether", "lest", "unless", "save", "provided", "notwithstanding", "whereas"
];

/**
 * @see http://www.unicode.org/reports/tr38/#BlockListing
 * #Katakana 30A0–30FF
 * #Hiragana 3040–309F
 * Hangul Jamo  1100–11FF
 * #CJK Unified Ideographs 4E00–9FD5
 * #Hangul Syllables AC00–D7AF
 * CJK Unified Ideographs Extension A 3400–4DB5
 * #: most frequently used
 */
const CJK = String.raw`\u30A0-\u30FF\u3040-\u309F\u1100-\u11FF\u4E00-\u9FD5`;

// CJK punct excluding guillemets
const CJK_PUNCT = '，。？！·‘’“”；：【】…（）—';

// printable ASCII excluding spaces
const PRINTABLE_ASCII = String.raw`\u0021-\u007E`;

const CONFIDENCE = 1;
const MIN_CONFIDENCE = .99;
const EMPTY_KEYWORDS = [{
  word: '',
  confidence: 0
}];
export {PUNCT, SPACES, PUNCT_FLATTEN, CJK, CJK_PUNCT, PRINTABLE_ASCII,
  KEYWORD_BLACKLIST, CONFIDENCE, MIN_CONFIDENCE, EMPTY_KEYWORDS
};