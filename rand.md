# Randomizer #

The Club AJAX Mock Data Randomizer library is great for producing fake data during the development process. Allows dozens of ways to randomize numbers, strings, words, sentences, booleans, colors, and dates. Includes tiny libraries of the most commonly used words (in order), the most commonly used letters (in order) and personal names that can be used as first or last. For making sentences, "wurds" are used - words with scrambled vowels so they aren't actual words, but look more like lorem ipsum. Change the property real to true to use "words" instead of "wurds" (it can also produce humorous results).

## USAGE ##
> include file:
> > 

&lt;script src="clubajax/lang/rand.js"&gt;



&lt;/script&gt;



## Demo ##

> See demos/rand.html

## Properties ##
  * real: Boolean
> > Default false. Randomly generated sentences, titles, and words by default use "wurds" - words with scrambled vowels so they aren't actual words, but look more like lorem ipsum.
  * words: Array
> > The array of words used for mock sentences and titles. List is arranged by most commonly used in writing, so using a weight will return more common words.
  * wurds: Array
> > The default content used for sentences and titles. Wurds are words with their vowels scrambled to simulate lorem ipsum.
  * names: Array
> > An array of names chosen because they can be used as first or last names.
  * sites: Array
> > An array of website names chosen because they are familiar and succinct.
  * letters: Array
> > All 26 characters in the alphabet, arranged by most common used in writing.

## Methods ##
  * n _(number, weight)_
> > The key method. Returns a whole number between zero and the amount of first argument passed. Second argument is the weight. Larger positive weight returns closer to zero, larger negative weight returns closer to the first argument passed.
```
var r1 = rand.n(10); // random number between 0-10, no weight
var r2 = rand.n(100, 2); // random number between 0-100, weighted toward 0
var r3 = rand.n(500, -5); // random number between 0-500, weighted toward 500
```
  * range _(minimum, maximum, weight)_
> > Returns a random number ranging between the first and second arguments, weighted.
```
var r1 = rand.range(10, 20, 1); // returns number between 10 and 20, weighted towards 10
```
  * word _(no arguments)_
> > Returns randomly from the list of common words. If _real=true_ will return a real word, otherwise it will return a lorem ipsum "wurd".
```
rand.word(); // may return "papir"
rand.real = true;
rand.word(); // may return "paper"
```
  * sentences: _(minSentences, maxSentences, minWordsPerSentence, maxWordsPerSentence)_
> > Returns a randomly generated sentence. If _real=true_ will return real words, otherwise it will return lorem ipsum "wurds". The first two arguments determine how many sentences there are, the second two arguments determine how many words per sentence.
```
rand.sentences(2, 5, 3, 5); // may return: "Whet must iny hura. Cen lofu hura hagh."
rand.real = true
rand.sentences(2, 5, 3, 5); // may return: "Change across I above. Read has began from."
```
  * title: _(minimumWords, maximumWords)_
> > Returns a randomly generated title. Similar to returning one "sentence", but without a period, and all words are capitalized.
```
rand.title(7, 9); // may return: "Man Pictiro Sech Neod Te Yoong Haerd"
rand.real = true
rand.title(7, 9); // may return: "Thought With Those Both Or Ways Story"
```
  * chars _(minimum, maximum, weight)_
> > Will return a string of random characters with a random length between the minimum and maximum passed values, with an optional weight. Larger weight returns more common characters.
```
rand.chars(3, 12, -3); // returns a string of random characters between 3-12 long, weighted toward 12.
```
  * bignumber _(length)_
> > Returns a stringified number, the length as passed by the argument.
```
rand.bignumber(10); // May return "0275397661";
```
  * name _(caseOptions)_
> > Returns a random proper name from a list chosen because they can be used as first or last names. _caseOptions_ : 0 or undefined returns lower case, 1 returns title case, and 2 returns upper case.
```
rand.name(2); // could return "ARTHUR"
rand.name(1); // could return "Dylan"
rand.name(); // could return "albert"
```
  * site _(caseOptions)_
> > Returns a random proper name from a list chosen because they can be used as first or last names. _caseOptions_ : 0 or undefined returns lower case, 1 returns title case, and 2 returns upper case.
```
rand.name(2); // could return "GOOGLE"
rand.name(1); // could return "Yahoo"
rand.name(0); // could return "cnn"
```
  * url _(useWww, extension)_
> > Returns a web address, similar to: "http://clubajax.com". Pass true to add www, like:"http://www.clubajax.com". Pass a second argument to use your own extension.
```
rand.url(); // could return "http://clubajax.com"
rand.name(true); // could return "http://www.clubajax.com"
rand.name(true, ".org"); // could return "http://www.clubajax.org"
```
  * color _(weight)_
> > Returns a random hex color. Higher weight returns closer to black, negative weight returns closer to white.
```
rand.color(); // may return #ffaa00
rand.bool(5); // may return #00cc00
rand.bool(-5); // may return #ffffcc
```

  * bool _(weight)_
> > Returns true or false. Pass an exponent to weight the return one way or another.
```
rand.bool(); // returns tue or false
rand.bool(5); // will return true very often
rand.bool(-5); // will return false very often
```
  * date _(options)_
> > Returns a random date. If delimiter is not set, returns a date object, if seconds is true, returns seconds since 1970, and if the delimiter is set, returns a formatted date string. min and max arguments can be either date objects or anything that can be converted into a date object, such as the seconds from 1970, or a formatted string like "11/20/1964".
      * No options: Will return a date object between today and one year from today.
      * yearRange: Can change the maximum date to be this many years different from minimum date. A negative number can be used.
  * seconds: If true, returns seconds from 1970.
    * min only: Returns object between passed date and one year from that.
    * min, max: Returns object between passed dates.
    * delimiter: Returns a string using the delimiter. Passing "-" may return "11-20-1964".
    * weight: Weights the two date objects for the random return.
```
rand.date(); // may return: Wed Mar 23 2011 13:40:31 GMT-0500 (CST) (object)
rand.date({yearRange:-1}); // may return: Wed Mar 23 2009 13:40:31 GMT-0500 (CST) (object)
rand.date({min:"11/20/2020"}); // may return: Mon Mar 01 2021 13:01:51 GMT-0600 (CST) (object)
rand.date({min:new Date(), max:"11/20/2020"}); // may return: Fri Dec 23 2011 11:13:32 GMT-0600 (CST) (object)
rand.date({min:new Date(), max:"11/20/2020", delimiter:"-"}); // may return: "02-13-2014"
rand.date({min:new Date(), max:"11/20/2020", seconds:true}); // may return: 1382306576978
```
    * element _(thing, weight)_
> > > Will return a random element of whatever object is passed. The first argument can be anything.
        * Object: One of the objects values will be returned.
        * Array: One of the array elements is returned.
        * Number: Like calling rand.n(num);
        * String: Returns differently depending on the format (determined in this order):
          * Has a period: Assumed to be a paragraph, and will return a random sentence.
          * Has a space: Assumed to be a sentence and will return a random word.
          * Else: Returns a random character.
```
rand.element({a:1, b:"rand", c:[1,2,3]}); // would return either 1, "rand" or [1,2,3]
rand.element([1,2,3]); // returns either 1, 2, or 3
rand.element(3); // returns between 0-3
rand.element("Hello. How are you."); // Returns either "Hello." or "How are you."
rand.element("How are you"); // returns either "How", "are", or "you"
rand.element("alpha"); // returns one of the characters
```

  * scramble _(thing)_

> > Will convert any "thing" into an array (see element) and scramble the order of the elements, and return the whole array. Useful in cases where you don't want the possibility of the same element being returned twice.
```
rand.scramble([1,2,3,4,5]); // may return: [3,5,2,1,4]
rand.scramble("Yoda wrote this code"); // may return: "this code Yoda wrote"
```
## Helper Methods ##
  * toArray _(anything)_
> > Converts most any object into an array (see _element_). Analyzes strings to determine if they should be split into characters, words, or sentences.
```
rand.toArray({a:1,b:2}); // returns [1,2] 
rand.toArray([1,2,3]); // returns [1,2,3] 
rand.toArray("clubajax"); // returns ["c", "l", "u", "b", "a", "j", "a", "x"]
rand.toArray("Club AJAX"); // returns ["Club", "AJAX] 
rand.toArray("Club AJAX Rocks. HTML5 Rocks."); // returns ["Club AJAX Rocks." "HTML5 Rocks."] 
```
  * trim _(string)_
> > Removes spaces from both ends of a string.
```
rand.trim("  too much space   "); // returns "too much space";
```

  * pad _(string, amount, character)_
> > Pads the beginning of a number with zeros (or another character), defaulting to one (if needed). Returns a string.
```
rand.pad(9); // returns "09"
rand.pad(10); // returns "10"
rand.pad(2, 3); // returns "002"
rand.pad(42, 5, "X"); // returns "XXX42"
```

  * cap _(string)_
> > Capitalizes the first letter of a string.
```
rand.cap("mike wrote this."); // returns "Mike wrote this.";
```

  * weight _(number, exponent)_
> > This method is mostly for internal use, but a _weight_ argument is used in other methods which calls this. The first argument is a float between zero and 1. The second is an exponent, which can be any number, whole, float, or negative. Positive numbers return closer to the beginning of a list. Negative numbers will weight the return closer to the end of a list.
```
rand.weight(.5, 5); // may return 0.03125
rand.weight(.5, -5); // may return 0.96875
```