"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Currency =
/*#__PURE__*/
function () {
  function Currency(identifiers, description, valueInLires) {
    _classCallCheck(this, Currency);

    this.identifiers = identifiers;
    this.description = description;
    this.valueInLires = valueInLires;
  } // in a given string detects the first currency mentioned.


  _createClass(Currency, [{
    key: "isMentioned",
    value: function isMentioned(text) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.identifiers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var identifier = _step.value;

          if (text.includes(identifier)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return false;
    }
  }], [{
    key: "detectCurrency",
    value: function detectCurrency(text) {
      // goes over all different currencies
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Currency.allCurrencies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var currency = _step2.value;

          if (currency.isMentioned(text)) {
            return currency;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return null;
    }
  }]);

  return Currency;
}(); // collection of all possible currencies.


Currency.allCurrencies = [new Currency(["🦋"], "*Nanako's wallet just became a bit lighter*\nYou can't let your guard down in this server.", 10000), new Currency(["🤑"], "*three bubbles approach*", 5106), new Currency(["💷"], "The value of 1 pound is 3097 lire", 3097), new Currency(["💶"], "The value of 1 euro is 1936 lire", 1936), new Currency(["💵", "💲"], "The value of 1 dollar is 1702 lire", 1702), new Currency(["💴"], "The value of 1 yen is 16 lire", 16), new Currency(["doekoe"], "The value of 1 doekoe is 1 lire", 1), new Currency(["💸"], "*Th-The money is flying?!*\nゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＴＨＥ 　ＷＯＲＫ 　ＯＦ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0), new Currency(["💎"], "*Cr-crazy diamondo?!*\nゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0), new Currency(["💩", "😈", "👿", "👹", "👺", "💀", "👻", "👽", "🤖", "🤡", "🕴", "🛥", "🚤", "🛳"], "ゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0), // 24 emojis
new Currency(["🐒", "🐵", "🦍"], "ゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」 ＵＳＥＲ！！\nゴ ゴ ゴ ゴ ゴ ", 0), new Currency(["💳"], "Sorry, we don't accept credit cards", 0), new Currency(["💰"], "Ah, a jute bag with a dollar sign. \nThanks?", 0), new Currency(["🍝"], "クレイジー・ダイヤモンド！\nそのスパゲティを直して材料別のところまで戻す！！", 0), new Currency(["🛢"], ":boom:", 0), new Currency(["🎁"], "ゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＴＨＥ 　ＷＯＲＫ 　ＯＦ 　ＡＮ 　ＥＮＥＭＹ 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0), new Currency(["💣"], "*Ohhhh NOoohhhh*", 0), new Currency(["🥖"], "grazie", 0), new Currency(["🎮"], "Here's a question. Will I hit you with my right fist or my left?", 0), new Currency(["🍌"], "*Chooses to stay at a safe distance.*", 0), new Currency(["🚑"], "逃げるんだよ！！！", 0), new Currency(["🐶", "🐕"], "This isn't a very good place for dogs", 0), new Currency(["🐦", "🔥"], "**マジシャンズレッド！！**", 0), new Currency(["⚰"], "ディオがいない！？！", 0), new Currency(["🔪", "🗡"], "HINJAKU HINJAKU!!!", 0), new Currency(["🍒"], "*lero lero lero lero*", 0), new Currency(["🚙", "🏎", "🚗"], "Kars?!\nNigerundayo!!!!", 0), new Currency(["⭐", "🌠", "✴", "🌟"], "**オラ　オラ　オラ　オラ！！！**", 0), // 28 emojis
new Currency(["🗺", "🌐", "🌍", "🌎", "🌏"], "**最強のパワーだ！！！**", 0), new Currency(["⏸", "🕰", "🕐", "🕙", "🕥", "🕚", "🕦", "🕛", "🕧", "🕜", "🕑", "🕝", "🕒", "🕞", "🕓", "🕟", "🕔", "🕠", "🕕", "🕡", "🕖", "🕢", "🕗", "🕣", "🕘", "🕤", "⏰", "⏲", "⌚", "⏱"], "**TOKI WO TOMARE!!!**", 0), //36 emojis
new Currency(["🛅", "💼"], "*only contains a passport for an adult child*", 0), new Currency(["⏩"], "It was all made in heaven.", 0), new Currency(["🤺"], 'The "Chariot" symbolizes invasion and victory.', 0), new Currency(["🤠"], 'The gun is mightier than the sword!', 0), new Currency(["📷", "📸"], "ハーミットパープル！", 0), new Currency(["👒"], "I think Hayato forgot to take it with him", 0), new Currency(["🌹"], "Sorry, I can't accept stray cats.", 0), new Currency(["🐱", "😿", "😻", "😹", "😽", "😾", "🙀", "😸", "😺", "😼", "🐈"], "Sorry, I can't tend for your garden.", 0), new Currency(["🍨", "🍦"], "*Whe-where did avdol go?*", 0), new Currency(["👣"], "Because I'm a highway staaarrrrrr!!!!!", 0), new Currency(["✈", "🛬", "🛫"], "I will be the pilot\n:boom:", 0), //26 emojis
new Currency(["🛩"], "16 X 55 lire", 28), new Currency(["🖋", "🔏", "✍"], "**ヘブンズ・ドアー**\nI see, you met a stand made out of stone.", 0), new Currency(["🤐"], "ゴ ゴ ゴ ゴ ゴ \nＴＨＩＳ 　ＭＵＳＴ 　ＢＥ 　ＴＨＥ 　ＷＯＲＫ 　ＯＦ 　Ａ~~Ｎ 　ＥＮＥＭＹ~~   friendly 「ＳＴＡＮＤ」！！\nゴ ゴ ゴ ゴ ゴ ", 0), new Currency(["🔒", "🔐"], "ザ・ロック", 0), new Currency(["🍞"], "グッ", 0), new Currency(["🇮🇹"], "Per l'onore d'Italia", 0), new Currency(["🇩🇪"], "馬鹿者が！！\nドイツの科学は世界一！！！", 0), new Currency(["🇺🇸"], "*Di-did something just move?*", 0), new Currency(["😱"], "OH MY GODD!!!!!", 0), new Currency(["💪"], "*poses*", 0), new Currency(["👅"], "This taste...\nIs the taste of a liar!\nArtificial JoJo\n*sweats*", 0), new Currency(["🧀"], "シーザーー！！！", 0), new Currency(["💅"], "How do I say this, I got a...", 0), new Currency(["👌", "🖐", "🤚", "✋", "🖖", "🖕", "🤞", "🤙"], "**ザ・ハンド**", -1), //25 emojis
new Currency(["🔫"], "*Buys some salami to feed the bullets*\nThey all work so hard", -100), new Currency(["🚓", "🚔", "👮"], "There is no problem here.", -100)];
module.exports = Currency;