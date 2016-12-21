const chai  = require('chai');
const dirtyChai = require('dirty-chai');
import {markVipKeyword, markUpperWord, markEnWord, markEnds, markName} from '../../../src/popup/smartKeyword/markVipKeyword';

chai.config.includeStack = true;
chai.use(dirtyChai);
var should = chai.should();

describe('mark functions', () => {
  describe('markUpperWord', () => {
    it('should mark [a-zA-Z]{2,} words', () => {
      markUpperWord('Is M a liar').should.equal('Is M a liar');
      markUpperWord('Is MG a liar').should.equal('Is 《MG》 a liar');
      markUpperWord('Is MAGIC a liar').should.equal('Is 《MAGIC》 a liar');
      markUpperWord('Is MAGIC leap a liar').should.equal('Is 《MAGIC》 leap a liar');
    });
    it('should not mark these words', () => {
      markUpperWord('Yeah, maGIC LEAP IS a liar').should.equal('Yeah, maGIC 《LEAP IS》 a liar');
    });
    it('should mark multiple upper words', () => {
      markUpperWord('Is MAGIC LEAP a liar').should.equal('Is 《MAGIC LEAP》 a liar');
      markUpperWord('Is MAGIC  LEAP a liar').should.equal('Is 《MAGIC  LEAP》 a liar');
      markUpperWord('Is MAGIC   LEAP a liar').should.equal('Is 《MAGIC   LEAP》 a liar');
    });
    it('should ignore upper word surrounded by CJK characters', () => {
      markUpperWord('真的MAX是').should.equal('真的MAX是');
      markUpperWord('真的MAx是').should.equal('真的MAx是');
      markUpperWord('危TAXI Man机的Magic Leap真的MAX是 iPhone 骗子吗？').should.equal('危TAXI Man机的Magic Leap真的MAX是 iPhone 骗子吗？');
      markUpperWord('Pest 服TAXI MAN务').should.equal('Pest 服TAXI MAN务');
      markUpperWord('Pest 服TAXI A MAN务').should.equal('Pest 服TAXI A MAN务');
      // markUpperWord('Pest 服TAXI MAN 务').should.equal('Pest 服TAXI MAN 务');
      // markUpperWord('Pest 服TAXI MAN MAN务').should.equal('Pest 服TAXI MAN MAN务');
      // markUpperWord('Pest 服TAXI MAN').should.equal('Pest 服TAXI MAN');
    });
    it('should ignore spaces', () => {
      markUpperWord('Is  MAGIC   LEAP a liar').should.equal('Is  《MAGIC   LEAP》 a liar');
    });
    it('should ignore already marked words', () => {
      markUpperWord('Is 《MAGIC》 leap a liar').should.equal('Is 《MAGIC》 leap a liar');
      markUpperWord('Is ‹MAGIC› leap a liar').should.equal('Is ‹MAGIC› leap a liar');
    });
    it('should marked words surrounded by ascii punct', () => {
      markUpperWord('Yeah, MAGIC LEAP is a liar').should.equal('Yeah, 《MAGIC LEAP》 is a liar');
      markUpperWord('Yeah,MAGIC LEAP is a liar').should.equal('Yeah,《MAGIC LEAP》 is a liar');
    });
    it('should mark upper word even it at the beginning or ending of line', () => {
      markUpperWord('Yeah,MAGIC LEAP is a LIAR').should.equal('Yeah,《MAGIC LEAP》 is a 《LIAR》');
      markUpperWord('YEAH, magic LEAP is a LIAR').should.equal('《YEAH》, magic 《LEAP》 is a 《LIAR》');
    });
    it('should not mark across ASCII divide punct', () => {
      markUpperWord('?YEAH, MAGIC LEAP is a liar').should.equal('?《YEAH》, 《MAGIC LEAP》 is a liar');
      markUpperWord('?YEAH.MAGIC LEAP is a liar').should.equal('?《YEAH》.《MAGIC LEAP》 is a liar');
    });
    it('should not mark across CJK divide punct', () => {
      markUpperWord('？MAGIC LEAP is a liar').should.equal('？《MAGIC LEAP》 is a liar');
      markUpperWord('?YEAH， MAGIC LEAP is a liar').should.equal('?《YEAH》， 《MAGIC LEAP》 is a liar');
      markUpperWord('?YEAH。MAGIC LEAP is a liar').should.equal('?《YEAH》。《MAGIC LEAP》 is a liar');
    });
    // it('should mark across ASCII connect punct', () => {
    //   markUpperWord('？MAGIC_LEAP is a liar').should.equal('？《MAGIC_LEAP》 is a liar');
    //   markUpperWord('?YEAH， MAGIC&LEAP is a liar').should.equal('?《YEAH》， 《MAGIC&LEAP》 is a liar');
    //   markUpperWord('?YEAH。MAGIC\'LEAP is a liar').should.equal('?《YEAH》。《MAGIC\'LEAP》 is a liar');
    // });
  });
  describe('markEnWord', () => {
    it('should mark [a-zA-Z]{2,} surrounded by CJK characters', () => {
      markEnWord('终于揭开了P的神秘面纱').should.equal('终于揭开了P的神秘面纱');
      markEnWord('终于揭开了Pandora的神秘面纱').should.equal('终于揭开了《Pandora》的神秘面纱');
    });
    it('should mark multiple [a-zA-Z]{2,} words', () => {
      markEnWord('终于揭开了Pandora   Premium的神秘面纱').should.equal('终于揭开了《Pandora   Premium》的神秘面纱');
      markEnWord('终于揭开了pandora Premium的神秘面纱').should.equal('终于揭开了《pandora Premium》的神秘面纱');
      markEnWord('终于揭开了Pandora k的神秘面纱').should.equal('终于揭开了《Pandora k》的神秘面纱');
      markEnWord('危TAXI Man机').should.equal('危《TAXI Man》机');
      markEnWord('看Pre危TAXI Man机').should.equal('看《Pre》危《TAXI Man》机');
    });
    it('should ignore spaces', () => {
      markEnWord('终于揭开了 Pandora 的神秘面纱').should.equal('终于揭开了 《Pandora》 的神秘面纱');
      markEnWord('终于揭开了  pandora 的神秘面纱').should.equal('终于揭开了  《pandora》 的神秘面纱');
      markEnWord('终于揭开了 Pandora  的神秘面纱').should.equal('终于揭开了 《Pandora》  的神秘面纱');
    });
    it('should ignore already marked words', () => {
      markEnWord('终推流《Fasion》服').should.equal('终推流《Fasion》服');
      markEnWord('终《推》流Fasion服').should.equal('终《推》流《Fasion》服');
      markEnWord('终《推流》Fasion服').should.equal('终《推流》《Fasion》服');
      markEnWord('终《推流》 Fasion服').should.equal('终《推流》 《Fasion》服');
      markEnWord('is 《MAGIC LEAP》 a liar?').should.equal('is 《MAGIC LEAP》 a liar?');
    });
    it('should marked words surrounded by CJK punct', () => {
      markEnWord('终推流，fasion服').should.equal('终推流，《fasion》服');
      markEnWord('终推流fasion。服').should.equal('终推流《fasion》。服');
      markEnWord('终推流“fasion。服”').should.equal('终推流“《fasion》。服”');
      markEnWord('终推流》fasion。服').should.equal('终推流》《fasion》。服');
      markEnWord('终推流， fasion服').should.equal('终推流， 《fasion》服');
    });
    it('should not match words surrounded by CJK punct and ASCII punct', () => {
      markEnWord('骗子吗？is MAGIC LEAP a liar?').should.equal('骗子吗？is MAGIC LEAP a liar?');
    });
    it('should not match whole english string', () => {
      markEnWord('is MAGIC LEAP a liar?').should.equal('is MAGIC LEAP a liar?');
      markEnWord('is 《MAGIC》 leap a liar?').should.equal('is 《MAGIC》 leap a liar?');
      markEnWord('is magic leap a liar').should.equal('is magic leap a liar');
    });
    it('should mark [a-zA-Z]{2,} words even it at the beginning or ending of line', () => {
      markEnWord('骗子吗LIAR').should.equal('骗子吗《LIAR》');
      markEnWord('骗子吗liar LIAR').should.equal('骗子吗《liar LIAR》');
      markEnWord('YEAH骗子吗').should.equal('《YEAH》骗子吗');
      markEnWord('骗子吗 LIAR').should.equal('骗子吗 《LIAR》');
      markEnWord('YEAH 骗子吗').should.equal('《YEAH》 骗子吗');
    });
  });
  describe('markEnds', () => {
    it('should mark beginning', () => {
      markEnds('pan》哈哈哈').should.equal('《pan》哈哈哈');
    });
    it('should mark tailing', () => {
      markEnds('哈哈哈《pan').should.equal('哈哈哈《pan》');
    });
  });
  describe('markName', () => {
    it('should mark at least 2 capital start words', () => {
      markName('Nyiregyházi plays Liszt Hungarian Rhapsody full').should.equal('Nyiregyházi plays 《Liszt Hungarian Rhapsody》 full');
      markName('A Grammar of the Latin Language: For the Use of Schools and Colleges').should.equal('A Grammar of the 《Latin Language》: For the Use of Schools and Colleges');
    });
    it('should mark words like No.3', () => {
      markName('Nyiregyházi plays Liszt Hungarian Rhapsody no.3 full').should.equal('Nyiregyházi plays 《Liszt Hungarian Rhapsody no.3》 full');
      markName('Nyiregyházi plays Liszt Hungarian Rhapsody No.3').should.equal('Nyiregyházi plays 《Liszt Hungarian Rhapsody No.3》');
      markName('No.3 Liszt Hungarian Rhapsody the Nyiregyhazi Version').should.equal('《No.3 Liszt Hungarian Rhapsody》 the 《Nyiregyhazi Version》');
      markName('No.3 Liszt Hungarian Rhapsody the Nyiregyházi Version').should.equal('《No.3 Liszt Hungarian Rhapsody》 the 《Nyiregyházi Version》');
    });
    it('should not mark all upper words', () => {
      markName('is MAGIC LEAP EXT a liar').should.equal('is MAGIC LEAP EXT a liar');
    });
    it('should ignore spaces between No. and numbers', () => {
      markName('Nyiregyházi plays Liszt Hungarian Rhapsody no. 3 full').should.equal('Nyiregyházi plays 《Liszt Hungarian Rhapsody no. 3》 full');
    });
    it('should ignore names containing blacklist words', () => {
      markName('No It Should Not Be Marked!').should.equal('No It Should Not Be Marked!');
    });
  });

  describe('markVipKeyword', () => {
    it('should work on this case', () => {
      let str = 'Pandora'
        + '终推流《Fasion》服'
        + '务Premium k发，iPad'
        + '《IO》?'
        + '危TAXI Man机的Magic Leap真的MAX是 iPhone 骗子吗？'
        + 'is MAGIC LEAP a lier'
        + ' is MAGIC LEAP EXT a lier'
        + '?ARE test Pest '
        + '服TAXI MAN务JOKli 看Pre'
        + '危TAXI Man机'
        + '服TAXI MAN MAN务';
      markVipKeyword(str).should.equal('《Pandora》终推流《Fasion》服务《Premium k》发，《iPad IO》?危《TAXI Man》机的《Magic Leap》真的《MAX》是 《iPhone》 骗子吗？is 《MAGIC LEAP》 a lier is 《MAGIC LEAP EXT》 a lier?《ARE》 test Pest 服《TAXI MAN》务《JOKli》 看《Pre》危《TAXI Man》机'
        + '服《TAXI MAN MAN》务'
      );
    });
  });

});